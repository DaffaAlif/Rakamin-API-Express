let express = require("express");
let router = express.Router();
let bcrypt = require("bcryptjs")
let validator = require("../validators");

const authenticateToken = require('../middleware/authenticateToken')

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../models/userModels");

/* GET users listing. */
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await getAllUsers();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//GET current users
router.get("/current", authenticateToken, async (req, res) => {

  const user = req.user
  try {
    const result = await getUserById(user.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const result = await getUserById(userId);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  const { name, email, no_rek, no_hp, password } = req.body;

  const { error } = validator.userSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      message: error.message,
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const result = await createUser(name, email, no_rek, no_hp, hashedPassword);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user by ID
router.put("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, no_rek, no_hp } = req.body;
  try {
    const result = updateUser(userId, name, email, no_rek, no_hp);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const result = await deleteUser(userId);
    if (result) {
      res.status(200).json({ message: "Data berhasil dihapus", result });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
