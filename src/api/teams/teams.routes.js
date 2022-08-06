const express = require('express');
const {getAllTeams, getTeam, postTeam} = require('./teams.controller');

const teamRoutes = express.Router();

teamRoutes.get('/', getAllTeams);
teamRoutes.get('/:id', getTeam);
teamRoutes.post('/', postTeam);

module.exports = teamRoutes;