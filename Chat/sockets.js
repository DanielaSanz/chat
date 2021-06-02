const MsgCtrl = {};

const Chat = require('./public/models/Chat');

module.exports = function (server) {

    const io = require("socket.io")(server);

    const mongoose = require('mongoose');
    const mongoDB= 'mongodb+srv://nana:nana1008@cluster0.2kjb5.mongodb.net/chat_proof?retryWrites=true&w=majority';

    mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then( () => {

        console.log('db conected');
        
    }).catch(err => console.log(err));

    
    var sockets = io.listen(server);

    //sockets.on('connection', function (socket) {

       // console.log('Nuevo cliente conectado')
        
        //socket.on('client-message', msg => {
          //      sockets.emit('server-message', msg);
        //});
    //});

    sockets.on('connection', async socket => {

        let messages = await Chat.find({}).limit(8).sort('-created');

        socket.emit('load old msgs', messages);
    
        console.log('Nuevo cliente conectado')

            /* socket.on('client-message', function(data) {
                console.log(data);

                //Para que es esta linea ?
                sockets.emit('server-message', data);
            });  */

            socket.on('client-message', async(data) => {
                sockets.emit('server-message', data);
                console.log(data);
                var msg = data.trim();
                var newMsg = new Chat({
                    msg
                });
                await newMsg.save();
                console.log(newMsg);
                
            });

        });
};