const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json());

mongoose.connect('mongodb+srv://sushmithaengr23:1yHICAM9AI7B5fD7@cluster0.pybyb.mongodb.net/ecom?retryWrites=true&w=majority&appName=Cluster0');

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/menu', async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).send({ message: 'Menu item created', menuItem });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).send(menuItems);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});