import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    let token;

    // Check for the token in the Authorization header
    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    // If the token is not in the header, check for it in cookies
    if (!token && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, "secret");
    // Attach user data to the request for further use
    req.user = decoded;
    // console.log(req.user);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
