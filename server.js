const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Статические файлы
app.use(express.static(__dirname));

// Маршруты для страниц
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/portfolio', (req, res) => {
    res.sendFile(path.join(__dirname, 'portfolio.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'services.html'));
});

app.get('/templates', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates.html'));
});

app.get('/contacts', (req, res) => {
    res.sendFile(path.join(__dirname, 'contacts.html'));
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
}); 