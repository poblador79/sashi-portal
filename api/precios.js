const { google } = require('googleapis');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300');

  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1D2R3RZXzgy8iNy5N4_g0uZurMu0EF2JgfgM6fsjJAFs',
      range: 'precios!A2:H200',
    });

    const rows = response.data.values || [];
    const precios = rows
      .filter(row => row[0] && row[1] && row[2])
      .map(row => ({
        marca: row[0],
        corte: row[1],
        precio: parseFloat(row[2]),
        unidad: row[3] || 'cartone',
        unitLabel: row[4] || '',
        disponible: row[5] !== 'FALSE',
        offerta: row[6] === 'TRUE',
        prezzo_speciale: row[7] ? parseFloat(row[7]) : null,
      }));

    res.status(200).json({ precios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
