const connection = require("../utils/db_sql");

const getCities = (req, res) => {
  const query = "SELECT * FROM cities";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching cities:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
};

const getCityById = (req, res) => {
  const cityId = req.params.cityId;
  const query = "SELECT name, photo_url, tag FROM cities WHERE city_id = ?";

  connection.query(query, [cityId], (err, results) => {
    if (err) {
      console.error("Error fetching city information:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "City not found" });
      return;
    }

    const cityInfo = results[0];
    res.json(cityInfo);
  });
};

const getNurseriesByCityId = (req, res) => {
  const cityId = req.params.cityId;
  const query = "SELECT * FROM nurseries WHERE city_id = ?";

  connection.query(query, [cityId], (err, results) => {
    if (err) {
      console.error("Error fetching nurseries:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
};

const getNurseryById = (req, res) => {
  const nurseryId = req.params.nurseryId;
  const query =
    "SELECT nurseries.*, cities.name AS city_name FROM nurseries JOIN cities ON nurseries.city_id = cities.city_id WHERE nursery_id = ?";

  connection.query(query, [nurseryId], (err, results) => {
    if (err) {
      console.error("Error fetching nursery details:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results[0]);
  });
};

const getPlantsByNurseryId = (req, res) => {
  const nurseryId = req.params.nurseryId;
  const query =
    "SELECT plants.*, nursery_plants.price FROM plants JOIN nursery_plants ON plants.plant_id = nursery_plants.plant_id WHERE nursery_plants.nursery_id = ?";

  connection.query(query, [nurseryId], (err, results) => {
    if (err) {
      console.error("Error fetching plants in nursery:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
};

const getNurseryAverage = (req, res) => {
  const nurseryId = req.params.nurseryId;
  const query =
    "SELECT ROUND(AVG(price)) as avg_price, MIN(price) as min_price, MAX(price) as max_price FROM nursery_plants WHERE nursery_id = ?";

  connection.query(query, [nurseryId], (err, results) => {
    if (err) {
      console.error("Error fetching average price:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    const averagePrice = results[0];
    res.json(averagePrice);
  });
};


const getAllPlantsList = (req, res) => {
  const query = "SELECT plant_id, name FROM plants ORDER BY name";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching cities:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
};

module.exports = {
  getCities,
  getCityById,
  getNurseriesByCityId,
  getNurseryById,
  getPlantsByNurseryId,
  getNurseryAverage,
  getAllPlantsList
};
