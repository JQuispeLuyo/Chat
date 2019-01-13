var searchParams = new URLSearchParams(window.location.search);
var divUsuarios = $("#divUsuarios");
var divChatbox = $('#divChatbox');
var forEnviar = $('#forEnviar');
var txtMensaje = $('#txtMensaje');

//funcion para renderizar las personas conectadas
function renderPersonas(personas) {

    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + searchParams.get('room') + '</span></a>';
    html += '</li>';



    for (var i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '    <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> ' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);
}

//Funcion para renderizar los mensajes
function renderMensajes(mensaje, yo) {;

    console.log(mensaje, yo);

    var html = '';

    if (yo) {

        html += '<li>';
        html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.usuario + '</h5>';
        html += '        <div class="box bg-light-info">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + getHora(mensaje.fecha) + '</div>';
        html += '</li>';

    } else {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.usuario + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + getHora(mensaje.fecha) + '</div>';
        html += '</li>';
    }
    divChatbox.append(html);

}

//Funcion para renderizar cuando un usuario se conecta o desconecta

function renderConexion(mensaje, conectado) {

    console.log('conecionasdasd', mensaje, conectado);
    var html = '';

    if (conectado) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.usuario + '</h5>';
        html += '        <div class="box bg-light-success">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + getHora(mensaje.fecha) + '</div>';
        html += '</li>';
    } else {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.usuario + '</h5>';
        html += '        <div class="box bg-light-danger">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + getHora(mensaje.fecha) + '</div>';
        html += '</li>';
    }

    divChatbox.append(html);

}


//Obtener la hora

function getHora(fecha) {
    var fecha = new Date(fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    return hora;
}


//funcion para bajar el scroll
function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}



//Listener
divUsuarios.on('click', 'a', function() {

    var id = $(this).data('id');
    if (id) console.log(id);

});

forEnviar.on('submit', function(e) {

    e.preventDefault();

    var mensaje = txtMensaje.val()

    if (mensaje.trim().length === 0) {
        return;
    }

    socket.emit('mandarMensaje', {
        mensaje: mensaje
    }, function(mensaje) {
        console.log(mensaje);
        renderMensajes(mensaje, true)
        scrollBottom()
    })
    txtMensaje.focus();
    txtMensaje.val('');
});