export default async function handler(req, res) {
  // Setup CORS agar bisa diakses dari frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // PENTING: Gunakan API Key dari header (input user) atau dari Env Variable
  // Jika Anda ingin user memasukkan key sendiri di web, gunakan header:
  const authHeader = req.headers.authorization;
  const apiKey = authHeader || Bearer ${process.env.OPENROUTER_API_KEY};

  if (!apiKey) return res.status(400).json({ error: 'API key tidak ditemukan' });

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': apiKey.startsWith('Bearer') ? apiKey : Bearer ${apiKey},
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://clipper-pro.vercel.app',
        'X-Title': 'Clipper Pro',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
