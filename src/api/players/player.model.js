const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: {type: String, required: true},
    team: {type: String, required: true},
    dorsal: {type: Number, required: true},
    age: {type: Number, required: true},
    photo: {type: 'string'},
},{
    timestamps: true
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;