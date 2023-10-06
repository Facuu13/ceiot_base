interface GETResponseListener {
  handleGETResponse(status:number, response:string): void;
}

class API{

  requestGET(url:string, listener: GETResponseListener):void {
    // Se crea una instancia del objeto XMLHttpRequest, que se utiliza para hacer solicitudes HTTP.
    let xhr:XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.status == 200) {
          listener.handleGETResponse(xhr.status,xhr.responseText);
        } else {
          listener.handleGETResponse(xhr.status,null);
        }
      }
    };
    // Se abre la solicitud GET especificando la URL y configurando la solicitud como asíncrona (true).
    xhr.open('GET', url, true);
    // Se envía la solicitud GET al servidor. En este caso, no se envían datos adicionales en el cuerpo de la solicitud, por lo que se pasa null.
    xhr.send(null);
  }

  requestDELETE(url: string, listener: GETResponseListener): void {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 204) {
          // 204 No Content indica que la eliminación se realizó con éxito
          listener.handleGETResponse(xhr.status, null);
        } else {
          listener.handleGETResponse(xhr.status, null);
        }
      }
    };
    xhr.open('DELETE', url, true);
    xhr.send(null);
  }
  
  requestPOST(url: string, data: any, listener: GETResponseListener): void {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 201) {
          // 201 Created indica que la creación se realizó con éxito
          listener.handleGETResponse(xhr.status, xhr.responseText);
        } else {
          listener.handleGETResponse(xhr.status, null);
        }
      }
    };
    xhr.open('POST', url, true);
    // Establece el tipo de contenido 
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
    //Los datos se codifican en pares clave-valor, donde cada par se separa por el carácter "&"
    //id=123&name=John&age=30

    // Se crea una cadena bodyData que contiene los datos que se enviarán en el cuerpo de la solicitud.
    const bodyData = `id=${data.device_id}&n=${data.name}&k=${data.key}&t=${data.temperature}`;
    // Se envía la solicitud POST al servidor con los datos en el cuerpo de la solicitud.
    xhr.send(bodyData);
  }

  requestPUT(url: string, data: any, listener: GETResponseListener): void {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 201) {
          // 201 Created indica que la modificacion se realizó con éxito
          listener.handleGETResponse(xhr.status, xhr.responseText);
        } else {
          listener.handleGETResponse(xhr.status, null);
        }
      }
    };
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
    const bodyData = `id=${data.device_id}&name=${data.name}&key=${data.key}&temp=${data.temperature}`;
     // Se envía la solicitud PUT al servidor con los datos en el cuerpo de la solicitud.
    xhr.send(bodyData);
  }

}
