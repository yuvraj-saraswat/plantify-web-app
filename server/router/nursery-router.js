const express = require("express");
const {
  getCities,
  getCityById,
  getNurseriesByCityId,
  getNurseryById,
  getPlantsByNurseryId,
  getNurseryAverage,
  getAllPlantsList
} = require("../controllers/nursery-controllers");

const router = express.Router();

router.get("/cities", getCities);
router.get("/cities/:cityId", getCityById);
router.get("/nurseries/:cityId", getNurseriesByCityId);
router.get("/nursery/:nurseryId", getNurseryById);
router.get("/nursery/:nurseryId/plants", getPlantsByNurseryId);
router.get("/nursery/:nurseryId/avg", getNurseryAverage);
router.get("/plants-list", getAllPlantsList);

module.exports = router;
