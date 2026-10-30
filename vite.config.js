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
            if (req.method === 'POST') {
              const chunks = [];
              req.on('data', (chunk) => chunks.push(chunk));
              req.on('end', async () => {
                try {
                  const body = JSON.parse(Buffer.concat(chunks).toString());

                  // OpenRouter AI Provider (Primary Free & Pro Engine)
                  const apiKey = (
                    req.headers['x-openrouter-key'] || 
                    body.apiKey || 
                    env.OPENROUTER_API_KEY || 
                    env.VITE_OPENROUTER_API_KEY || 
                    process.env.OPENROUTER_API_KEY || 
                    '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'
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

                  const systemPrompt = `You are an elite Hollywood & AI prompt engineer specializing in cinematic master prompts for Sora, Runway Gen-3 Alpha, Kling 1.5, Luma Dream Machine, and Midjourney v6.1. Reverse-engineer the given video scene into an ultra-realistic, director-level prompt. Return ONLY a valid JSON object (no markdown, no backticks, no other text) with keys: subject, camera, lighting, masterPrompt, negative.`;

                  const userPrompt = `Reverse-engineer a master prompt for this scene:
- Topic / Focus: ${topic}
- Video Name: ${videoName}
- Aspect Ratio: ${aspect}
- Lighting Profile: ${lightingHint}

Return JSON:
{
  "subject": "Detailed description of subject, action and clothing",
  "camera": "Camera shot, movement, angle and lens physics",
  "lighting": "Volumetric lighting, contrast and atmospheric glow",
  "masterPrompt": "The complete rich master prompt ready for Kling 1.5 or Runway Gen-3 with 4K 60fps --ar ${aspect} --v 6.1 --style raw",
  "negative": "blurry, low quality, deformed, extra limbs, artifacts, cartoon look, low resolution"
}`;

                  const candidateModels = [
                    'nvidia/nemotron-3.5-super-vl:free',
                    'liquid/lfm-2.5-2.6b:free',
                    'google/gemma-4-26b-a4b-it:free'
                  ];

                  let parsedResult = null;
                  let lastError = null;

                  for (const model of candidateModels) {
                    try {
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
                          temperature: 0.6,
                          messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: userPrompt }
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
