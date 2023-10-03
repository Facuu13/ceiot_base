class ViewMainPage {

  private main: Main; // Agrega una propiedad para almacenar la referencia a Main

  constructor(main: Main) {
    this.main = main;
  }

  showDevices(list: DeviceInt[], element: Main): void {
    let e: HTMLElement = document.getElementById("devicesList");
    e.innerHTML = "";
    if (list === null || list === undefined) {
      // Manejo de caso donde list es null o undefined
      return;
    }
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
    // Mostrar un mensaje de confirmación
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este dispositivo?");
    
    if (confirmDelete) {
      // El usuario confirmó la eliminación, continuar con la eliminación
      const miDiv = document.getElementById(id);
      if (miDiv) {
        // Hacer la solicitud de eliminación solo si el usuario confirmó
        this.main.api.requestDELETE(`/device/${id}`, this.main);
        this.main.api.requestGET("device", this.main); // Refresh
      }
    } else {
      // El usuario canceló la eliminación, no hacer nada
    }
  }

  EditarDevice(device) {
    // Mostrar un mensaje de confirmación
    const confirmUpdate = window.confirm("¿Estás seguro de editar este dispositivo?");
    if (confirmUpdate) {
      const miDiv = document.getElementById(device.device_id);
      if (miDiv) {
        device.key = this.generarRandomKey();
        // Actualizar los datos en el servidor utilizando la API de Main con un PUT request
        this.main.api.requestPUT(`/device/${device.device_id}`, device, this.main);
        this.main.api.requestGET("device",this.main); //refresh
      }
    } else {
      // El usuario canceló el update, no hacer nada
    }
  }

  CrearBotones(e,deviceDiv, device){
    // Creamos el boton para editar
    const buttonEditar = document.createElement("button"); 
    buttonEditar.textContent = "Editar";
    buttonEditar.style.transform = "translate(1500%,-300%)";
    
    //cuando hacemos clic llama a la funcion
    buttonEditar.onclick = () => { 
      this.EditarDevice(device);
    };

    // Creamos el boton para eliminar
    const buttonEliminar = document.createElement("button");
    buttonEliminar.textContent = "Eliminar";
    buttonEliminar.style.transform = "translate(1180%,-300%)";

    //cuando hacemos clic llama a la funcion
    buttonEliminar.onclick = () => {
      this.EliminarDevice(device.device_id);
    };

    deviceDiv.appendChild(buttonEditar); //agrega el boton Editar al final del div
    deviceDiv.appendChild(buttonEliminar);//agrega el boton Eliminar al final del div
    

    // Agregar el div del dispositivo al contenedor
    e.appendChild(deviceDiv); //en este caso seria al ul
  }

  agregarNuevoDevice(){
    alert('Se van a ingresar los siguientes datos para un nuevo dispositivo:\n\n- ID*\n- Name*\n- Key*\n- Temperature(opcional, valor por defecto 0)\n\n * Campos Obligatorios');
    const newDevice = {
      device_id: '',
      name: '',
      key: '',
      temperature: 0,
      timestamp: '',
    };
    newDevice.device_id = prompt('Ingrese el ID del nuevo dispositivo:');
    newDevice.name = prompt('Ingrese el nombre del nuevo dispositivo:');
    newDevice.key = prompt('Ingrese la clave del nuevo dispositivo:');
    //Puede no ingresar el valor de temperatura, sino lo hace se asigna un valor por defecto.
    const temperaturaInput = prompt('Ingrese la temperatura del nuevo dispositivo (opcional):');
    if (temperaturaInput !== null && temperaturaInput.trim() !== '') {
      newDevice.temperature = parseInt(temperaturaInput);
    }
    newDevice.timestamp = new Date().toString();
  // Comprobar si el usuario canceló el ingreso de datos
    if (newDevice.device_id === null || newDevice.name === null || newDevice.key === null) {
      alert('Ingreso de datos cancelado. No se creará un nuevo dispositivo.');
      return null;
    } 
    return newDevice;
  }

  crearEstructuraNewDevice(newDevice){
    let e: HTMLElement = document.getElementById("devicesList");
    const fechaHora = new Date(newDevice.timestamp);
    const formatearFecha = this.formatDateTime(fechaHora);
    let image = "temp.png";
       // Crear un div para cada dispositivo
      const deviceDiv = document.createElement("div");
      deviceDiv.id = newDevice.device_id; // el div que creamos le asignamos un id
      deviceDiv.innerHTML += `<li class="collection-item avatar"> 
            <img src="images/${image}" alt="" class="circle">
            <span class="title">${newDevice.name}</span>
            <p>id: ${newDevice.device_id}</p>
            <p>key: ${newDevice.key}</p>
            <p>temperature: ${newDevice.temperature}°C</p>
            <p>timestamp: ${formatearFecha}</p>
          </li>
          `; //este li va estar dentro del div

      this.CrearBotones(e,deviceDiv, newDevice);
      // Crear un botón Editar dentro del div para cada dispositivo
      

  }

  generarRandomKey(){
    const min = 100000; // El número mínimo de 6 dígitos
    const max = 999999; // El número máximo de 6 dígitos
    const keyAleatorioa = Math.floor(Math.random() * (max - min + 1)) + min;
    return keyAleatorioa.toString();
  }

  generarRandomId(){
    const min = 10; // El valor mínimo (inclusive)
    const max = 90; // El valor máximo (inclusive)
    const rango = max - min + 1;
    const idAleatorio = Math.floor(Math.random() * rango) + min;
    return idAleatorio.toString();
  }

  generarRandomTemperatura() {
    const min = -30; // El valor mínimo
    const max = 45; // El valor máximo
    const temperaturaAleatoria = Math.floor(Math.random() * (max - min + 1)) + min;
    return temperaturaAleatoria;
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
