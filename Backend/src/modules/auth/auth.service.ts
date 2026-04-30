import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, User } from "../user/user.model";

export const registerUser = async (data: Partial<IUser>) => {
  const { name, email, password } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,

    role: "teacher", 
    status: "pending",     
    isApproved: false,     
  });

  return user;
};

const generateAccessToken = (user: IUser) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user: IUser) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");
  if(user.role!=="admin"){
 if (!user.isApproved) {
    throw new Error("Your account is pending admin approval");
  }

  if (user.status === "blocked") {
    throw new Error("Your account has been blocked by admin");
  }

  if (user.status !== "active") {
    throw new Error("Your account is not active");
  }
  }
 

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};