class ViewMainPage {
  showDevices(list: DeviceInt[], element: Main): void {
    let e: HTMLElement = document.getElementById("devicesList");
    e.innerHTML = "";
    for (let device of list) {
      const fechaHora = new Date(device.timestamp);
      const formatearFecha = this.formatDateTime(fechaHora);
      let image = "temp.png";
       // Crear un div para cada dispositivo
      const deviceDiv = document.createElement("div");
      deviceDiv.id = device.device_id; // el div que creamos le asignamos un id
      deviceDiv.innerHTML += `<li class="collection-item avatar"> 
            <img src="images/${image}" alt="" class="circle">
            <span class="title">${device.name}</span>
            <p>id: ${device.device_id}</p>
            <p>key: ${device.key}</p>
            <p>temperature: ${device.temperature}°C</p>
            <p>timestamp: ${formatearFecha}</p>
          </li>
          `; //este li va estar dentro del div

      this.CrearBotones(e,deviceDiv, device)
      // Crear un botón Editar dentro del div para cada dispositivo
      
    }
  }

  EliminarDevice(id: string) {
    const miDiv = document.getElementById(id); //va a buscar el elemento por id
    miDiv.style.display = "none"; // ocultar el div por id
  }

  EditarDevice(device) {
    const miDiv = document.getElementById(device.device_id); //va a buscar el elemento por id
  }

  CrearBotones(e,deviceDiv, device){
    // Creamos el boton para editar
    const buttonEditar = document.createElement("button"); 
    buttonEditar.textContent = "Editar";
    buttonEditar.style.transform = "translate(1500%,-300%)";
    

    buttonEditar.onclick = () => { //cuando hacemos clic llama a la funcion
      this.EditarDevice(device);
    };

    // Creamos el boton para eliminar
    const buttonEliminar = document.createElement("button");
    buttonEliminar.textContent = "Eliminar";
    buttonEliminar.style.transform = "translate(1180%,-300%)";

    // Asignar una función onclick al botón que utiliza el objeto device como parámetro
    buttonEliminar.onclick = () => {
      this.EliminarDevice(device.device_id);
    };

    deviceDiv.appendChild(buttonEditar); //agrega el boton Editar al final del div
    deviceDiv.appendChild(buttonEliminar);//agrega el boton Eliminar al final del div
    

    // Agregar el div del dispositivo al contenedor
    e.appendChild(deviceDiv); //en este caso seria al ul
  }

  formatDateTime(dateTime: Date): string {
    // Obtener el día con dos digitos
    const dia = dateTime.getDate().toString().padStart(2, "0");
    // Obtener el mes (sumar 1 ya que los meses van de 0 a 11) con dos digitos
    const mes = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    // Obtener el año
    const anio = dateTime.getFullYear();
    // Obtener la hora con dos digitos
    const hora = dateTime.getHours().toString().padStart(2, "0");
    // Obtener los minutos con dos digitos
    const minutos = dateTime.getMinutes().toString().padStart(2, "0");
    // Obtener los segundos con dos digitos
    const segundos = dateTime.getSeconds().toString().padStart(2, "0");
    return `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
  }
}
