const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET home page */
router.get("/profile", (req, res, next) => {
  res.render("profile");
});

router.get("/post-project", (req, res, next) => {
  res.render("post-project");
});

router.get("/tool-to-offer", (req, res, next) => {
  res.render("tool-to-offer");
});

router.get("/matches", (req, res, next) => {
  res.render("matches");
});

module.exports = router;
