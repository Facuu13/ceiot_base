class ViewMainPage {
    showDevices(list:DeviceInt[],element:Main):void {
      let e:HTMLElement = document.getElementById("devicesList");
      e.innerHTML="";
      for (let device of list) {
          const fechaHora = new Date(device.timestamp);
          const formatearFecha = this.formatDateTime(fechaHora);
          let image = "temp.png";
          e.innerHTML += `<li class="collection-item avatar">
            <img src="images/${image}" alt="" class="circle">
            <span class="title">${device.name}</span>
            <p>id: ${device.device_id}</p>
            <p>key: ${device.key}</p>
            <p>temperature: ${device.temperature}°C</p>
            <p>timestamp: ${formatearFecha}</p>
          </li>  
          `;
      }
    }

    formatDateTime(dateTime: Date): string {
      // Obtener el día con dos digitos
      const dia = dateTime.getDate().toString().padStart(2, '0');
      // Obtener el mes (sumar 1 ya que los meses van de 0 a 11) con dos digitos
      const mes = (dateTime.getMonth() + 1).toString().padStart(2, '0');
      // Obtener el año
      const anio = dateTime.getFullYear();
      // Obtener la hora con dos digitos
      const hora = dateTime.getHours().toString().padStart(2, '0');
      // Obtener los minutos con dos digitos
      const minutos = dateTime.getMinutes().toString().padStart(2, '0');
      // Obtener los segundos con dos digitos
      const segundos = dateTime.getSeconds().toString().padStart(2, '0');
      return `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
    }
}