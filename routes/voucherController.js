import express from "express";
const router = express.Router();

import voucherModel from '../models/voucherModel.js';

router.get('/', async (req, res) => {
	res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const vouchers = await voucherModel.getAllVouchers();

  res.status(vouchers.code).json(vouchers);

  return;
});

router.get('/type', async (req, res) => {
	res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const voucherTypes = await voucherModel.getAllVoucherTypes();

  res.status(voucherTypes.code).json(voucherTypes);

  return;
});

router.post('/type', async (req, res) => {
	res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const { name } = req.body;

  const voucherType = {
  	name
  }

  const result = await voucherModel.addNewVoucherType(voucherType);

  res.status(result.code).json(result);

  return;
})

export default router;