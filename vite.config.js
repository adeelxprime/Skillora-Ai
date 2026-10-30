import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'prompt-extractor-backend-api',
        configureServer(server) {
          server.middlewares.use('/api/extract', async (req, res) => {
            console.log(`[API /api/extract] ${req.method} request received`);
            if (req.method === 'POST') {
              const chunks = [];
              req.on('data', (chunk) => chunks.push(chunk));
              req.on('end', async () => {
                try {
                  const body = JSON.parse(Buffer.concat(chunks).toString());
                  console.log(`[API /api/extract] Body parsed. Topic: "${body.topic}", Has image: ${Boolean(body.image && body.image.length > 100)}, Image size: ${body.image?.length || 0} chars`);

                  // OpenRouter AI Provider (Primary Free & Pro Engine)
                  const apiKey = (
                    req.headers['x-openrouter-key'] || 
                    body.apiKey || 
                    env.OPENROUTER_API_KEY || 
                    env.VITE_OPENROUTER_API_KEY || 
                    process.env.OPENROUTER_API_KEY || 
                    ''
                  ).trim();

                  if (!apiKey) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ needKey: true, error: 'OpenRouter API key is required' }));
                    return;
                  }

                  const topic = body.topic || 'high-end cinematic visual';
                  const aspect = body.aspect || '16:9';
                  const videoName = body.videoName || 'scene';
                  const lightingHint = body.lightingHint || 'Cinematic volumetric lighting';
                  const hasImage = Boolean(body.image && body.image.length > 100);

                  const systemPrompt = `You are an elite Hollywood director & AI prompt engineer specializing in reverse-engineering video footage for Sora, Runway Gen-3 Alpha, Kling 1.5, Luma Dream Machine, and Midjourney v6.1.
Your job is to look closely at the video frame image and describe EVERYTHING visible in it: the exact person, animal, vehicle, or subject, their clothing, action, the surrounding environment, lighting, and camera movement.
Return ONLY a valid JSON object (no markdown, no backticks, no conversational text) matching this schema:
{
  "subject": "Detailed description of the subject, clothing, action, posture, and setting visible in the frame",
  "camera": "Shot type (e.g. low-angle tracking dolly, 35mm lens) and camera movement physics",
  "lighting": "Volumetric lighting, atmosphere, shadows, and color grade",
  "masterPrompt": "The complete, rich master prompt ready for Kling 1.5 or Runway Gen-3 with 4K 60fps --ar ${aspect} --v 6.1 --style raw",
  "negative": "blurry, low quality, deformed, extra limbs, bad face, artifacts, cartoon look, low resolution, noise"
}`;

                  const userContent = [];
                  userContent.push({
                    type: 'text',
                    text: `Examine this video scene carefully. Reverse-engineer the exact master prompt to generate this exact scene in Kling AI or Runway Gen-3.
Aspect ratio: ${aspect}. Video context: ${videoName}.`
                  });

                  if (hasImage) {
                    let imgUrl = body.image;
                    if (!imgUrl.startsWith('data:')) {
                      imgUrl = `data:image/jpeg;base64,${imgUrl}`;
                    }
                    userContent.push({
                      type: 'image_url',
                      image_url: { url: imgUrl }
                    });
                  } else {
                    userContent.push({
                      type: 'text',
                      text: `Scene topic: ${topic}. Lighting: ${lightingHint}.`
                    });
                  }

                  const candidateModels = [
                    'openrouter/free',
                    'dots-studio/dots-3-note-preview:free',
                    'nvidia/nemotron-3.5-super-vl:free'
                  ];

                  let parsedResult = null;
                  let lastError = null;

                  for (const model of candidateModels) {
                    try {
                      const messagesContent = (!hasImage)
                        ? `Reverse engineer a master video prompt for scene: ${topic}. Aspect: ${aspect}. Video: ${videoName}. Lighting: ${lightingHint}. Return ONLY JSON.`
                        : userContent;

                      const orResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${apiKey}`,
                          'HTTP-Referer': 'http://localhost:3000',
                          'X-Title': 'Skillora AI Video Prompt Extractor'
                        },
                        body: JSON.stringify({
                          model,
                          temperature: 0.5,
                          messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: messagesContent }
                          ]
                        })
                      });

                      const orData = await orResponse.json();
                      if (orResponse.ok && orData.choices?.[0]?.message?.content) {
                        let rawText = orData.choices[0].message.content;
                        rawText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
                        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
                        if (jsonMatch) rawText = jsonMatch[0];
                        parsedResult = JSON.parse(rawText);
                        parsedResult.modelUsed = model;
                        break;
                      } else {
                        lastError = orData.error?.message || `Model ${model} failed`;
                      }
                    } catch (err) {
                      lastError = err.message;
                    }
                  }

                  if (parsedResult) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(parsedResult));
                    return;
                  }

                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: lastError || 'OpenRouter extraction failed' }));
                } catch (err) {
                  console.error('API Extract Error:', err);
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: err.message || 'Server extraction failed' }));
                }
              });
            } else {
              res.writeHead(405);
              res.end();
            }
          });
        }
      }
    ],
    server: {
      port: 3000,
      open: true
    }
  };
});
