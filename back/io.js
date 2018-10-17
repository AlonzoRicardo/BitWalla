module.exports = (io) => {
    console.log("Socket io listening...");
     io.on('connection', (socket) => {
        socket.on('disconnect', () => {
            console.log(socket.id, 'USER DISCONECTED');
        })

        socket.on('message', data => {
            console.log("Received message from client");
            const package = data;
            splited = data.msg.split(' ');
            socket.broadcast.emit(`${splited[0]} ${splited[1]} `, package)
        })
    });
 } 