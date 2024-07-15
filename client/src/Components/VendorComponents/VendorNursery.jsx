import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../store/auth";
import "../Styles/VendorNursery.css";
import "../Styles/Modal.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link, NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import Modal from "../Modal";
import axios from "axios";
import { toast } from "react-toastify";

function VendorNursery() {
  const { vendor, isLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nurseries, setNurseries] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/vendor/get-nursery/${vendor._id}`)
      .then((response) => setNurseries(response.data))
      .catch((error) => console.error("Error fetching nurseries:", error));
  }, [vendor._id, nurseries]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const cities = [
    { id: 1, name: "Bhopal" },
    { id: 2, name: "Delhi" },
    { id: 3, name: "Pune" },
    { id: 4, name: "Mumbai" },
    { id: 5, name: "Bangalore" },
    { id: 6, name: "Kolkata" },
  ];

  const [nurseryName, setNurseryName] = useState("");
  const [nurseryLocation, setNurseryLocation] = useState("");
  const [googleMapLocation, setGoogleMapLocation] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nurseryName", nurseryName);
      formData.append("nurseryLocation", nurseryLocation);
      formData.append("googleMapLocation", googleMapLocation);
      formData.append("selectedCityId", selectedCityId);
      formData.append("selectedCityName", selectedCityName);
      formData.append("openTime", openTime);
      formData.append("closeTime", closeTime);
      formData.append("image", selectedImage);
      formData.append("vendorId", vendor._id);
      formData.append("vendorContact", vendor.phone);
      
      const response = await axios.post(
        "http://localhost:3000/api/vendor/add-nursery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      console.log("Response:", response.data);
      toast.success("Nursery added");
      closeModal();

    } catch (error) {
      console.error("Error adding nursery:", error);
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  return (
    <div className="vendor-details-main-box">
      <div className="detail-container" id="detail-container-vendor">
        <div className="picture">
          <AccountCircleIcon style={{ fontSize: "10rem", color: "#2A5752" }} />
        </div>
        <div className="details">
          <h2>Vendor Details</h2>
          <div>
            <b>Username:</b> {vendor.username}
          </div>
          <div>
            <b>Email:</b> {vendor.email}
          </div>
          <div>
            <b>Phone:</b> {vendor.phone}
          </div>
        </div>
      </div>
      <div className="add-nursery-container">
        <h2>Your Nurseries</h2>
        <div className="card-list3">
          {nurseries.map((nursery) => (
            <div className="card3">
              <img src={nursery.photo_url} />
              <div className="card-content3">
                <h1>{nursery.name}</h1>
                <h5>
                  <b>Location :</b> {nursery.location}
                </h5>
                <Link to={`../plants/${nursery.nursery_id}`}>
                  <button>Go to</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="add-nursery-list">
          {nurseries.length===0 ? (<>
          <IconButton onClick={openModal}>
            <AddCircleIcon style={{ fontSize: "10rem", color: "#2A5752" }} />
          </IconButton>
          <h3>Add Nursery</h3>
  
        </>):(<button id="log-out-vendor" onClick={openModal}>Add More</button>)
          }
         </div> 
      </div>
      <NavLink to="/logout">
        <button id="log-out-vendor">Log Out</button>
      </NavLink>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3>Add Nursery</h3>
        <form onSubmit={handleFormSubmit} className="nursery-form">
          <div>
            <label htmlFor="nurseryName">Nursery Name:</label>
            <input
              type="text"
              id="nurseryName"
              value={nurseryName}
              onChange={(e) => setNurseryName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="nurseryLocation">Nursery Location:</label>
            <input
              type="text"
              id="nurseryLocation"
              value={nurseryLocation}
              onChange={(e) => setNurseryLocation(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="googleMapLocation">Google Map Location Link:</label>
            <input
              type="text"
              id="googleMapLocation"
              value={googleMapLocation}
              onChange={(e) => setGoogleMapLocation(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="city">Select a City:</label>
            <select
              id="city"
              value={selectedCityId}
              onChange={(e) => {
                setSelectedCityId(e.target.value); 
                setSelectedCityName(e.target.selectedOptions[0].text);
              }}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="openTime">Opening Time:</label>
            <input
              type="time"
              id="openTime"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="closeTime">Closing Time:</label>
            <input
              type="time"
              id="closeTime"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
            />
          </div>
          <div id="form-input">
            <div><label htmlFor="image">Upload Image:</label></div>  
            <input type="file" id="image" onChange={handleImageChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
}

export default VendorNursery;
