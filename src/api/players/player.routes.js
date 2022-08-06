const express = require('express');
const upload = require('../../utils/middlewares/uploadFile.middleware');
const {getAllPlayers, postPlayer, putPlayer, deletePlayer} = require('./player.controller');

const playersRoutes = express.Router();

playersRoutes.get('/', getAllPlayers);
playersRoutes.post('/', upload.single('photo'), postPlayer);
playersRoutes.put('/:id', upload.single('photo'), putPlayer);
playersRoutes.delete('/:id', deletePlayer);


module.exports = playersRoutes;