

const socketController = (socket) => {

    console.log('Cliente conectado', socket.id);

    //Escuchando cuando un socket se desconecta
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    })

    //El segundo argumento de la funcion callback (llamado tambien callback) es la respuesta que el servidor le hace al cliente cuando el cliente emite un mensaje
    socket.on('enviar-mensaje', (payload, callback) => {
        
        const respuestaPorEmision = payload;
        callback( respuestaPorEmision );

        socket.broadcast.emit('enviar-mensaje', payload);
    
    })

}


module.exports = {
    socketController,
}