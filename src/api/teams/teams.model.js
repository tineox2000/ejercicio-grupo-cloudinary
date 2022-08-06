const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {type: 'string', required: true},
    players: [{type: Schema.Types.ObjectId, ref:'Player'}],
},{
    timestamps:true
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;