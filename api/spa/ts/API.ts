interface GETResponseListener {
  handleGETResponse(status:number, response:string): void;
}

class API{

  requestGET(url:string, listener: GETResponseListener):void {
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
    xhr.open('GET', url, true);
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
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Establece el tipo de contenido
    const bodyData = `id=${data.device_id}&n=${data.name}&k=${data.key}&t=${data.temperature}`;
    xhr.send(bodyData);
  }

  requestPUT(url: string, data: any, listener: GETResponseListener): void {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 201) {
          listener.handleGETResponse(xhr.status, xhr.responseText);
        } else {
          listener.handleGETResponse(xhr.status, null);
        }
      }
    };
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Establece el tipo de contenido a JSON
    const bodyData = `id=${data.device_id}&name=${data.name}&key=${data.key}&temp=${data.temperature}`;
    xhr.send(bodyData);
  }

}
