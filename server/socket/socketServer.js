const socketio = require("socket.io");

let io;

const initSocket = (server) => {

  io = socketio(server, {

    cors:{
      origin:"*"
    }

  });

  io.on("connection",(socket)=>{

    console.log("User Connected");

    socket.on(
      "busLocationUpdate",
      (data)=>{

        io.emit(
          "receiveBusLocation",
          data
        );

      }
    );

    socket.on("disconnect",()=>{

      console.log(
        "User Disconnected"
      );

    });

  });

};

module.exports = {
  initSocket
};