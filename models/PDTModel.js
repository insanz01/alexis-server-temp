import connection from "../config/database.js";

const registerProductStorageByBPCS = (barcode_pcs) => {
	let query = `INSERT INTO storage_product VALUES (product_bpcs_code = '${barcode_pcs}')`;

	return new Promise((resolve, reject) => {
		connection.query(query, (error, result) => {
			if (error) {
				return reject(error);
			}

			console.info(result);
			return resolve(result);
		});
	}).catch(err => {
		return err;
	});
}

const getProductStorageByBPCS = (barcode_pcs) => {
	let query = `SELECT * FROM storage_product WHERE product_bpcs = '${barcode_pcs}'`;

	return new Promise((resolve, reject) => {
		connection.query(query, (error, result) => {
			if (error) {
				const response = {
					code: 400,
					status: "error",
					data: null,
					error: {
						message: "Bermasalah dalam mengambil data",
						errMessage: error
					}
				}

				return reject(response);
			}

			if(result.length > 0) {
				const response = {
					code: 200,
          status: "ok",
          data: {
						barcode_pcs: result[0].product_bpcs,
						storage_code: result[0].storage_code
          },
          error: null
				};

				return resolve(response);
			} else {
				const response = {
					code: 200,
          status: "ok",
          data: null,
          error: {
          	message: 'No Data'
          }
				};

				return resolve(response);
			}

		})
	}).catch(err => {
		return err;
	})
}

const registerProductStorage = (barcode) => {

	let query = `INSERT INTO storage_product (product_bpcs, storage_code) VALUES('${barcode.product}', '${barcode.storage}')`;

	return new Promise((resolve, reject) => {
		connection.query(query, (error, result) => {
			if (error) {
				const errResponse = {
					code: 400,
					status: 'error',
					data: null,
					error: {
						message: "Gagal menyimpan data",
						errMessage: error
					}
				};

				return reject(errResponse);
			}

			if(result) {
				const response = {
					code: 201,
					status: 'created',
					data: {
						id: result.insertId,
						product_bpcs: barcode.product,
						storage_code: barcode.storage
					},
					error: null
				}

				return resolve(response);
			}

		});
	}).catch(err => {
		return err;
	});
}

const checkExistingProduct = (barcode) => {
	let query = `SELECT * FROM storage_product WHERE product_bpcs = '${barcode.product}' AND storage_code = '${barcode.storage}'`;

	return new Promise((resolve, reject) => {
		connection.query(query, (error, result) => {
			if (error) {
				return reject(error);
			}

			return resolve(result.length > 0);
		});
	}).catch(err => {
		return err;
	})
}

const pickUpProduct = (barcode) => {
	let query = `SELECT storage_product.id, storage_product.product_bpcs, storage.area_code, storage.slot_code, storage.rack_code FROM storage_product JOIN storage ON storage_product.storage_code = storage.storage_code WHERE storage_product.product_bpcs='${barcode.product}'`;

	return new Promise((resolve, reject) => {
		connection.query(query, (error, result) => {
			if(error) {
				const errResponse = {
					data: 400,
					status: "error",
					data: null,
					error: {
						message: "Gagal mendapatkan data storage",
						errMessage: error
					}
				};

				return reject(errResponse);
			}

			if(result.length > 0) {
				const response = {
					code: 200,
					status: "ok",
					data: {
						id: result[0].id,
						product_bpcs: result[0].product_bpcs,
						area_code: result[0].area_code,
						slot_code: result[0].slot_code,
						rack_code: result[0].rack_code
					},
					error: null
				};

				return resolve(response);
			} else {
				const response = {
					code: 204,
					status: 'no content',
					data: null,
					error: null
				}

				return resolve(response);
			}
		});
	}).catch(err => {
		return err;
	});
}

export default {
	registerProductStorage,
	registerProductStorageByBPCS,
	getProductStorageByBPCS,
	pickUpProduct,
	checkExistingProduct
}