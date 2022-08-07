const Team = require('./teams.model');

const getAllTeams = async (req, res, next) => {
    try {
        const teams = await Team.find().populate('players');
        return res.status(200).json(teams);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getTeam = async (req, res, next) => {
    try {
        const {id} = req.params;
        const teams = await Team.findById(id).populate('player');
        return res.status(200).json(teams);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const  postTeam = async (req, res, next) => {
    try {
        const team = new Team(req.body);
        const savedTeam = await team.save();
        return res.status(201).json(savedTeam);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {getAllTeams, getTeam, postTeam}