
//Referencias del html
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje =  document.querySelector('#txtMensaje');
const txtName =  document.querySelector('#txtName');
const btnEnviar = document.querySelector('#btnEnviar');
let lblMensajes = document.querySelector('#lblMensajes');
let lblError = document.querySelector('#lblError');

//Variables
let mensajeNuevo = null;
let mensajeViejo = null;


const socket = io();

//El on es para escuchar eventos
socket.on('connect', () => {//'connect', avisa cuando el cliente esta conectado al servidor
    // console.log('Conectado');

    //Indicando si estamos online o ofline
    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
});

socket.on('disconnect', () => {//'diconnect', avisa cuando el cliente se desconecta al servidor
    // console.log('Desconectado del servidor');
    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
});

socket.on('enviar-mensaje', (payload) => {
    
    // console.log(payload);
    
    mensajeViejo = (mensajeNuevo ? mensajeNuevo : null)
    
    mensajeNuevo = (payload.name ? payload.name : "anonymous") + ": " + payload.mensaje
    
    let conversacion = mensajeViejo ? mensajeViejo + "<br>" + mensajeNuevo : mensajeNuevo
 
    lblMensajes.innerHTML = conversacion
})

btnEnviar.addEventListener('click', () => {

    if (txtName.value) {

        if (txtMensaje.value) {
            const mensaje = txtMensaje.value;
            const name = txtName.value;

            const payload = {
                mensaje,
                name,
                fecha: new Date().getTime()
            }

            //Limpiando input
            txtMensaje.value = "";

            //El tercer argumento (el callback), es la retroalimentacion que recibimos del servidor cuando emitimos un mensaje, el servidor nos puede enviar data al emitir mensajes, en este caso el server envia un id
            socket.emit('enviar-mensaje', payload, ( respuesta ) => {
                mensajeViejo = (mensajeNuevo ? mensajeNuevo : "")
            
                mensajeNuevo = (payload.name ? payload.name : "anonymous") + ": " + payload.mensaje
                
            
            
                lblMensajes.innerHTML = mensajeViejo + "<br>" + mensajeNuevo
            });    
            lblError.innerHTML = ""
        } else {
            lblError.innerHTML = "Please enter a message"
        }

    }else{
        lblError.innerHTML = "Please enter your name"
    }

    

})


