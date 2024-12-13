const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Получить все продукты
app.get('/products', (req, res) => {
    res.json(products);
});

// Получить продукт по ID
app.get('/products/:id', (req, res) => {
    const product = products.find((p) => p.id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Продукт не найден' });
    }
});

// Создать продукт
app.post('/products/create', (req, res) => {
    const newProduct = { ...req.body, id: `${products.length + 1}` };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Обновить продукт
app.put('/products/update/:id', (req, res) => {
    const index = products.findIndex((p) => p.id === req.params.id);
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Продукт не найден' });
    }
});

// Удалить продукт
app.delete('/products/delete/:id', (req, res) => {
    products = products.filter((p) => p.id !== req.params.id);
    res.json({ message: 'Продукт удалён' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
