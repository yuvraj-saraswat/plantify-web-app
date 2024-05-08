import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import axios from "axios";
import Modal from "../Modal";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast } from "react-toastify";

function VendorPlant() {
  const { nurseryId } = useParams();
  const { vendor, isLoading } = useAuth();
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [priceRange, setPriceRange] = useState([]);
  const [nursery, setNursery] = useState({});
  const [plants, setPlants] = useState([]);
  const [plantsList, setPlantsList] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/vendor/get-nursery/${vendor._id}`)
      .then((response) => {
        response.data.map((item) => {
          if (item.nursery_id == nurseryId) {
            setNursery(item);
          }
        });
      })
      .catch((error) => console.error("Error fetching nurseries:", error));
    axios
      .get("http://localhost:3000/api/plants-list")
      .then((response) => {
        setPlantsList(response.data);
      })
      .catch((error) => console.error("Error fetching plants List", error));

    axios
      .get(`http://localhost:3000/api/nursery/${nurseryId}/avg`)
      .then((responseAvg) => setPriceRange(responseAvg.data))
      .catch((error) =>
        console.error("Error fetching price range in nursery:", error)
      );
  }, [vendor._id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/nursery/${nurseryId}/plants`)
      .then((response2) => {
        setPlants(response2.data);
      })
      .catch((error) => {
        console.error("Error fetching plants:", error);
      });
  }, [vendor._id, plants]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/vendor/add-plants",
        {
          nurseryId: nursery.nursery_id,
          plantId: selectedPlant,
          price,
        }
      );
      console.log("Response:", response.data);
      toast.success("Plant added");
      closeModal();
    } catch (error) {
      toast.error("This plant already exist");
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="main-box-plants">
      <div className="nursery-info">
        <div className="nursery-img">
          <div className="nursery-img-cont">
            <img src={nursery.photo_url} alt={nursery.name} />
          </div>
        </div>
        <div className="nursery-details">
          <h1>{nursery.name}</h1>
          <p>
            <b>Location: </b>
            <a href={nursery.link_loc}>{nursery.location}</a>
          </p>
          <p>
            <b>Contact: </b>
            {nursery.contact}
          </p>
          <p>
            <b>Rating: </b>
            {nursery.rating}/5
          </p>
          <p>
            <b>Timing: </b>
            {nursery.open_time}am - {nursery.close_time}pm
          </p>
          <p>
            <b>Average Price: </b>₹{priceRange.avg_price}
          </p>
          <p>
            <b>Price Range: </b>₹{priceRange.min_price} - ₹
            {priceRange.max_price}
          </p>
        </div>
      </div>
      <h2>Plants in Nursery</h2>
      
        <div className="card-list2">
          {plants.map((plant) => (
            <div className="card2" key={plant.name}>
              <img src={plant.photo_url} />
              <div className="card-content2">
                <h3>{plant.name}</h3>
                <h5>
                  <b>Price :</b> ₹{plant.price}{" "}
                </h5>
                <div className="but-div"></div>
              </div>
            </div>
          ))}
        </div>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3>Add Plant</h3>
        <form onSubmit={handleFormSubmit} className="plants-form">
          <div>
            <label htmlFor="plant">Plant Name:</label>
            <select
              id="plant"
              value={selectedPlant}
              onChange={(e) => {
                setSelectedPlant(e.target.value); // Set the selectedCityId directly to the value of the selected option
              }}
            >
              <option value="">Select a plant</option>
              {plantsList.map((plant) => (
                <option key={plant.plant_id} value={plant.plant_id}>
                  {plant.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </Modal>
      {plants.length === 0 ? (
        <>
          <IconButton onClick={openModal}>
            <AddCircleIcon style={{ fontSize: "10rem", color: "#2A5752" }} />
          </IconButton>
          <h3 style={{color:"#2A5752", marginTop:"0rem", marginBottom: "2rem"}}>Add Plants</h3>
        </>
      ) : (
        <button id="log-out-vendor" onClick={openModal}>
          Add More
        </button>
      )}
    </div>
  );
}

export default VendorPlant;
