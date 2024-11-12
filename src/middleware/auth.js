const checkAdminAccess = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("Unauthorized Request");
  }
};

const checkUserAccess = (req, res, next) => {
  console.log("Checking user access");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("Unauthorized Request");
  }
};

module.exports = {
  checkAdminAccess,
  checkUserAccess,
};
