import product from "../models/productModel.js";
import users from '../models/userModel.js';

import stringHelper from "../helper/String.js";
import alexisAPI from "../helper/AlexisAPI.js";
// const authToken = require('../middleware/authToken');

import express from "express";
const router = express.Router();
import path from "path";
// import axios from "axios";

import upload from "../middleware/upload.js";
// const Resize = require("../helper/Resize.js");
import Resize from "../helper/Resize.js";

router.get("/", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const products = await product.getAllProducts();

  res.status(products.code).json(products);

  return;
});

router.post('/', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const newProduct = {
    barcode: req.body['barcode'],
    subcategory_id: req.body['subcategory_id'],
    price: req.body['price'],
    material_id: req.body['material_id'],
    color_id: req.body['color_id'],
    size_id: req.body['size_id']
  }

  const isExist = await product.checkExistingProduct(newProduct.barcode) ?? [];

  if(isExist) {
    const errResponse = {
      code   : 400,
      status : "bad request",
      data   : null,
      error  : {
        message : "Produk sudah terdaftar"
      }
    }

    res.status(errResponse.code).json(errResponse);

    return;
  }

  const result = await product.addNewProduct(newProduct);

  res.status(result.code).json(result);

  return;
});

router.get('/listed', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const listedProducts = await product.getListedProducts();

  res.status(listedProducts.code).json(listedProducts);

  return;
});

router.get('/photographed', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const photographedProduct = await product.getPhotographedProducts();

  res.status(photographedProduct.code).json(photographedProduct);

  return;
});

router.get('/to_be_photographed', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const toBePhotographedProduct = await product.getToBePhotographedProducts();

  res.status(toBePhotographedProduct.code).json(toBePhotographedProduct);

  return;
});

router.get('/stored', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const storedProducts = await product.getStoredProducts();

  res.status(storedProducts.code).json(storedProducts);

  return;
});

router.get('/to_be_listed', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const toBeListedProducts = await product.getToBeListedProducts();

  res.status(toBeListedProducts.code).json(toBeListedProducts);

  return;
});

router.get('/to_be_stored', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const toBeStoredProducts = await product.getToBeStoredProducts();

  res.status(toBeStoredProducts.code).json(toBeStoredProducts);

  return;
});

router.post("/scan", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  let code = req.body['barcode'];

  const products = await product.getProductByBarcode(code);

  res.status(products.code).json(products);

  return;
});

router.post('/postTest', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Accept', 'application/json');

  const newProduct = {
    barcode: req.body['barcode'],
    subcategory_id: req.body['subcategory_id'],
    price: req.body['price'],
    material_id: req.body['material_id'],
    color_id: req.body['color_id'],
    size_id: req.body['size_id']
  }

  console.info(newProduct);

  const isExist = await product.checkExistingProduct(newProduct.barcode) ?? [];

  if(isExist) {
    res.status(200).json({ message: "Produk sudah terdaftar" });
    console.info("Sudah terdaftar nih");

    return;
  }

  res.status(204).json({ message: "Produk berhasil ditambahkan" });
});

router.get('/wishlist', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const userId = req.query.user_id;

  const user = await users.getSingleCustomerByUserId(userId);

  if(user.code == 400) {
    res.status(user.code).json(user);
    return;
  }

  const customerId = user.data.customer.id

  const result = await product.getWishlistByCustomer(customerId);

  res.status(result.code).json(result);

  return;
});

router.post('/wishlist', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const { user_id } = req.body;

  const user = await users.getSingleCustomerByUserId(user_id);

  if(user.code == 400) {
    res.status(user.code).json(user);
    return;
  }

  const customerId = user.data.customer.id ?? null;

  if(!customerId) {
    const errResponse = {
      code: 404,
      status: 'not found',
      data: null,
      error: {
        message: `Tidak ada data user dengan id: ${user_id}`
      }
    };

    res.status(errResponse.code).json(errResponse);
    return;
  }

  const wishlist = {
    'product_id': req.body['product_id'],
    'customer_id': customerId
  }

  const result = await product.addNewWishlist(wishlist);

  res.status(result.code).json(result);

  return;
});

router.get('/cart', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const userId = req.query.user_id;

  const user = await users.getSingleCustomerByUserId(userId);

  if(user.code == 400) {
    res.status(user.code).json(user);
    return;
  }

  const customerId = user.data.customer.id ?? null;

  if(!customerId) {
    const errResponse = {
      code: 404,
      status: 'not found',
      data: null,
      error: {
        message: `Tidak ada data user dengan id: ${user_id}`
      }
    };

    res.status(errResponse.code).json(errResponse);
    return;
  }

  const result = await product.getCartByCustomer(customerId);

  res.status(result.code).json(result);

  return;
});

router.post('/cart', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const { user_id } = req.body;

  const user = await users.getSingleCustomerByUserId(user_id);

  if(user.code == 400) {
    res.status(user.code).json(user);
    return;
  }

  const customerId = user.data.customer.id ?? null;

  if(!customerId) {
    const errResponse = {
      code: 404,
      status: 'not found',
      data: null,
      error: {
        message: `Tidak ada data user dengan id: ${user_id}`
      }
    };

    res.status(errResponse.code).json(errResponse);
    return;
  }

  // product_id diperoleh dari subcategory_id
  const cart = {
    'product_id': req.body['product_id'],
    'customer_id': customerId,
    'unit': req.body['unit']
  }

  const result = await product.addNewCart(cart);

  res.status(result.code).json(result);

  return;
});

router.post('/style-code', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const styleCode = stringHelper.generateCode(5);

  // const result = await product.addNewStyleCode(styleCode);
  const response = {
    code: 200,
    status: "ok",
    data: {
      style_code: styleCode
    },
    error: null
  };

  res.status(response.code).json(response);

  return;
});

router.post('/color-code', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const colorCode = stringHelper.generateCode(1);

  // const result = await product.addNewcolorCode(colorCode);
  const response = {
    code: 200,
    status: "ok",
    data: {
      color_code: colorCode
    },
    error: null
  };

  res.status(response.code).json(response);

  return;
});

router.get('/size-code', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const sizeId = req.query.sizeId ?? null;
  const selection = req.query.selection ?? null;

  const queryParam = {
    id: sizeId,
    selection
  }

  let sizeCode = null;

  if(queryParam.sizeId || queryParam.selection) {
    sizeCode = await product.getSingleSize(queryParam);
  } else {
    sizeCode = await product.getAllSize();
  }

  res.status(sizeCode.code).json(sizeCode);

  return;
});

router.get('/category', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const categoryId = req.query.category_id ?? null;

  let categories = null;

  if(categoryId) {
    categories = await product.getSingleProductCategory(categoryId);
  } else {
    categories = await product.getAllProductCategories();
  }

  res.status(categories.code).json(categories);

  return;
});

router.get('/return', async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const statusId = req.query.status_id ?? null;

  let productReturn = null;

  if(statusId) {
    productReturn = await product.getReturnProduct(statusId);
  } else {
    productReturn = await product.getReturnProduct();
  }

  res.status(productReturn.code).json(productReturn);

  return;
});

router.post("/return", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const product = {
    product_id: req.body.product_id,
    reason: req.body.reason
  };

  const productReturn = await product.addReturnProduct(product);

  res.status(productReturn.code).json(productReturn);

  return;
});

router.get("/to_be_discarded", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const toBeDiscardedProduct = await product.getToBeDiscarded();

  res.status(toBeDiscardedProduct.code).json(toBeDiscardedProduct);

  return;
});

router.get("/discarded", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const discardedProduct = await product.getDiscardedProduct();

  res.status(discardedProduct.code).json(discardedProduct);

  return;
});

// endpoint tidak dipakai
router.post("/uploadTest", upload.single("image"), async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const imagePath = path.join(__dirname, "/public/images");
  const fileUpload = new Resize(imagePath);

  if (!req.file) {
    res.status(401).json({ error: "Please provide an image" });
  }

  const filename = await fileUpload.save(req.file.buffer);

  return res.status(200).json({ name: filename });
});

export default router;
