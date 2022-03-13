import multer from "multer";
import express from 'express';
import dateFormat from "dateformat";
import path from "path";

import imageDisplay from "../helper/ImageDisplay.js";
import Image from "../models/imageModel.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/products/',
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-'+Date.now() + path.extname(file.originalname));
    }
});

//check file type
const checkFileType = (file, callback) => {
    // Allowed extension
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
        return callback(null, true);
    }
    else{
        return callback('Error Images Only!');
    }
}

const upload = multer({ 
	storage: storage,
	limits: {
		fileSize: 10000000,
	},
	fileFilter: (req, file, callback) => {
		checkFileType(file, callback);
	}
});

router.post("/products", upload.single("productImage"), async (req, res) => {
    const imageName = req.file.originalname;
    const filePath = req.file.path;
    const label = imageName.split(".")[0];

    if(!await imageDisplay.isValidLabel(label)) {
        const errorResponse = {
            code: 400,
            status: "bad request",
            data: null,
            error: {
                message: `Invalid filename: ${imageName}`,
                expected: "T, X, S1, S2, S3, S4, SL, R1, R2, R3, R4, VP, VL, GP, GL, MP, ML, WP, WL"
            }
        };

        res.status(errorResponse.code).json(errorResponse);
        return;
    }

    const image = {
        product_id: parseInt(req.body.product_id),
        image_url: filePath,
        type: label,
        product_list_display: await imageDisplay.productListDisplay(label),
        product_detail_display: await imageDisplay.productDetailDisplay(label),
        bag_wishlist_order_display: await imageDisplay.bagWishlistOrderDisplay(label)
    };

    const existingData = await Image.productIsExist(image);
    const imageExist = existingData.data.exist;

    if(imageExist) {
        const result = await Image.updateImage(image);
        
        res.status(result.code).json(result);
    } else {
        const result = await Image.addNewImage(image);
            
        res.status(result.code).json(result);
    }

    return;
});

router.get('/products', async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Accept", "application/json");

    const productId = req.query.product_id ?? null;

    if(!productId) {
        const errResponse = {
            code: 400,
            status: "bad request",
            data: null,
            error: {
                message: "Invalid request",
                errMessage: "Harus ada parameter ?product_id="
            }
        };

        res.status(errResponse.code).json(errResponse);

        return;
    }

    const productImage = await Image.getProductImageById(productId);

    res.status(productImage.code).json(productImage);

    return;
});

export default router;