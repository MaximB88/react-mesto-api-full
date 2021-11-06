const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors, celebrate, Joi } = require("celebrate");

const app = express();

const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");
const { createUser } = require("./controllers/users");
const errorHandler = require("./middlewares/errorHandler");
const { login } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(cors());
app.options("*", cors());

app.use(requestLogger);

app.use("/", express.json());

app.post("/singin", celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
app.post("/signup", celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(
      /^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([a-zA-Z]{1,10})([\w\W\d]{1,})?$/,
    ),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(40),
  }),
}), createUser);

app.use(auth);
app.use("/", usersRoute);
app.use("/", cardsRoute);

app.all("*", (req, res) => {
  res.status(404).send({ message: `Страницы по адресу ${req.baseUrl} не существует` });
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
