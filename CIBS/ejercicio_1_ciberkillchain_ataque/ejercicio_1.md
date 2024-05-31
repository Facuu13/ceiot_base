# Ejercicio CiberKillChain - Ataque

* Alumno: Facundo Andrioli Villa
* Monitoreo y gestión remota de red de sensores Bluetooth en invernaderos:
La solución que se propone implica la implementacion de una red de sensores Bluetooth en invernaderos, junto con el desarrollo de una aplicacion web progresiva (PWA) para el monitoreo local y un servidor IoT para la gestión remota de datos. Estos sensores recopilaran informacion sobre el clima y otros parametros en tiempo real. La PWA permitirá a los usuarios acceder a estos datos y controlar los invernaderos desde cualquier lugar, mientras que el servidor IoT facilitara la gestion de datos y alarmas.
Link para mas detalles del trabajo: https://github.com/Facuu13/Plantilla-planificacion/blob/master/charter.pdf
* Los usuarios están expuestos a riesgos como el robo de datos, la manipulación de condiciones ambientales y la interrupción del servicio. Estas amenazas pueden causar daños a los cultivos, pérdidas económicas y comprometer la integridad operativa del sistema. 

## Enunciado

Armar una cyberkillchain usando técnicas de la matriz de Att&ck para un escenario relacionado al trabajo práctico de la carrera.

### ATAQUE: Sabotaje de las Condiciones del Invernadero

**Objetivo del ataque:**
Se busca manipular los datos recopilados por los sensores Bluetooth y/o controlar las funciones de los dispositivos en el invernadero para crear condiciones adversas que dañen los cultivos. Esto podría incluir alterar la temperatura, la humedad o la luz en el invernadero de manera que se perjudique la producción agrícola. Al dañar la producción del invernadero objetivo, los competidores pueden ganar económicamente al vender más de sus propios productos y aprovechar la oportunidad para aumentar los precios debido a la menor oferta en el mercado. 

#### 1. Reconocimiento:

- **T1595.002: Active Scanning (Vulnerability Scanning)** (https://attack.mitre.org/techniques/T1595/002/)
    - Para identificar dispositivos y servicios expuestos en la red.

- **T1590.001: Gather Victim Network Information: Domain Properties** (https://attack.mitre.org/techniques/T1590/001/)
    - Buscar información pública y realizar consultas DNS para identificar dominios relacionados con la PWA y el servidor IoT, obteniendo así información sobre la infraestructura.

- **T1592.001: Gather Victim Host Information: Hardware** (https://attack.mitre.org/techniques/T1592/001/)
    - Recopilar información sobre el hardware utilizado en la infraestructura (sensores Bluetooth) para buscar vulnerabilidades conocidas asociadas con estos dispositivos.

- **T1592.002: Gather Victim Host Information: Software**(https://attack.mitre.org/techniques/T1592/002/)
    - Obtener detalles sobre las versiones de software y aplicaciones utilizadas, permitiendo identificar vulnerabilidades específicas en la PWA y el servidor IoT.

#### 2. Armamento:

- **T1608.001: Stage Capabilities: Malware:** (https://attack.mitre.org/techniques/T1608/001/)
  - Desarrollar un malware que se infiltre en los sensores Bluetooth y capture datos sensibles o envíe comandos falsos al servidor IoT.

- **T1203: Exploitation for Client Execution:** (https://attack.mitre.org/techniques/T1203/)
  - Crear un exploit que se active cuando los operadores del invernadero accedan a la PWA, permitiendo al atacante tomar el control de sus dispositivos y la infraestructura IoT.

- **T1561.001: Disk Wipe: Disk Content Wipe:** (https://attack.mitre.org/techniques/T1561/001/)
  - Desarrollar una herramienta que pueda borrar datos críticos en el servidor IoT o los sensores Bluetooth, interrumpiendo las operaciones del invernadero.

- **T0871: Execution through API:** (https://attack.mitre.org/techniques/T0871/)
  - Escribir scripts que interactúen con las APIs de la PWA o el servidor IoT para enviar comandos maliciosos y manipular la operación del invernadero.

#### 3. Delivery:

- **T1566.001: Phishing: Spearphishing Attachment:** (https://attack.mitre.org/techniques/T1566/001/)
    - Enviar correos electrónicos para engañar a los operadores del invernadero y que descarguen archivos adjuntos maliciosos que contienen el malware.

- **T1204.002: User Execution: Malicious File:** (https://attack.mitre.org/techniques/T1204/002/)
    - Engañar a los usuarios para que ejecuten un archivo malicioso, como un documento o un archivo ejecutable. 

#### 4. Explotación:

- **T1201: Password Policy Discovery:** (https://attack.mitre.org/techniques/T1201/)
  - Obtener información sobre las políticas de contraseñas utilizadas en la PWA y el servidor IoT para identificar debilidades, como contraseñas débiles o expiradas.

- **T1110.001: Brute Force: Password Guessing:** (https://attack.mitre.org/techniques/T1110/001/)
  - Usar herramientas automatizadas para  adivinar las contraseñas de cuentas de usuario en la PWA o el servidor IoT.

- **T1212: Exploitation for Credential Access:** (https://attack.mitre.org/techniques/T1212/)
  - Explotar vulnerabilidades en el software de la PWA o el servidor IoT para obtener acceso a las credenciales almacenadas.


#### 5. Instalacion:

- **T1543.001: Create or Modify System Process: Launch Agent:** (https://attack.mitre.org/techniques/T1543/001/)
  - Crear un agente de inicio en el servidor IoT que garantice que el malware se ejecute de manera automatica cada vez que se inicie el sistema.

- **T1053.005: Scheduled Task/Job: Scheduled Task:** (https://attack.mitre.org/techniques/T1053/005/)
  - Programar una tarea para ejecutar el malware en el servidor IoT en momentos especificos.


#### 6. Comando y Control

- **T1102: Web Service:** (https://attack.mitre.org/techniques/T1102/)
  - Utilizar servicios web para comunicarse de forma encubierta con los sistemas comprometidos.

- **T1071.001: Application Layer Protocol: Web Protocols:** (https://attack.mitre.org/techniques/T1071/001/)
  - Utilizar protocolos web como HTTP/S para comunicarse con los sistemas comprometidos.


#### 7. Accion

- **T1490: Inhibit System Recovery:** (https://attack.mitre.org/techniques/T1490/)
  - Eliminar o corromper copias de seguridad del servidor IoT y la PWA para dificultar la restauración de los sistemas.

- **T1491: Defacement:**(https://attack.mitre.org/techniques/T1491/)
  - Modificar la interfaz de usuario de la PWA para mostrar información falsa sobre el estado del invernadero.

- **T1485: Data Destruction::** (https://attack.mitre.org/techniques/T1485/)
  - Borrar o corromper datos críticos en el servidor IoT, incluyendo configuraciones de sensores y registros, para interrumpir la operación del invernadero y causar pérdida de datos.

 - **T1565.001: Data Manipulation: Stored Data Manipulation** (https://attack.mitre.org/techniques/T1565/001/)
    - Modificar los datos recopilados por los sensores Bluetooth, para que los operadores del invernadero tomen decisiones basadas en información incorrecta, lo que podría dañar las cosechas o la operación del invernadero.