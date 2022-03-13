// import { getAllProvinces, getAllStoreByProvince } from "../models/storeLocationModel.js";
import store from "../models/storeLocationModel.js";

// const express = require("express");
import express from "express";
const router = express.Router();

router.get('/location', async (req, res, next) => {
	res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const name = req.query.name ?? null;

  let results = [];

  if (name) {
    results = await store.getAllStoreByProvince(name);
  } else {
    results = await store.getAllProvinces();
  }

  res.status(results.code).json(results);

  return;
});

router.get('/province-coba', async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const city = req.query.city;

  console.log(city);

  res.status(200).json({ query: city });
});

export default router;