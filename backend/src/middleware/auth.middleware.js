import jwt from "jsonwebtoken";

export default function authUser(req, res, next) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "please login first" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "please authenticate first" });
  }
}
