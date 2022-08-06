const mongoose = require('mongoose');
const db = require('../database/database');
const Player = require('../../api/players/player.model');

const initialPlayers = [
    {
        name: "Oliver Atom",
        team: "Niupi",
        dorsal: 10,
        age: 19,
    },{
        name: "Benji Price",
        team: "Niupi",
        dorsal: 1,
        age: 24,
    },{
        name: "Marc Lenders",
        team: "Toho",
        dorsal: 10,
        age: 23,
    },{
        name: "Julian Ross",
        team: "Mambo",
        dorsal: 14,
        age: 17,
    }
]

mongoose
    .connect(db.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      const allPlayers = await Player.find();
  
      if (allPlayers.length) {
        console.log('Eliminando jugadores...');
        await Player.collection.drop();
      } else {
        console.log('No hay jugadores en la base de datos... procediendo a añadir los jugadores');
      }
    })
    .catch(error => console.log('Error al borrar la colección de la base de datos', error))
    .then(async () => {
      await Player.insertMany(initialPlayers);
      console.log('Jugadores añadidas con éxito...');
    })
    .catch(error => console.log('Error al añadir jugadores a la base de datos', error))
    .finally(() => mongoose.disconnect()); 