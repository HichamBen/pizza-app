const accessList = require("./accessList");

module.exports = {
  origin: function (origin, callback) {
    if (accessList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
