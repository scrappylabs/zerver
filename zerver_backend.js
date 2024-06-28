const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Sample data
let items = [
    { id: 1, name: 'item1', price: 10.99 },
    { id: 2, name: 'item2', price: 12.99 },
];

// Get all items
app.get('/items', (req, res) => {
    res.json(items);
});

// Get a specific item by id
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

// Create a new item
app.post('/items', (req, res) => {
    const newItem = req.body;
    newItem.id = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
    items.push(newItem);
    res.status(201).json(newItem);
});

// Update an existing item
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item) {
        Object.assign(item, req.body);
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

// Delete an item
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Item not found');
    }
});

app.listen(port, '10.101.145.133' () => {
    console.log(`Server running at http://10.101.145.133:${port}/`);
});