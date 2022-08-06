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

const getPlayersByYear = async (req, res, next) => {
    try {
        const { age } = req.params;
        const players = await Player.find({age: {$gte: age}});
        if (players.length) {
            return res.status(200).json(players);
        } else {
            return res.status(404).json('Player not found with this age');
        }
    } catch (error) {
        return next(error);
    }
};
// const getPlayer = async (req, res, next) =>{
//     try {
//         const id = req.params.id;
//         const player = await Player.findById(id);
//         if (player) {
//             return res.status(200).json(player);
//         }else{
//             return res.status(404).json('jugador no encontrado');
//         }
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// }

// const getPlayersAge = ("player.models/:playerSchema/:age", (req, res) => {
  
//     const { playerSchema } = req.params;
  
//     const found = player.models.find((player) => player.toLowerCase() === playerSchema.toLowerCase());
  
//     if (found) {
//       return res.send("Jugador encontrado, aquí lo tienes: ${found}");
//     } else {
//       return res.send("No tenemos el jugador que buscas. ${playerSchema} no está en nuestra colección");
//     }
//   });

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

module.exports = {getAllPlayers, getPlayersByYear, postPlayer, putPlayer, deletePlayer};