// const connection = require('../config/database.js');
import connection from '../config/database.js';

const getAllCustomer = () => {
  let query = "SELECT * FROM customer";

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
          customers: result
        },
        error: null
      }

      return resolve(response);
    });
  });
}

// get customer by email
const getSingleCustomerByEmail = (user) => {
  let query = `SELECT * FROM customer WHERE email = '${user.email}'`;

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
          customer: (result.length == 1) ? result[0] : result
        },
        error: null
      }

      return resolve(response);
    });
  });
}

const getSingleCustomerByUserId = (user_id) => {
  let query = `SELECT * FROM customer WHERE id = ${user_id}`;

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
          customer: (result.length == 1) ? result[0] : result
        },
        error: null
      }

      return resolve(response);
    })
  }).catch(err => {
    return err;
  });

}

export default { getAllCustomer, getSingleCustomerByEmail, getSingleCustomerByUserId }
