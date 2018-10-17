module.exports = (io) => {
    console.log("Socket io listening...");
     io.on('connection', (socket) => {
        //console.log('HEJREHJRHEJHEJHJE', socket.server);
        
//        socket.emit('message',{msg:"Holafromserverrr", timestamp: Date.now()});
        
        socket.on('disconnect', () => {
            //console.log(socket.user, 'USER DISCONECTED');
        })

        socket.on('message', data => {
            console.log("Received message from client");
            console.log(data);
            const package = data;
            //socket.broadcast.emit('message', data);
            //socket.broadcast.emit(`message_user_${data.to}`, data)
            splited = data.msg.split(' ');
            console.log(splited);
            
            socket.broadcast.emit(`${splited[0]} ${splited[1]} `, package)
        })
    });
 } 