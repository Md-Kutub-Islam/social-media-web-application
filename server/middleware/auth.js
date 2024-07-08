import jwt from "jsonwebtoken";
// import AppError from '../utills/errorUtills'

export const verifyToken = async (req, res, next) => {
  const { token } = req.header("Authorization");

  if (!token) {
    // return next( new AppError('Unauthenticated, please login again', 400))
    console.log("error");
  }

  const userDatails = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = userDatails;

  next();
};
