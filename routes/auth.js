const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { login } = require("../models/authModels");



router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const NODE_ENV = process.env.NODE_ENV




  try {
   
    const result = await login(email);

    const isPasswordValid = await bcrypt.compare(password, result.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        { id: result.id, email: result.email },
        NODE_ENV,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token });
    } else {
      res.status(401).json({ message: "Email atau Password Salah" });
    }
  } catch (error) {
    res.status(500).json({ error: `Database error ${error}` });
  }
});

module.exports = router;
