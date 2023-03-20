const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const asyncHandler = require("express-async-handler");
const validate = require('../../validators');


router.post("/sign-up", validate.signUp, asyncHandler(handler.auth.sign_up));

router.post("/sign-in", asyncHandler(handler.auth.login));



module.exports = router;