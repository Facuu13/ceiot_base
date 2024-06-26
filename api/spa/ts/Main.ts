interface DeviceInt {
  device_id:string;
  name: string;
  key:string;
  temperature: number;
  timestamp: string;
}

class Main implements EventListenerObject, GETResponseListener {

  api = new API();
  view = new ViewMainPage(this);// le paso "this" como argumento.
  // lo que permite que ViewMainPage acceda a las propiedades y métodos de Main
  devices:DeviceInt[];
  

  constructor(){
  }

  handleGETResponse(status:number, response:string):void {
    this.devices= JSON.parse(response);
    this.view.showDevices(this.devices,this);
  }

  main():void {
      this.api.requestGET("device",this);
      document.getElementById("boton").addEventListener("click",this);
      document.getElementById("BotonNewD").addEventListener("click",this);
  }

  handleEvent(evt:Event):void{
	  
    let target = <HTMLElement>evt.target;
    let type   = evt.type;
            
    if (target.id=="boton") {
      this.api.requestGET("device",this);
      console.log("handling boton");
    }

    if (target.id=="BotonNewD") {
      const nuevoDispositivo = this.view.agregarNuevoDevice();
      this.api.requestPOST('/device', nuevoDispositivo, this);
      this.api.requestGET("device",this); //refresh
    }
  }
}

window.onload = function(){
    let main:Main = new Main();
    main.main()
};
