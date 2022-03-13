import auth from "../models/authModel.js";
// import { mobileRegistration, registration, login, changeActivation } from "../models/authModel.js";

import express from "express";
const router = express.Router();

router.post("/register", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let email = req.body["email"];
  let no_telp = req.body["no_telp"];

  if(!email.match(mail_format)) {
    const errResponse = {
      code: 400,
      status: 'error',
      message: 'Format email tidak sesuai',
      error: "Email tidak valid"
    };

    res.status(errResponse.code).json(errResponse);
    return;
  }

  no_telp = no_telp.replace("+", "");
  no_telp = no_telp.replace("-", "");
  no_telp = no_telp.replace("(", "");
  no_telp = no_telp.replace(")", "");
  no_telp = no_telp.replace("62", "0");

  if(isNaN(no_telp)) {
    const errResponse = {
      code: 400,
      status: 'error',
      message: 'No telpon hanya mengandung angka',
      error: "No Telpon tidak valid"
    };

    res.status(errResponse.code).json(errResponse);
    return;
  }

  const existingEmail = await auth.checkExistingUser(email);
  const existingNoHP = await auth.checkExistingUser(no_telp);

  let existingUsernameEmail = existingEmail.data.exist;
  let existingUsernameNoHP = existingNoHP.data.exist;

  if(existingUsernameEmail || existingUsernameNoHP) {
    let errorMessage = '';

    if(existingUsernameEmail) {
      errorMessage += 'Email sudah terdaftar';
    }

    if(existingUsernameNoHP) {
      if(errorMessage == "") {
        errorMessage += 'No HP sudah terdaftar';
      } else {
        errorMessage += ' dan No HP sudah terdaftar';
      }
    }

    const errResponse = {
      code: 400,
      status: 'error',
      message: errorMessage,
      error: 'Sudah terdaftar'
    };

    res.status(errResponse.code).json(errResponse);
    return;
  }

  const user = {
    username: email,
    password: req.body["password"],
    nama_lengkap: req.body["nama_lengkap"],
    email: email,
    no_telp: no_telp,
    tanggal_lahir: req.body["tanggal_lahir"],
  };

  // const result = await auth.registration(user);
  const result = await auth.mobileRegistration(user);

  res.status(result.code).json(result);

  return;
});

router.post("/login", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
  // username bisa gunakan email dan nomor hp
  let username = req.body['username'];
  let password = req.body['password'];
  let isMail = true;

  if(!username.match(mail_format)) {
    username = username.replace("+", "");
    username = username.replace("-", "");
    username = username.replace("(", "");
    username = username.replace(")", "");
    username = username.replace("62", "0");

    if(isNaN(username)) {
      const errResponse = {
        code: 400,
        status: "error",
        message: "Username harus menggunakan nomor hp atau email",
        error: "Username tidak valid"
      };

      res.status(errResponse.code).json(errResponse);
      return;
    }

    isMail = false;
  }

  const user = {
    username,
    password,
    isMail
  };
  
  const result = await auth.login(user);

  res.status(result.code).json(result);

  return;
});

router.post("/activate", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Accept", "application/json");

  const user = {
    email: req.body["email"],
  };

  const result = await auth.changeActivation(user);

  res.status(result.code).json(result);

  return;
});

export default router;
