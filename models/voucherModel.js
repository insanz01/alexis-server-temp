import connection from "../config/database.js";

const getAllVouchers = () => {
	// discount
	// name
	// description
	// expired date
	// type (ongkir, ultah, harga) -> (shipping cost, birthday, price)
	const query = `SELECT voucher.id, voucher.name, voucher.description, voucher.discount, voucher.expired_date, voucher_type.name as voucher_type FROM voucher JOIN voucher_type ON voucher.voucher_type = voucher_type.id`;

	return new Promise((resolve, reject) => {
		connection.query(query, (error, result) => {
			if (error) {
				const errResponse = {
					code: 400,
					status: "bad request",
					data: null,
					error: {
						message: "Request can't provide",
						errMessage: error
					}
				}
				
				return reject(errResponse);
			}

			const response = {
				code: 200,
				status: "ok",
				data: {
					vouchers: result
				},
				error: null
			}

			return resolve(response);
		})
	}).catch(err => {
		return err;
	})
}

const addNewVoucher = (voucher) => {
	const query = `INSERT INTO voucher (name, description, discount, expired_date, voucher_type) VALUES ('${voucher.name}', '${voucher.description}', ${voucher.discount}, '${voucher.expired_date}', ${voucher.voucher_type})`;

	return new Promise((resolve, reject) => {
		connection.query(query, (error, result) => {
			if (error) {
				const errResponse = {
					code: 400,
					status: "bad request",
					data: null,
					error: {
						message: "Request can't provide",
						errMessage: error
					}
				}

				return reject(errResponse);
			}

			const response = {
				code: 200,
				status: "ok",
				data: {
					voucher: {
						name: voucher.name,
						description: voucher.description,
						discount: voucher.discount,
						expired_date: voucher.expired_date,
						voucher_type: voucher.voucher_type
					}
				}
			}

			return resolve(response);
		})
	}).catch(err => {
		return err;
	})
}

const getAllVoucherTypes = () => {
	const query = `SELECT id, name FROM voucher_type`;

	return new Promise((resolve, reject) => {
		connection.query(query, (error, result) => {
			if (error) {
				const errResponse = {
					code: 400,
					status: "bad request",
					data: null,
					error: {
						message: "Request can't provide",
						errMessage: error
					}
				}

				return reject(errResponse);
			}

			const response = {
				code: 200,
				status: "ok",
				data: {
					voucher_type: result
				},
				error: null
			};

			return resolve(response);
		})
	}).catch(err => {
		return err;
	})
}

const addNewVoucherType = (voucherType) => {
	const query = `INSERT INTO voucher_type (name) VALUES ('${voucherType.name}')`;

	return new Promise((resolve, reject) => {
		connection.query(query, (error, result) => {
			if (error) {
				const errResponse = {
					code: 400,
					status: "bad request",
					data: null,
					error: {
						message: "Request can't provide",
						errMessage: error
					}
				}

				return reject(errResponse);
			}

			const response = {
				code: 200,
				status: "ok",
				data: {
					voucher: {
						name: voucherType.name
					}
				},
				error: null
			}

			return resolve(response);
		})
	}).catch(err => {
		return err;
	});
}

export default {
	getAllVouchers,
	addNewVoucher,
	getAllVoucherTypes,
	addNewVoucherType
}