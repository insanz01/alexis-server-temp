import express from 'express';
import locations from "../models/locationModel.js";

const router = express.Router();

router.get("/provinces", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const provinces = await locations.getAllProvinces();

  res.status(provinces.code).json(provinces);

  return;
});

router.get("/cities", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const province_id = req.query.province_id;

  let regencies = null;

  if(province_id) {
    regencies = await locations.getAllRegenciesByProvinceId(province_id);
  } else {
    regencies = await locations.getAllRegencies();
  }

  res.status(regencies.code).json(regencies);

  return;
});

router.get("/districts", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const regency_id = req.query.regency_id;

  let districts = null;

  if(regency_id) {
    districts = await locations.getAllDistrictsByRegencyId(regency_id);
  } else {
    districts = await locations.getAllDistricts();
  }

  res.status(districts.code).json(districts);

  return;
});

router.get("/villages", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const district_id = req.query.district_id;

  let villages = null;

  if(district_id) {
    villages = await locations.getAllVillagesByDistrictId(district_id);
  } else {
    villages = await locations.getAllVillages();
  }

  res.status(villages.code).json(villages);

  return;
});

export default router;
