import express from 'express';
const router = express.Router();

// const { getAllCustomer, getSingleCustomer } = require('../models/users');
import users from '../models/userModel.js';

/* GET users listing. */
router.get('/', async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Accept', 'application/json');

  const customers = await users.getAllCustomer();

  res.status(customers.code).json(customers);

  return;
});

// get data by post email user
router.post('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Accept', 'application/json');

  const user = {
    email: req.body['email'] ?? null,
    user_id: req.body['user_id'] ?? null
  }

  let customer = null;

  if(!!user.email) {
    customer = await users.getSingleCustomerByEmail(user);
  } else {
    customer = await users.getSingleCustomerByUserId(user);
  }

  if(customer) {
    res.status(customer.code).json(customer);
  }

  return;
})

export default router;
