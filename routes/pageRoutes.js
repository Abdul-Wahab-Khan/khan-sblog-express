const express = require("express");
const verifyManager = require("../middlwares/managerVerify");
const tokenValidator = require("../middlwares/tokenValidatorMiddleware");
const pageController = require("../controllers/pageController");
const router = express.Router();

router
  .route("/")
  .get(pageController.getPageData)
  .post([tokenValidator, verifyManager], pageController.postPageInfo)
  .put([tokenValidator, verifyManager], pageController.updatePageInfo);

module.exports = router;
