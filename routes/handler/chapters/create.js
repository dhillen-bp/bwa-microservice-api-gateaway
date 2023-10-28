const apiAdapter = require("../../apiAdapter");

const { URL_SERVICE_COURSES } = process.env;

const api = apiAdapter(URL_SERVICE_COURSES);

module.exports = async (req, res) => {
  try {
    const chapter = await api.post("/api/chapters", req.body);
    return res.json(chapter.data);
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
