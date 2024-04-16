require("dotenv").config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const PORT = 3000;

const password = process.env.PASSWORD;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: password,
  database: 'plantify',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(cors());

app.get('/api/cities', (req, res) => {
  const query = 'SELECT * FROM cities';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching cities:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/cities/:cityId', (req, res) => {
  const cityId = req.params.cityId;
  const query = 'SELECT name, photo_url, tag FROM cities WHERE city_id = ?';

  connection.query(query, [cityId], (err, results) => {
    if (err) {
      console.error('Error fetching city information:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'City not found' });
      return;
    }

    const cityInfo = results[0];
    res.json(cityInfo);
  });
});


app.get('/api/nurseries/:cityId', (req, res) => {
  const cityId = req.params.cityId;
  const query = 'SELECT * FROM nurseries WHERE city_id = ?';
  //const query = 'SELECT n.*, c.name as city_name, c.photo_url as city_photo FROM nurseries n JOIN cities c ON n.city_id = c.city_id WHERE n.city_id = 1';
  connection.query(query, [cityId], (err, results) => {
    if (err) {
      console.error('Error fetching nurseries:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/nursery/:nurseryId', (req, res) => {
  const nurseryId = req.params.nurseryId;
  const query = 'SELECT nurseries.*, cities.name AS city_name FROM nurseries JOIN cities ON nurseries.city_id = cities.city_id WHERE nursery_id = ?';
  connection.query(query, [nurseryId], (err, results) => {
    if (err) {
      console.error('Error fetching nursery details:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results[0]);
  });
});

app.get('/api/nursery/:nurseryId/plants', (req, res) => {
  const nurseryId = req.params.nurseryId;
  const query = 'SELECT plants.*, nursery_plants.price FROM plants JOIN nursery_plants ON plants.plant_id = nursery_plants.plant_id WHERE nursery_plants.nursery_id = ?';
  connection.query(query, [nurseryId], (err, results) => {
    if (err) {
      console.error('Error fetching plants in nursery:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/nursery/:nurseryId/avg', (req, res) => {
  const nurseryId = req.params.nurseryId;
  const query = 'SELECT Round(AVG(price)) as avg_price, min(price) as min_price, max(price) as max_price FROM nursery_plants WHERE nursery_id = ?';
  connection.query(query, [nurseryId], (err, results) => {
    if (err) {
      console.error('Error fetching plants in nursery:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const average_price = results[0];
    res.json(average_price);
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server; 