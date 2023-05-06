const express = require("express");
const bodyParser = require("body-parser");
const randomstring = require("randomstring");

const router = express.Router();

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/", (req, res) => {
  try {
    const string = randomstring.generate(20);
    const object = {
        string :string
    }
    res.json(object);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
