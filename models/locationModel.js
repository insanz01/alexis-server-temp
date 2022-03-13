// const connection = require("../config/database.js");
import connection from '../config/database.js';

// const locations = {

	const getAllProvinces = () => {
	  let query = "SELECT * FROM reg_provinces";

	  return new Promise((resolve, reject) => {
	    connection.query(query, (error, result) => {
	      if (error) {
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

	      const response = {
	      	code: 200,
	      	status: "ok",
	      	data: {
	      		provinces: result
	      	},
	      	error: null
	      }

	      return resolve(response);
	    });
	  }).catch(err => {
	    return err;
	  });
	}

	const getAllRegencies = () => {
	  let query = "SELECT * FROM reg_regencies";

	  return new Promise((resolve, reject) => {
	    connection.query(query, (error, result) => {
	      if (error) {
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

	      const response = {
	      	code: 200,
	      	status: "ok",
	      	data: {
	      		regencies: result
	      	},
	      	error: null
	      };

	      return resolve(response);
	    });
	  }).catch(err => {
	    return err;
	  });
	}

	const getAllRegenciesByProvinceId = (province_id) => {
		let query = `SELECT * FROM reg_regencies WHERE province_id = ${province_id}`;

		return new Promise((resolve, reject) => {
			connection.query(query, (error, result) => {
				if (error) {
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

				const response = {
					code: 200,
					status: "ok",
					data: {
						province_id: province_id,
						regencies: result
					},
					error: null
				};

				return resolve(response);
			});
		}).catch(err => {
			return err;
		});
	}

	const getAllDistricts= () => {
	  let query = "SELECT * FROM reg_districts";

	  return new Promise((resolve, reject) => {
	    connection.query(query, (error, result) => {
	      if (error) {
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

	      const response = {
	      	code: 200,
	      	status: "ok",
	      	data: {
	      		districts: result
	      	},
	      	error: null
	      };

	      return resolve(response);
	    });
	  }).catch(err => {
	    return err;
	  });
	}

	const getAllDistrictsByRegencyId = (regency_id) => {
		let query = `SELECT * FROM reg_districts WHERE regency_id = ${regency_id}`;

		return new Promise((resolve, reject) => {
			connection.query(query, (error, result) => {
				if (error) {
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

				const response = {
					code: 200,
					status: "ok",
					data: {
						regency_id: regency_id,
						districts: result
					},
					error: null
				};

				return resolve(response);
			});
		}).catch(err => {
			return err;
		});
	}

	const getAllVillages = () => {
	  let query = "SELECT * FROM reg_villages";

	  return new Promise((resolve, reject) => {
	    connection.query(query, (error, result) => {
	      if (error) {
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

	      const response = {
	      	code: 200,
	      	status: "ok",
	      	data: {
	      		villages: result
	      	},
	      	error: null
	      };

	      return resolve(response);
	    });
	  }).catch(err => {
	    return err;
	  });
	}

	const getAllVillagesByDistrictId = (district_id) => {
		let query = `SELECT * FROM reg_villages WHERE district_id = ${district_id}`;

		return new Promise((resolve, reject) => {
			connection.query(query, (error, result) => {
				if (error) {
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

				const response = {
					code: 200,
					status: "ok",
					data: {
						district_id: district_id,
						villages: result
					},
					error: null
				};

				return resolve(response);
			});
		}).catch(err => {
			return err;
		});
	}

// }

export default {
  getAllProvinces,
  getAllRegencies,
  getAllRegenciesByProvinceId,
  getAllDistricts,
  getAllDistrictsByRegencyId,
  getAllVillages,
  getAllVillagesByDistrictId,
};

// export default locations;