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
Se busca manipular los datos recopilados por los sensores Bluetooth y/o controlar las funciones de los dispositivos en el invernadero para crear condiciones adversas que dañen los cultivos. Esto podría incluir alterar la temperatura, la humedad o la luz en el invernadero de manera que se perjudique la producción agrícola.

1. Reconocimiento:
* **Objetivo:** Recopilar información sobre la red de sensores Bluetooth, la PWA y el servidor IoT.

- **T1595.002: Active Scanning (Vulnerability Scanning)** (https://attack.mitre.org/techniques/T1595/002/)
    - Para identificar dispositivos y servicios expuestos en la red.

- **T1590.001: Gather Victim Network Information: Domain Properties** (https://attack.mitre.org/techniques/T1590/001/)
    - Buscar información pública y realizar consultas DNS para identificar dominios relacionados con la PWA y el servidor IoT, obteniendo así información sobre la infraestructura.

- **T1592.001: Gather Victim Host Information: Hardware** (https://attack.mitre.org/techniques/T1592/001/)
    - Recopilar información sobre el hardware utilizado en la infraestructura (sensores Bluetooth) para buscar vulnerabilidades conocidas asociadas con estos dispositivos.

- **T1592.002: Gather Victim Host Information: Software**(https://attack.mitre.org/techniques/T1592/002/)
    - Obtener detalles sobre las versiones de software y aplicaciones utilizadas, permitiendo identificar vulnerabilidades específicas en la PWA y el servidor IoT.

2. Armamento:
* **Objetivo:** Crear herramientas o malware específico para explotar las vulnerabilidades descubiertas en la red de sensores Bluetooth, la PWA y el servidor IoT.

- **Stage Capabilities: Malware (T1608.001):** (https://attack.mitre.org/techniques/T1608/001/)
  - Desarrollar un malware que se infiltre en los sensores Bluetooth y capture datos sensibles o envíe comandos falsos al servidor IoT.

- **Exploitation for Client Execution (T1203):** (https://attack.mitre.org/techniques/T1203/)
  - Crear un exploit que se active cuando los operadores del invernadero accedan a la PWA, permitiendo al atacante tomar el control de sus dispositivos y la infraestructura IoT.

- **Disk Wipe: Disk Content Wipe:** (https://attack.mitre.org/techniques/T1561/001/)
  - Desarrollar una herramienta que pueda borrar datos críticos en el servidor IoT o los sensores Bluetooth, interrumpiendo las operaciones del invernadero.

- **Execution through API:** (https://attack.mitre.org/techniques/T0871/)
  - Escribir scripts que interactúen con las APIs de la PWA o el servidor IoT para enviar comandos maliciosos y manipular la operación del invernadero.

