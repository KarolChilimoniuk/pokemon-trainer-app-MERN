const express = require('express');
const controllers = require('../controllers/userTrainers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.patch('/:id/addTrainer', auth, controllers.addTrainer);
router.patch('/:userId/:trainerId/removeTrainer', auth, controllers.removeTrainer);
router.patch('/:userId/:trainerId/:pokemon/addPokemon', auth, controllers.addPokemon);
router.post('/:id/updateData', auth, controllers.updateUserData);

module.exports = router;