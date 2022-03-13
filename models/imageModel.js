// const connection = require("../config/database.js");
import fs from "fs";
import connection from "../config/database.js";

const productIsExist = (image) => {
	let query = `SELECT * FROM product_image WHERE product_id = ${image.product_id} AND type = '${image.type}'`;

	return new Promise((resolve, reject) => {
		connection.query(query, (error, result) => {
			if(error) {
				const errorResponse = {
					code: 400,
					status: "bad request",
					data: null,
					error: {
						message: "Request can't provides",
						errMessage: error
					}
				};

				return reject(errorResponse);
			}

			const dataResponse = {
				code: 200,
				status: "ok",
				data: {
					exist: (result.length >= 1) ? true : false
				},
				error: null
			};

			return resolve(dataResponse);
		});
	}).catch(err => {
		return err;
	});
}

const updateImage = (image) => {
	let queryProduct = `SELECT image_url FROM product_image WHERE product_id = ${image.product_id} AND type = '${image.type}'`;

	return new Promise((resolve, reject) => {
		connection.query(queryProduct, (error, result) => {
			if(error) {
				console.info(error);
				const errorResponse = {
					code: 400,
					status: "bad request",
					data: null,
					error: {
						message: "Request can't provides",
						errMessage: error
					}
				};

				return reject(errorResponse);
			}
			
			const path = `./${result[0].image_url}`
			fs.unlinkSync(path);

			const resultResponse = {
				code: 200,
				status: "ok",
				data: {
					message: 'File berhasil dihapus!'
				},
				error: null
			};

			return resolve(resultResponse);
		});
	}).then((resRemove) => {
		let query = `UPDATE product_image SET image_url = '${image.image_url}', product_list_display = '${image.product_list_display}', product_detail_display = ${image.product_detail_display}, bag_wishlist_order_display = ${image.bag_wishlist_order_display} WHERE product_id = ${image.product_id} AND type = '${image.type}'`;

		return new Promise((resolve, reject) => {
			connection.query(query, (error, result) => {
				if(error) {
					const errorResponse = {
						code: 400,
						status: "bad request",
						data: null,
						error: {
							message: "Request can't provides",
							errMessage: error
						}
					};

					return reject(errorResponse);
				}

				const dataResponse = {
					code: 200,
					status: "ok",
					data: {
						product_id: image.product_id,
						image_url: `http://api.myalexis.xyz:3001/${image.image_url}`,
						type: image.type,
						product_list_display: image.product_list_display,
						product_detail_display: image.product_detail_display,
						bag_wishlist_order_display: image.bag_wishlist_order_display
					},
					error: null
				};

				return resolve(dataResponse);
			});
		})
	}).catch(err => {
		return err;
	});
}

const addNewImage = (image) => {
	let query = `INSERT INTO product_image (product_id, image_url, type, product_list_display, product_detail_display, bag_wishlist_order_display) VALUES (${image.product_id}, '${image.image_url}', '${image.type}', '${image.product_list_display}', ${image.product_detail_display}, ${image.bag_wishlist_order_display})`;

	return new Promise((resolve, reject) => {
		connection.query(query, (error, result) => {
			if(error) {
				const errorResponse = {
					code: 400,
					status: "bad request",
					data: null,
					error: {
						message: "Request can't provides",
						errMessage: error
					}
				};

				return reject(errorResponse);
			}

			const dataResponse = {
				code: 200,
				status: "ok",
				data: {
					product_id: image.product_id,
					image_url: `http://api.myalexis.xyz:3001/${image.image_url}`,
					type: image.type,
					product_list_display: image.product_list_display,
					product_detail_display: image.product_detail_display,
					bag_wishlist_order_display: image.bag_wishlist_order_display
				},
				error: null
			};

			return resolve(dataResponse);
		});
	}).catch(err => {
		return err;
	});
}

const getProductImageById = (productId) => {
	let query = `SELECT product.id, product.barcode, product.stock, product_image.image_url, product_image.type FROM product JOIN product_image ON product.id = product_image.product_id WHERE product.id = ${productId}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const responseError = {
          code: 400,
          status: 'bad request',
          data: null,
          error: {
            message: "Bad Request",
            errMessage: error
          }
        };

        return reject(responseError);
      }

      const numProductPhotograph = result.length;

      if(numProductPhotograph > 0) {
        const productBuilder = [];

        result.forEach((res, index) => {
          let temp = {
            product_id: res.id,
            barcode: res.barcode,
            stock: res.stock,
            image: []
          };

          let image_meta = {
            type: res.type,
            image_url: `http://api.myalexis.xyz:3001/${res.image_url}`
          };

          if(index == 0) {
            temp.image.push(image_meta);
            productBuilder.push(temp);
          } else {
            let exist = false;
            let locateIndex = -1;
            productBuilder.forEach((product, index) => {
              if(product.product_id == temp.product_id) {
                locateIndex = index;
                exist = true;
              }
            });

            if(!exist) {
              temp.image.push(image_meta);
              productBuilder.push(temp);
            } else {
              productBuilder[locateIndex].image.push(image_meta);
            }
          }
        });

        const dataBuilder = {
          total_data: numProductPhotograph,
          products: productBuilder
        };

        const response = {
          code: 200,
          status: "ok",
          data: dataBuilder,
          error: null
        };

        return resolve(response);
      } else {
        const dataBuilder = {
          total_data: numProductPhotograph,
          products: []
        };

        const response = {
          code: 200,
          status: "ok",
          data: dataBuilder,
          error: null
        };

        return resolve(response);
      }

    });
  }).catch(err => {
    return err;
  });
}

export default {
	addNewImage,
	productIsExist,
	updateImage,
	getProductImageById
};