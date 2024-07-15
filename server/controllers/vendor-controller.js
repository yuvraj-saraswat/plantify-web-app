const connection = require("../utils/db_sql");
const { getCityById } = require("./nursery-controllers");

const addNursery = async (req, res) => {
  try {
    const {
      nurseryName,
      nurseryLocation,
      googleMapLocation,
      selectedCityId,
      selectedCityName,
      openTime,
      closeTime,
      vendorId,
      vendorContact
    } = req.body;
    const imageName = req.file.filename;
    const imagePath = `/images/${selectedCityName}/${imageName}`;
    //const imagePath = "hi";
    console.log("hohoho",selectedCityName);
 
    const queryString =
      "INSERT INTO nurseries (name, location, link_loc, city_id, open_time, close_time, photo_url, vendorId, contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      queryString,
      [
        nurseryName,
        nurseryLocation,
        googleMapLocation,
        selectedCityId,
        openTime,
        closeTime,
        imagePath,
        vendorId,
        vendorContact
      ],
      (error, results, fields) => {
        if (error) {
          console.error("Error adding nursery:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        res.status(201).json({ message: "Nursery added successfully" });
      }
    );
  } catch (error) {
    console.error("Error adding nursery:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getNursery = async (req, res) =>{
  const vendorId = req.params.vendorId;
  const query = "Select * From nurseries where vendorId = ?";

  connection.query(query, [vendorId], (err, results) => {
    if(err){
      console.log("Error fetching nurseries:", err);
      res.status(500).json({error: "Internal Server Error"})
      return;
    }
    res.json(results);
  })
}


const setPlants = (req, res)=>{
  try {
    const {
      nurseryId,
      plantId,
      price
    } = req.body;

    const query = "Insert into nursery_plants (nursery_id, plant_id, price) values (?, ?, ?)";

    connection.query(
      query,
      [
        nurseryId,
        plantId,
        price
      ],
      (error, results, fields) => {
        if (error) {
          console.error("Error adding plant:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        res.status(201).json({ message: "Plant added successfully" });
      }
    );
  } catch (error) {
    console.error("Error adding plant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = { addNursery, getNursery, setPlants };
