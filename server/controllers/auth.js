import AppError from "../utills/errorUtills.js";
import User from "../model/user.js";
import bcrypt from "bcryptjs"; // Instead of 'bcrypt'

// cookieOption
const cookieOption = {
  maxAge: 1 * 24 * 60 * 1000, // 7 days
  httpOnly: true,
  // secure: true
};
if (process.env.NODE_ENV === "production") {
  cookieOption.secure = true;
}

// Register user
export const register = async (req, res, next) => {
  try {
    // const { firstName, lastName, email, password, picturePath, friends, skills, stream, bio } = req.body

    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      stream,
      skills,
      achievement,
      bio,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    if (!firstName || !lastName || !email || !password) {
      return next(new AppError("All field are required", 400));
    }

    // Check user is exists or not already
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError("Email is already exists", 400));
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      stream,
      skills,
      achievement,
      bio,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    if (!user) {
      return next(
        new AppError("User resgistration faield, please try again", 400)
      );
    }

    await user.save();

    user.password = undefined; // we dont want to send password to end user that why we undefined password

    // before we go to registerd we have to generate jwt token which store inside the cookie
    const token = await user.generateJWTToken();
    res.cookie("token", token, cookieOption);

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("All field are required", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError("Email or password does not match", 400));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie("token", token, cookieOption);

    res.status(200).json({
      success: true,
      message: "User loggedin successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
