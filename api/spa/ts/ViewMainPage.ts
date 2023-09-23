class ViewMainPage {
    showDevices(list:DeviceInt[],element:Main):void {


      let e:HTMLElement = document.getElementById("devicesList");
      e.innerHTML="";
      for (let device of list) {
          const fechaHora = new Date(device.timestamp);
          const dia = fechaHora.getDate();
          const mes = fechaHora.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1
          const anio = fechaHora.getFullYear();
          const hora = fechaHora.getHours();
          const minutos = fechaHora.getMinutes();
          const segundos = fechaHora.getSeconds();
          // Formatear hora, minutos y segundos con dos dígitos
          const horaFormateada = hora.toString().padStart(2, '0');
          const minutosFormateados = minutos.toString().padStart(2, '0');
          const segundosFormateados = segundos.toString().padStart(2, '0');

          const formatearFecha = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio} ${horaFormateada}:${minutosFormateados}:${segundosFormateados}`;

          let image = "temp.png";
          e.innerHTML += `<li class="collection-item avatar">
            <img src="images/${image}" alt="" class="circle">
            <span class="title">${device.name}</span>
            <p>id: ${device.device_id}</p>
            <p>key: ${device.key}</p>
            <p>timestamp: ${formatearFecha}</p>
          </li>  
          `;
      }
    }
}




 



  