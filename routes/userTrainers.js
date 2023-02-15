const express = require("express");
const controllers = require("../controllers/userTrainers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.patch("/:id/addTrainer", controllers.addTrainer);
router.patch("/:userId/:trainerId/removeTrainer", controllers.removeTrainer);
router.patch("/:userId/:trainerId/:pokemon/addPokemon", controllers.addPokemon);
router.post("/:id/updateData", controllers.updateUserData);

module.exports = router;
