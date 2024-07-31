const express = require("express");
const {
  registerUser,
  loginUser,
  getProfileDetails,
  profileDetails,
  logoutUser,
  veriyJwt,
  updateUser,
  getUsers,
  getUserDetails,
} = require("../controllers/userController");
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfileDetails);
router.get("/logout", logoutUser);
router.post("/update", veriyJwt, updateUser);
router.get("/users", veriyJwt, getUsers);
router.get("/getUser", veriyJwt, getUserDetails);
module.exports = router;
