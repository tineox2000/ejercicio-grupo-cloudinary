// const { deleteFile } = require('../../utils/middlewares/deleteFile.middleware');
const Player = require('./player.model');

const getAllPlayers = async (req, res, next) =>{
    try {
        const players = await Player.find();
        return res.status(200).json(players);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postPlayer = async (req, res, next) =>{
    try {
        const player = await new Player(req.body);

        //Vamos a recoger la imagen del formulario
        if(req.file){
            player.photo = req.file.path
        }

        const savedPlayer = await player.save();
        return res.status(200).json(savedPlayer);
    } catch (error) {
        return res.status(500).json(error);
    }
}


const putPlayer = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const player = new Player(req.body);
        player._id = id;
        
        if(req.file){
            player.photo = req.file.path;
        }

        const playerDb = await Player.findByIdAndUpdate(id, player);
        if(playerDb.photo){
            deleteFile(playerDb.photo)
        }
        return res.status(200).json(playerDb);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deletePlayer = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const player = await Player.findByIdAndDelete(id);
        if(player.photo){
            deleteFile(player.photo);
        }
        return res.status(200).json(player);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {getAllPlayers, postPlayer, putPlayer, deletePlayer};