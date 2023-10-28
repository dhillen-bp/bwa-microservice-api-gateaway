const apiAdapter = require("../../apiAdapter");

const { URL_SERVICE_COURSES } = process.env;

const api = apiAdapter(URL_SERVICE_COURSES);

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await api.get(`/api/courses/${id}`);
    return res.json(course.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
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
