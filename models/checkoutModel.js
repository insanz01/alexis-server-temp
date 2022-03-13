import connection from "../config/database.js";

const getCheckoutAddress = (customer_id) => {
  let query = `SELECT 
  							address.id,
  							address.type_address
  							address.recipient_name,
  							address.address,
  							address.other_detail,
  							reg_provinces.name as province,
  							reg_regencies.name as city,
  							reg_districts.name as district,
  							reg_villages.name as village,
  							address.postal_code,
  							address.recipient_phone_number,
  							address.is_default,
  							address.longitude,
  							address.latitude
  						FROM address
  						JOIN reg_provinces ON address.province_id = reg_provinces.id
  						JOIN reg_regencies ON address.regency_id = reg_regencies.id
  						JOIN reg_districts ON address.district_id = reg_districts.id
  						JOIN reg_villages ON address.village_id = reg_villages.id
  						WHERE address.customer_id = ${customer_id}`;

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
        };

        return reject(errResponse);
      }

      let tempAddress = [];

      result.forEach(res => {
      	tempAddress =[...tempAddress, res];
      });

      const response = {
      	code: 200,
      	status: "ok",
      	data: {
      		address: tempAddress
      	},
      	error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

const addCheckoutAddress = (address) => {
	const query = `
		INSERT INTO address (customer_id, type_address, recipient_name, address, other_detail, province_id, city_id, district_id, village_id, postal_code, recipient_phone_number, is_default, longitude, latitude)
		VALUES (${address.customer_id}, '${address.type_address}', '${address.recipient_name}', '${address.address}', '${address.other_detail}', ${address.province_id}, ${address.city_id}, ${adderss.district_id}, ${address.village_id}, ${address.postal_code}, '${address.recipient_phone_number}', ${address.is_default}, '${address.longitude}', '${address.latitude}')
	`;

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
        };

        return reject(errResponse);
      }

      const response = {
      	code: 200,
      	status: "ok",
      	data: {
      		address: {
      			type_address: address.type_address,
      			recipient_name: address.recipient_name,
      			address: address.address,
      			other_detail: address.other_detail,
      			postal_code: address.postal_code,
      			recipient_phone_number: address.recipient_phone_number,
      			is_default: address.is_default,
      			longitude: address.longitude,
      			latitude: address.latitude
      		}
      	},
      	error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

const getSummaryOrder = (customerId) => {
  let query = `SELECT
                  SUM(product_subcategory.price) as total
                FROM product_subcategory
                JOIN product ON product_subcategory.id = product.subcategory_id
                JOIN cart ON product.id = cart.product_id
                WHERE cart.customer_id = ${customerId}`;

  console.info(customerId)

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
        };

        return reject(errResponse);
      }

      resolve(result);
    })
  }).then(summaryProduct => {

    let queryVoucher = `SELECT sum(voucher.discount) as total FROM voucher JOIN voucher_claimed ON voucher.id = voucher_claimed.voucher_id WHERE voucher.voucher_type = 1 AND voucher_claimed.customer_id = ${customerId}`;

    return new Promise((resolve, reject) => {
      connection.query(query, (error, shipmentDiscount) => {
        if (error) {
          const errResponse = {
            code: 400,
            status: "bad request",
            data: null,
            error: {
              message: "Request can't provide",
              errMessage: error
            }
          };

          return reject(errResponse);
        }

        const response = {
          code: 200,
          status: "ok",
          data: {
            summary_order: {
              total_price_product: summaryProduct[0].total ?? 0,
              total_shipment_discount: shipmentDiscount[0].total ?? 0
            }
          },
          error: null
        }

        return resolve(response);
      });
    })
  }).catch(err => {
    return err;
  });
}

export default {
	getCheckoutAddress,
	addCheckoutAddress,
  getSummaryOrder
}