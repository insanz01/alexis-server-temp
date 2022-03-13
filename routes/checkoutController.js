import express from "express";
const router = express.Router();

import checkout from '../models/checkoutModel.js';
import users from '../models/userModel.js';

router.get('/address', async (req, res) => {
	res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const { user_id } = req.query;

  if(!user_id) {
  	const errResponse = {
      code: 400,
      status: "bad request",
      data: null,
      error: {
        message: "Request can't provide",
        errMessage: "user_id must not be empty"
      }
    };

    res.status(errResponse.code).json(errResponse);

    return;
  }

  const user = await users.getSingleCustomerByUserId(user_id);

  const customerId = user.data.customer.id;

  const result = await checkout.getCheckoutAddress(customerId);

  res.status(result.status).json(result);

  return;
});

router.post('/address', async (req, res) => {
	res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const { user_id, type_address, recipient_name, address, other_detail, province_id, city_id, district_id, village_id, postal_code, recipient_phone_number, is_default, longitude, latitude } = req.body;

  if(!user_id) {
  	const errResponse = {
      code: 400,
      status: "bad request",
      data: null,
      error: {
        message: "Request can't provide",
        errMessage: "user_id must not be empty"
      }
    };

    res.status(errResponse.code).json(errResponse);
    
    return;
  }

  const user = await users.getSingleCustomerByUserId(user_id);

  const checkoutAddress = {
  	customer_id: user.data.customer.id,
  	type_address,
  	recipient_name,
  	address,
  	other_detail,
  	province_id,
  	city_id,
  	district_id,
  	village_id,
  	postal_code,
  	recipient_phone_number,
  	is_default,
  	longitude,
  	latitude
  }

  const result = await checkout.addCheckoutAddress(checkoutAddress);

  res.status(result.code).json(result);

  return;
});

router.get('/order/summary', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const { user_id } = req.query;

  if(!user_id) {
    const errResponse = {
      code: 400,
      status: "bad request",
      data: null,
      error: {
        message: "Request can't provide",
        errMessage: "user_id must not be empty"
      }
    };

    res.status(errResponse.code).json(errResponse);
    
    return;
  }

  const user = await users.getSingleCustomerByUserId(user_id);

  const summary = await checkout.getSummaryOrder(user.data.customer.id);

  res.status(summary.code).json(summary);

  return;
});

export default router;