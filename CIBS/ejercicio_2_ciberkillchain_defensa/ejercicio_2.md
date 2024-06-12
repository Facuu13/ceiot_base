### Ejercicio CiberKillChain - Defensa

**Alumno:** Facundo Andrioli Villa

## Enunciado

Desarrollar la defensa en función del ataque planteado en orden inverso. No es una respuesta a un incidente, hay que detectar el ataque independientemente de la etapa.

Para cada etapa, elegir una sola defensa, la más importante, considerando recursos limitados.

### Defensas para cada etapa de la Cyber Kill Chain

### Objetivo de la Defensa
Proteger la integridad y disponibilidad de los datos de los sensores Bluetooth y asegurar el control seguro de los dispositivos en el invernadero, evitando la manipulación de parámetros críticos (como temperatura, humedad y luz) y garantizando condiciones óptimas para la producción agrícola. Esto incluye prevenir interrupciones en el servicio y proteger los intereses económicos y operativos del invernadero, manteniendo la estabilidad del mercado agrícola.

#### 1. Acción

**T1565.001: Data Manipulation: Stored Data Manipulation**  

**Defensa:** **Data Backup**  https://attack.mitre.org/mitigations/M1053/

**Descripción:** Hacer copias de seguridad de los datos importantes con regularidad y guardarlas en lugares seguros. Si alguien intenta manipular los datos, podemos restaurar los datos a su forma original usando estas copias.

#### 2. Comando y Control

**T1102: Web Service**

**Defensa:** **Network Intrusion Prevention**  https://attack.mitre.org/mitigations/M1031/

**Descripción:** Configurar sistemas para detectar y bloquear intentos de comunicación con servidores de control remoto maliciosos. Observar el tráfico de internet para detectar actividades extrañas.

#### 3. Instalación

**T1053.005: Scheduled Task/Job: Scheduled Task**  

**Defensa:** **Audit**  https://attack.mitre.org/mitigations/M1047/

**Descripción:** Revisar los registros de actividad regularmente para encontrar si alguien ha creado tareas automáticas sin permiso. Si detectamos algo extraño, alertaremos a los administradores.

**Utilización de credenciales obtenidas para acceder al sistema de gestión del invernadero:** 

**Defensa: Autenticación Multifactor (MFA)**  https://attack.mitre.org/mitigations/M1032/

**Descripción:** Requerir que los usuarios ingresen un segundo factor de autenticación, además de su contraseña, para acceder al sistema de gestión del invernadero. Esto hace que sea más difícil para los atacantes utilizar credenciales robadas.

#### 4. Explotación:

**T1204.002: User Execution: Malicious File**  

**Defensa:** **Execution Prevention** (https://attack.mitre.org/mitigations/M1038)

**Descripción:** Bloquear la ejecución de código en el sistema mediante el control de aplicaciones y/o el bloqueo de scripts. Esto puede prevenir la ejecución de archivos maliciosos no autorizados.

#### 5. Delivery

**T1566.001: Phishing: Spearphishing Attachment**  

**Defensa:** **Restrict Web-Based Content**  https://attack.mitre.org/mitigations/M1021

**Descripción:** Bloquear la descarga de archivos adjuntos desconocidos (como .scr, .exe) y restringir el acceso a ciertos sitios web, así como el uso de Javascript y extensiones del navegador.

#### 6. Armamento:

**T1583: Acquire Infrastructure:**  

**Defensa:** **User Training**  https://attack.mitre.org/mitigations/M1017/

**Descripción:** Capacitar a los usuarios para que reconozcan páginas web falsas que intentan robar credenciales. Enseñarles a verificar cuidadosamente las URLs y a evitar hacer clic en enlaces sospechosos.

#### 7. Reconocimiento:

**T1595.002: Active Scanning (Vulnerability Scanning)**

**Defensa:** **Filter Network Traffic**  https://attack.mitre.org/mitigations/M1037/

**Descripción:** Usar firewalls y sistemas de prevención de intrusiones para bloquear el tráfico no autorizado y escaneos de vulnerabilidades. Esto ayuda a proteger la red del invernadero de ser explorada por atacantes.


