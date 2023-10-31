module.exports = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user.data;
    if (!roles.includes(role)) {
      return res.status(405).json({
        status: "error",
        message: "you don't have permision",
      });
    }
    return next();
  };
};
