// Obtener referencias a los elementos relevantes del DOM
const serverList = document.querySelector('.server-list');
const roomList = document.querySelector('.room-list');

// Agregar un event listener a la lista de servidores
serverList.addEventListener('click', function(event) {
  // Verificar si se hizo clic en un elemento de la lista de servidores
  if (event.target.tagName === 'LI') {
    // obtengo el srv seleccionado
    const selectedServer = event.target.textContent;
    
    // aca deberia llamar a la base en busca de los servidores en la bd
    const channels = getChannels(selectedServer);
    
    // limpia la lsita de salas (pt..o salas que no enseña nada)
    roomList.innerHTML = '';
    
    // agrego los canales a la lista de salas
    channels.forEach(function(channel) {
      const li = document.createElement('li');
      li.textContent = channel;
      roomList.appendChild(li);
    });
    
    // marco un srv como activo (borro el tag anterior y sobreescribo uno nuevo)
    const activeServer = serverList.querySelector('.active');
    if (activeServer) {
      activeServer.classList.remove('active');
    }
    event.target.classList.add('active');
  }
});

// funcion que llama a la lista de servidores(por ahora devuelve algo sin bd)
function getChannels(server) {
  // esto deberia obtener en un json
  const channelMap = {
    'srv1': ['General', 'Noticias', 'Eventos'],
    'srv2': ['Discusión', 'Proyectos', 'Soporte'],
    'srv3': ['Ofertas', 'Ventas', 'Compras'],
    'srv4': ['Juegos', 'Música', 'Deportes']
  };
  
  // Verificar si el servidor tiene canales definidos en el mapa
  if (server in channelMap) {
    return channelMap[server];
  } else {
    return [];
  }
}