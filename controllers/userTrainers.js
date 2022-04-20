const { v4: uuidv4 } = require('uuid');
const {User} = require('../models/user.js');
const {Trainer} = require('../models/trainer');

const addTrainer = async (req, res) => {
    const {userId, trainer} = req.body;
    trainer.id = await uuidv4();
    try {
        await Trainer.create({id: trainer.id, name: trainer.name, episode: trainer.episode, pokemons: trainer.pokemons});
        await User.updateOne({_id: userId}, {$push: {trainers: trainer}});
        res.status(200).send({message: 'Trainer added'});
    } catch (err) {
       res.status(500).send({message: "Internal server error"});
    }
}

const removeTrainer = async (req, res) => {
    const {userId, trainerId} = req.body;
    try {
        await Trainer.deleteOne({id: trainerId});
        await User.updateOne({_id: userId}, {$pull: {trainers: {id: trainerId}}});
        res.status(200).send({message: 'Trainer removed'});
    } catch (err) {  
        res.status(500).send({message: "Internal server error"});
    }
}

const addPokemon = async(req, res) => {
    const {userId, trainerId, pokemon} = req.body
    pokemon.mongoId = await uuidv4();
    try {
        await Trainer.updateOne({id: trainerId}, {$push: {pokemons: pokemon}});
        const userTrainer = await Trainer.findOne({id: trainerId});
        await User.updateOne({_id: userId}, {$pull: {trainers: {id: trainerId}}});
        await User.updateOne({_id: userId}, {$push: {trainers: userTrainer}});
        res.status(200).send({message: 'Pokemon added'});
    } catch(err) {
        res.status(500).send({message: 'Internal server error'});
    }
}

const updateUserData = async (req,res) => {
    const {userId} = req.body;
    try {
        const user = await User.findOne({_id: userId});
        user && res.status(200).send({message: 'User data updated', userData: {userId: user._id, userName: user.userName, email: user.email, trainers: user.trainers}});
    } catch (err) {
        res.status(500).send({message: 'Internal server error :('});
    }

}

module.exports = {addTrainer, removeTrainer, addPokemon, updateUserData}