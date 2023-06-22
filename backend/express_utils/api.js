const express = require("express");
const router = express.Router();

const middleware = require("./middleware");

const get_near_restaurant = require("./api/get_near_restaurant");
const login = require("./api/login");
const register = require("./api/register");
const add_review = require("./api/add_review");

router.post(login.route, login.func);
router.post(register.route, register.func);
router.post(add_review.route, middleware, add_review.func);

router.post(get_near_restaurant.route, get_near_restaurant.func);

// TODO

module.exports = router;