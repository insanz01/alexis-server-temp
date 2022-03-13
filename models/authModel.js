// const connection = require("../config/database.js");
import connection from "../config/database.js";
// import format from "date-format";
// const format = require("date-format");
import dateFormat from "dateformat";
const now = new Date();

// for encryption
import bcrypt from "bcrypt";
import crypto from "crypto-js";

const salt = bcrypt.genSaltSync(10);

const checkExistingUser = (username) => {
  let query = `SELECT * FROM customer WHERE no_telp = '${username}' OR email = '${username}'`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if(error) {
        const errResponse = {
          code: 400,
          status: 'error',
          data: null,
          error: {
            message: 'Ada yang salah',
            errMessage: error
          }
        };

        reject(errResponse);
      }

      let response = {
        code: 200,
        status: 'ok',
        data: {
          message: "username telah terdaftar",
          exist: false
        },
        error: null
      };

      if(result.length > 0) {
        response = {
          code: 200,
          status: 'ok',
          data: {
            message: "username telah terdaftar",
            exist: true
          },
          error: null
        };        
      }

      resolve(response);

    });
  }).catch(err => {
    return err;
  });
}

const mobileRegistration = (user) => {
  // const datetime = format.asString("hh:mm:ss.SSS", new Date());
  // masks.hammerTime = 'hh:mm:ss.SSS';
  const datetime = dateFormat(now);

  const passwordHash = bcrypt.hashSync(user.password, salt);

  const token = crypto.SHA256(`${user.email}/${datetime}`).toString();

  const userData = {
    username: user.username,
    password: passwordHash,
    token: token,
    is_active: 0,
  };

  let userQuery = `INSERT INTO users (username, password, token, is_active) VALUES ('${userData.username}', '${userData.password}', '${userData.token}', ${userData.is_active})`;

  return new Promise((resolve, reject) => {
    connection.query(userQuery, (error, result) => {
      if (error || result.length == 0) {
        console.error(error);
        let errResponse = {
          code: 400,
          status: "error",
          data: null,
          error: {
            message: "Tidak bisa menambahkan data user",
            errMessage: error
          }
        };

        return reject(errResponse);
      }

      resolve(result);
    });
  })
    .then((result) => {
      const kode_referal = user.kode_referal ?? null;
      const tanggal_lahir = user.tanggal_lahir ?? null;

      let customerData = {
        user_id: result.insertId,
        nama_lengkap: user.nama_lengkap,
        email: user.email,
        no_telp: user.no_telp,
        tanggal_lahir: tanggal_lahir,
        kode_referal: kode_referal,
      };

      let customerQuery = `INSERT INTO customer (user_id, nama_lengkap, email, no_telp, tanggal_lahir, kode_referal) VALUES (${customerData.user_id}, '${customerData.nama_lengkap}', '${customerData.email}', '${customerData.no_telp}', ${customerData.tanggal_lahir}, ${customerData.kode_referal})`;

      return new Promise((resolve, reject) => {
        connection.query(customerQuery, (error, result) => {
          if (error) {
            console.error(error);

            let errResponse = {
              code: 400,
              status: "error",
              data: null,
              error: {
                message: "Tidak bisa menambahkan data",
                errMessage: error
              }
            };

            reject(errResponse);
          }

          let response = {
            code: 200,
            status: "ok",
            data: {
              nama_lengkap: customerData.nama_lengkap,
              email: customerData.email,
              no_hp: customerData.no_telp,
            },
            error: null
          };

          resolve(response);
        });
      });
    })
    .catch((err) => {
      return err;
    });
};

const registration = (user) => {
  // const datetime = format.asString("hh:mm:ss.SSS", new Date());
  // masks.hammerTime = 'hh:mm:ss.SSS';
  const datetime = dateFormat(now);

  const passwordHash = bcrypt.hashSync(user.password, salt);

  const token = crypto.SHA256(`${user.email}/${datetime}`).toString();

  const userData = {
    username: user.username,
    password: passwordHash,
    token: token,
    is_active: 0,
  };

  let userQuery = `INSERT INTO users (username, password, token, is_active) VALUES ('${userData.username}', '${userData.password}', '${userData.token}', ${userData.is_active})`;

  return new Promise((resolve, reject) => {
    connection.query(userQuery, (error, result) => {
      if (error || result.length == 0) {
        let errResponse = {
          code: 400,
          status: "error",
          message: "Tidak bisa menambahkan data user",
          error: "Ada yang salah"
        };

        reject(errResponse);
      }

      if(result.length > 0) {
        resolve(result[0]);
      }
    });
  })
    .then((result) => {
      let kode_referal = user.kode_referal ?? null;

      const customerData = {
        user_id: result.insertId,
        nama_lengkap: user.nama_lengkap,
        email: user.email,
        no_telp: user.no_telp,
        tanggal_lahir: user.tanggal_lahir,
        kode_referal,
      };

      let customerQuery = `INSERT INTO customer (user_id, nama_lengkap, email, no_telp, tanggal_lahir, kode_referal) VALUES (${customerData.user_id}, '${customerData.nama_lengkap}', '${customerData.email}', '${customerData.no_telp}', '${customerData.tanggal_lahir}', ${customerData.kode_referal})`;

      return new Promise((resolve, reject) => {
        connection.query(customerQuery, (error, result) => {
          if (error) {
            let errResponse = {
              code: 400,
              status: "error",
              message: "Tidak bisa menambahkan data",
              error: "Ada yang salah"
            };

            reject(errResponse);
          }

          let response = {
            code: 200,
            status: "ok",
            data: result,
            error: null
          };

          resolve(response);
        });
      });
    })
    .catch((err) => {
      return err;
    });
};

const login = (user) => {
  const passwordHash = bcrypt.hashSync(user.password, salt);

  const userData = {
    username: user.username,
    password: user.password,
  };

  let query = `SELECT id, user_id, nama_lengkap, email, no_telp, tanggal_lahir FROM customer WHERE no_telp = '${userData.username}'`;
  
  if(user.isMail) {
    query = `SELECT id, user_id, nama_lengkap, email, no_telp, tanggal_lahir FROM customer WHERE email = '${userData.username}'`;
  }

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {

      if(error || result.length == 0) {
        const errResponse = {
          code: 403,
          status: "unauthorized",
          message: "Username harus menggunakan nomor hp atau email",
          error: "Username tidak ditemukan"
        };

        reject(errResponse);
      }
      
      resolve(result);

    });
  }).then((res) => {
    const query = `SELECT id, username, password FROM users WHERE id=${res[0].user_id}`;

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

          reject(errResponse);
        }

        const is_valid = bcrypt.compareSync(
          userData.password,
          result[0].password
        );

        if(!is_valid) {
          reject({ code: 403, status: "unauthorized", message: "Password tidak sesuai", error: "Password salah" });
        }

        const resData = {
          id: res[0].id,
          user_id: res[0].user_id,
          nama_lengkap: res[0].nama_lengkap,
          email: res[0].email,
          no_telp: res[0].no_telp,
          tanggal_lahir: res[0].tanggal_lahir,
        };

        resolve({ code: 200, status: "success", message: "Login berhasil", data: resData, error: null });
      });
    }).catch(err => {
      return err;
    });

  }).catch(err => {
    return err;
  });

  // return new Promise((resolve, reject) => {
  //   connection.query(query, (error, result) => {
  //     console.log("1", error);
  //     let errResponse = null;

  //     if (error || result == []) {
  //       errResponse = {
  //         message: "Username / Email / No Telp tidak ada.",
  //         status: 400,
  //       };

  //       console.log("Harusnya ke sini", errResponse);

  //       return reject(errResponse);
  //     }

  //     try {
  //       const resultData = result[0];

  //       if (result) {
  //         const is_active = resultData.is_active ?? false;

  //         if (!is_active) {
  //           errResponse = { message: "Akun ini tidak aktif", status: 400 };
  //           console.log("2", resultData);
  //           return reject(errResponse);
  //         }

  //         const is_valid = bcrypt.compareSync(
  //           userData.password,
  //           resultData.password
  //         );

  //         if (!is_valid) {
  //           errResponse = { message: "Password tidak sesuai.", status: 400 };

  //           return reject(errResponse);
  //         }

  //         const response = {
  //           user_id: resultData.id,
  //           username: resultData.username,
  //           token: resultData.token,
  //           status: 200,
  //         };

  //         // return resolve(result);
  //         return resolve(response);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // }).catch((err) => {
  //   return err;
  // });
};

const changeActivation = async (user) => {
  const data = {
    email: user.email,
  };

  let query = `SELECT is_active FROM users WHERE username = '${data.email}'`;

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

      return resolve(result);
    });
  })
    .then((result) => {
      const is_active = result[0].is_active;

      query = `UPDATE users SET is_active = ${!result[0]
        .is_active} WHERE username = '${data.email}'`;

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

          const successMessage = !is_active
            ? { message: "Akun berhasil diaktifkan" }
            : { message: "Data berhasil dinonaktifkan" };

          const successResponse = {
            code: 200,
            status: "ok",
            data: {
              successMessage
            },
            error: null
          }
          
          return resolve(successResponse);
        });
      });
    })
    .catch((err) => {
      return err;
    });
};

export default { mobileRegistration, registration, login, changeActivation, checkExistingUser };
