const express = require('express');
const upload = require('../../utils/middlewares/uploadFile.middleware');
const {getAllPlayers, getPlayersByYear, postPlayer, putPlayer, deletePlayer} = require('./player.controller');

const playersRoutes = express.Router();

playersRoutes.get('/', getAllPlayers);
playersRoutes.get('/year/:age', getPlayersByYear);
playersRoutes.post('/new', upload.single('photo'), postPlayer);
playersRoutes.put('/edit/:id', upload.single('photo'), putPlayer);
playersRoutes.delete('/delete/:id', deletePlayer);


module.exports = playersRoutes;