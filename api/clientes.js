const { google } = require('googleapis');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const SHEET_ID = '1D2R3RZXzgy8iNy5N4_g0uZurMu0EF2JgfgM6fsjJAFs';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'clientes!A2:F1000',
    });

    const rows = response.data.values || [];
    const clientes = {};

    rows.forEach(row => {
      const [token, name, company, city, phone, type] = row;
      if (!token || !name) return;
      clientes[token] = {
        name: name || '',
        company: company || '',
        city: city || '',
        phone: phone || '',
        type: type || 'new',
      };
    });

    res.status(200).json({ clientes });
  } catch (error) {
    console.error('Error fetching clientes:', error);
    res.status(500).json({ error: 'Error fetching clientes', details: error.message });
  }
}
