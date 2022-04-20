const mongoose = require('mongoose');

const {Schema, model } = mongoose;

const TrainerSchema = new Schema({
    id: String,
    name: String,
    episode: String,
    pokemons: [Object]
});

const Trainer = model('Trainer', TrainerSchema);

module.exports = {Trainer};


