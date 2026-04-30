import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedUser extends JwtPayload {
  id: string;
  role: "admin" | "teacher";
}

export interface AuthRequest extends Request {
  user?: DecodedUser;
}

export const verifyAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("SERVER TIME:", new Date());
    const authHeader = req.headers.authorization;
    console.log("authh",authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("tokenn",token)
console.log("SECRET:", process.env.JWT_ACCESS_SECRET);
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
       {
    clockTolerance: 60, 
  }
    ) as DecodedUser;

    req.user = decoded;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorizeRoles = (...roles: ("admin" | "teacher")[]) => {
  console.log("heyyy")
  return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("role",req.user)
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};