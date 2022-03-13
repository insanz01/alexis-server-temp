import PDT from "../models/PDTModel.js";

import express from "express";
const router = express.Router();

//melakukan registrasi posisi barang pada rack di storage
router.post("/storage", async (req, res, next) => {
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Accept", "application/json");

	const barcode = {
		product: req.body['bpcs_product'],
		storage: req.body['barcode_storage']
	};

	const isExist = await PDT.checkExistingProduct(barcode) ?? [];

	if(isExist) {
		const errResponse = {
			code: 400,
			status: 'error',
			data: null,
			error: {
				message: "Produk sudah terdaftar di storage"
			}
		};

		res.status(errResponse.code).json(errResponse);

		return;
	}

	const result = await PDT.registerProductStorage(barcode);

	res.status(result.code).json(result);

	return;
});

// mengambil informasi mengenai lokasi barang
router.get('/storage', async (req, res, next) => {
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Accept", "application/json");

	const barcode_pcs = req.query.barcode_pcs ?? null;

	if(barcode_pcs == null) {
		const errResponse = {
			code: 400,
			status: "error",
			data: null,
			error: {
				message: "Parameter barcode_pcs tidak ditemukan"
			}
		};

		res.status(errResponse.code).json(errResponse);

		return;
	}

	const result = await PDT.getProductStorageByBPCS(barcode_pcs);

	res.status(result.code).json(result);

	return;
});

// melakukan registrasi lokasi barang pada trolley
router.post('/pickup', async (req, res, next) => {
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Accept", "application/json");

	const barcode = {
		product: req.body['bpcs_product'],
		trolley: req.body['trolley_code']
	};

	const result = await PDT.pickUpProduct(barcode);

	res.status(result.code).json(result);

	return;
});

export default router;