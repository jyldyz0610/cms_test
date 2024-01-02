const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let savedLinks = [
    { linkUrl: "https://www.youtube.com/watch?v=Xrgk023l4lI", linkDescription: "Beschreibung des Links 1" },
    // Weitere Links hier hinzufügen...
  ];
app.post('/saveLink', (req, res) => {
  const { linkUrl } = req.body;
  savedLinks.push({ linkUrl });
  console.log('Link erfolgreich gespeichert:', linkUrl);
  res.json({ message: 'Link erfolgreich gespeichert' });
});

app.get('/getLinks', (req, res) => {
  res.json(savedLinks);
});

app.get('/', (req, res) => {
  res.send('Willkommen! Dies ist die Startseite.');
});
// Routen für die Suche hinzufügen
app.get('/search', (req, res) => {
    const searchTerm = req.query.term.toLowerCase();
    const searchResults = savedLinks.filter(link =>
      link.linkDescription.toLowerCase().includes(searchTerm) || link.linkUrl.toLowerCase().includes(searchTerm)
    );
    res.json(searchResults);
  });
  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
