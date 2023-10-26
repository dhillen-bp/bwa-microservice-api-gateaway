const apiAdapter = require("../../apiAdapter");
const jwt = require("jsonwebtoken");

const {
  URL_SERVICE_USERS,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USERS);

module.exports = async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const email = req.body.email;

    if (!email || !refreshToken) {
      return res.status(400).json({
        status: "error",
        message: "invalid token",
      });
    }

    await api.get("/refresh_tokens", {
      params: {
        refresh_token: refreshToken,
      },
    });

    jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: "error",
          message: err.message,
        });
      }

      if (email !== decoded.data.email) {
        return res.status(400).json({
          status: "error",
          message: "email is not valid",
        });
      }

      const token = jwt.sign(
        {
          data: decoded.data,
        },
        JWT_SECRET,
        {
          expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
        }
      );

      return res.json({
        status: "success",
        data: {
          token,
        },
      });
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({
        status: "error",
        message: "service unavailable",
      });
    }
    if (error.code == "ECONNABORTED") {
      return res.status(408).json({
        status: "error",
        message: "request time out",
      });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
