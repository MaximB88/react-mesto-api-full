const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUsers, getUser, getCurrentUser, updateUser, updateAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/me", getCurrentUser);

router.get("/users/:userId", celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUser);

router.patch("users/me", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch("users/me/avatar", celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(
      /^(https?:\/\/)?([a-zA-z0-9%$&=?/.-]+)\.([a-zA-z0-9%$&=?/.-]+)([a-zA-z0-9%$&=?/.-]+)?(#)?$/,
    ),
  }),
}), updateAvatar);

module.exports = router;
