import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import "./Styles/Nursery.css";
import { useAuth } from "./store/auth";

const Nursery = () => {
  const { nurseryId } = useParams();
  const [nursery, setNursery] = useState({});
  const [plants, setPlants] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [quantities, setQuantities] = useState({}); // State to keep track of plant quantities
  const { user, userAuthentication } = useAuth();

  const userId = user._id;
  var nurseryName = nursery.name;
  /*useEffect(() => {
      if (user.length===0) {
          // Fetch user data again if user is empty
          userAuthentication();
      }

    }, [ user ]);*/

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/nursery/${nurseryId}`)
      .then((response) => {
        // First Axios call completed successfully
        setNursery(response.data);
        // Now make the second Axios call
        axios
          .get(`http://localhost:3000/api/nursery/${nurseryId}/plants`)
          .then((response2) => {
            // Initialize quantities state with default values of 0 for each plant
            axios
              .get(
                `http://localhost:3000/api/nursery/${user._id}/quantities/${response.data.name}`
              )
              .then((responseQuantities) => {
                const initialQuantities = {};

                response2.data.forEach((plant) => {
                  initialQuantities[plant.name] =
                    responseQuantities.data[plant.name] || 0;
                });

                setPlants(response2.data);
                setQuantities(initialQuantities);
              })
              .catch((error) => {
                console.error("Error fetching quantities:", error);
                // If error occurs while fetching quantities, initialize with 0
                const initialQuantities = {};
                response2.data.forEach((plant) => {
                  initialQuantities[plant.name] = 0;
                });
                setPlants(response2.data);
                setQuantities(initialQuantities);
              });
          })
          .catch((error) =>
            console.error("Error fetching plants in nursery:", error)
          );

        // Make the third Axios call after the first one completes
        axios
          .get(`http://localhost:3000/api/nursery/${nurseryId}/avg`)
          .then((responseAvg) => setPriceRange(responseAvg.data))
          .catch((error) =>
            console.error("Error fetching price range in nursery:", error)
          );
      })
      .catch((error) =>
        console.error("Error fetching nursery details:", error)
      );
  }, [userId]);

  //last code

  /*useEffect(() => {
    axios.get(`http://localhost:3000/api/nursery/${nurseryId}`)
      .then(response => {
        setNursery(response.data)
      })
      .catch(error => console.error('Error fetching nursery details:', error));

    
    axios.get(`http://localhost:3000/api/nursery/${nurseryId}/plants`)
      .then(response2 => {
        // Initialize quantities state with default values of 0 for each plant
        axios.get(`http://localhost:3000/api/nursery/${user._id}/quantities/${nursery.name}`)
          .then(responseQuantities => {
            console.log("hello hi");
            const initialQuantities = {};

            response2.data.forEach(plant => {
              initialQuantities[plant.name] = responseQuantities.data[plant.name] || 0;
            });

            console.log("hello");
            setPlants(response2.data);
            setQuantities(initialQuantities);
          })
          .catch(error => {
            console.error('Error fetching quantities:', error);
            // If error occurs while fetching quantities, initialize with 0
            const initialQuantities = {};
            response2.data.forEach(plant => {
              initialQuantities[plant.name] = 0;
            });
            setPlants(response2.data);
            setQuantities(initialQuantities);
            console.log("Ciao",userId);
          });
        
      })
      .catch(error => console.error('Error fetching plants in nursery:', error));

    axios.get(`http://localhost:3000/api/nursery/${nurseryId}/avg`)
      .then(response => setPriceRange(response.data))
      .catch(error => console.error('Error fetching price range in nursery:', error));
  }, [userId, nurseryId]);*/

  const increaseQuantity = (plantId, price, photo_url) => {
    setQuantities((prev) => ({
      ...prev,
      [plantId]: prev[plantId] + 1,
    }));

    axios
      .patch(`http://localhost:3000/add-quantity`, {
        userId,
        nurseryName,
        quantity: { ...quantities, [plantId]: quantities[plantId] + 1 },
      })
      .then(() => {
        
        axios
          .patch(`http://localhost:3000/add-to-cart`, {
            userId,
            nurseryName,
            plantId,
            quantity: quantities[plantId] + 1,
            price,
            photo_url,
          })
          .then(() => {
            console.log("added to cart");
          })
          .catch((error) => console.error("Error updating cart:", error));

        console.log("added");
      })
      .catch((error) => console.error("Error updating quantity:", error));
  };

  // Function to handle decreasing quantity
  const decreaseQuantity = (plantId, price, photo_url) => {
    if (quantities[plantId] > 0) {
      setQuantities((prev) => ({
        ...prev,
        [plantId]: prev[plantId] - 1,
      }));
    }

    if (quantities[plantId] > 0) {
      axios
        .patch(`http://localhost:3000/add-quantity`, {
          userId,
          nurseryName,
          quantity: { ...quantities, [plantId]: quantities[plantId] - 1 },
        })
        .then(() => {
          axios
            .patch(`http://localhost:3000/add-to-cart`, {
              userId,
              nurseryName,
              plantId,
              quantity: quantities[plantId] - 1,
              price,
              photo_url,
            })
            .then(() => {
              console.log("added to cart");
            })
            .catch((error) => console.error("Error updating cart:", error));
          console.log("decreased");
        })
        .catch((error) => console.error("Error updating quantity:", error));
    }
  };

  /*useEffect(() => {
      axios.get(`http://localhost:3000/api/nursery/${nurseryId}`)
        .then(response => setNursery(response.data))
        .catch(error => console.error('Error fetching nursery details:', error));
  
      axios.get(`http://localhost:3000/api/nursery/${nurseryId}/plants`)
        .then(response => setPlants(response.data))
        .catch(error => console.error('Error fetching plants in nursery:', error));

        axios.get(`http://localhost:3000/api/nursery/${nurseryId}/avg`)
        .then(response => setPriceRange(response.data))
        .catch(error => console.error('Error fetching plants in nursery:', error));
    }, [nurseryId]);*/

  return (
    <>
      <div className="nursery-outer">
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
                <div className="but-div">
                  <button
                    id="negative"
                    onClick={() => decreaseQuantity(plant.name)}
                    style={{
                      visibility:
                        quantities[plant.name] === 0 ? "hidden" : "visible",
                    }}
                  >
                    <b>-</b>
                  </button>
                  <h5
                    style={{
                      visibility:
                        quantities[plant.name] === 0 ? "hidden" : "visible",
                    }}
                  >
                    {quantities[plant.name]}
                  </h5>
                  <button
                    id="positive"
                    onClick={() =>
                      increaseQuantity(plant.name, plant.price, plant.photo_url)
                    }
                  >
                    <b>+</b>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Nursery;
