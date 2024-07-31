const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/userRoutes");
const secret = "miniproject";
//@desc register user
//@route post/register
//access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, type } = req.body;
  //   console.log(name, email, password);
  if (!name || !email || !password || !type) {
    res.status(400);
    throw new Error("all feilds are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered!");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: name,
      email,
      password: hashedPassword,
      type: type,
    });
    console.log(user);
    if (user) {
      console.log("user successfull added to db");
      res.status(200).json(user);
    } else {
      res.status(400);
      throw new Error("user details are not valid");
    }
  }
});

//@desc login user
//@route post/login
//access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json("all feilds are mandatory");
  } else {
    const userDoc = await User.findOne({ email: email });
    const passOk = await bcrypt.compareSync(password, userDoc.password);
    if (passOk && userDoc) {
      jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) {
          console.log("loginerror");
          throw err;
        } else {
          res
            .cookie("token", token, {
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .json({
              id: userDoc._id,
              email,
            });
          console.log("token created");
        }
      });
    } else {
      res.status(400).json("wrong credentials");
    }
  }
});

// @desc Fetch profile details
// @route GET /profile
// @access Private
const getProfileDetails = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

const logoutUser = asyncHandler((req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  res.cookie("token", "", { maxAge: 0 });
  res.json({ msg: "logout successful" });
});

const veriyJwt = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "unauthorized" });
  }
};

const updateUser = async (req, res) => {
  if (
    !req.user ||
    !req.body.updatedUser |
      (req.user._id.toString() !== req.body.updatedUser._id)
  ) {
    return res.status(404).json("user not found");
  }
  const newUserObj = {
    ...req.body.updatedUser,
    password: req.user.password,
  };
  try {
    await User.findOneAndUpdate({ _id: newUserObj._id }, newUserObj);
    res.status(200).json("update success");
  } catch (err) {
    console.log(err);
    res.status(500).json("something went wrong");
  }
};

const getUsers = async (req, res) => {
  let type = req.user.type;
  const crop = req.query.crop;
  if (!type || !crop) {
    return res.status(401).json({ error: "unauthorized" });
  }
  if (type === "farmer") type = "industrialist";
  else type = "farmer";
  try {
    let users = await User.find({ "cropDetails.name": crop, type });
    console.log(users.length);
    if (users.length === 0) users = null;
    return res.status(200).json({ displayUsers: users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "something went wrong" });
  }
};

const getUserDetails = asyncHandler(async (req, res) => {
  const _id = req.query.id;

  if (!_id) {
    return res.status(401).json({ error: "invalid" });
  }

  try {
    const user = await User.findById(_id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    return res.status(401).json({ error: "Invalid" });
  }
});
module.exports = {
  registerUser,
  loginUser,
  getProfileDetails,
  logoutUser,
  veriyJwt,
  updateUser,
  getUsers,
  getUserDetails,
};
