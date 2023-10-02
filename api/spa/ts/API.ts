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
  
}
