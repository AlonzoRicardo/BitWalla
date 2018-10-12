module.exports = (io) => {
    console.log("Socketio listening...");
     io.on('connection', function(socket){
        console.log(`A user connected with id: ${socket.id}`);
        
//        socket.emit('message',{msg:"Holafromserverrr", timestamp: Date.now()});
        
        socket.on('disconnect', () => {
            console.log(socket.user, 'USER HEREEEEEEEE');
            
        })

        socket.on('message', data => {
            console.log("Received message from client");
            console.log(data);
            socket.broadcast.emit('message', data);
        })
    });
 } 