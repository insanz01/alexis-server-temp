// const connection = require("../config/database.js");
import connection from "../config/database.js";

const getAllProvinces = () => {
	let query = `SELECT DISTINCT province FROM store_location`;

	return new Promise((resolve, reject) => {
		connection.query(query, (error, result) => {
			if(error) {
				const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provides",
            errMessage: error
          }
        };

        return reject(errResponse);
			}

			const dataResponse = {
				code: 200,
				status: "ok",
				data: {
					message: "Data provinsi toko",
					store_location: result
				},
				error: null
			};

			return resolve(dataResponse);
		});
	}).catch(err => {
		return err;
	})
}

const getAllStoreByProvince = (province) => {
	let query = `SELECT * FROM store_location WHERE province LIKE %'${province}'%`;

	return new Promise((resolve, reject) => {
		connection.query(query, (error, result) => {
			if(error) {
				const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provides",
            errMessage: error
          }
        };

        return reject(errResponse);
			}

			const dataResponse = {
				code: 200,
				status: "ok",
				data: {
					message: `Data toko pada wilayah ${province}`,
					store_location: result
				},
				error: null
			}

			return resolve(dataResponse);
		});
	}).catch(err => {
		return err;
	});
}

export default { getAllProvinces, getAllStoreByProvince };