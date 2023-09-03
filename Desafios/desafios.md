# Desafíos y Tareas

A continuación se enumeran una serie de desafíos y tareas relacionadas con el proyecto:

## Primer grupo de desafios

### Desafío: fix_key
- **Descripción:** Corregir que el dispositivo no está enviando "key".
- **Dificultad:** Baja
- **Afecta:** Dispositivo/Tools

### Desafío: error
- **Descripción:** Agregar campo para reportar errores (por ejemplo si el sensor no está conectado).
- **Dificultad:** Baja
- **Afecta:** Dispositivo/Tools, API

### Desafío: timestamp
- **Descripción:** Agregar timestamp a los datos.
- **Dificultad:** Baja
- **Afecta:** Evaluar

### Desafío: debug_api
- **Descripción:** Agregar mensajes en consola API para mejor seguimiento.
- **Dificultad:** Baja
- **Afecta:** API

### Desafío: debug_device
- **Descripción:** Agregar mensajes en el monitor del dispositivo para mejor seguimiento.
- **Dificultad:** Baja
- **Afecta:** Dispositivo

### Desafío: pressure
- **Descripción:** Agregar campo de pressure para bmp.
- **Dificultad:** Baja
- **Afecta:** Dispositivo/Tools,API,DB

### Desafío: auth
- **Descripción:** Usar "key" como autenticación del POST measurement.
- **Dificultad:** Media
- **Afecta:** API/Tools

### Desafío: validate_msg
- **Descripción:** Validar el mensaje.
- **Dificultad:** Engañosa
- **Afecta:** API

### Desafío: validate_post_device
- **Descripción:** Validar el mensaje.
- **Dificultad:** Engañosa
- **Afecta:**  API

### Desafío: validate_post_measurements
- **Descripción:** Validar el mensaje.
- **Dificultad:** Engañosa
- **Afecta:** API

---

## Segundo grupo de desafios

### Desafío: temp_internet
- **Descripción:** Agregar dispositivos virtuales que tomen la temperatura de la zona vía internet.
- **Dificultad:** Media
- **Afecta:** Tools

### Desafío: temp_internal
- **Descripción:** Agregar dispositivos virtuales que tomen la temperatura interna en PC o RPI (no realizable en VM).
- **Dificultad:** Media
- **Afecta:** Tools

---

## Terver grupo de desafios

### Desafío: to_json
- **Descripción:** Convertir el mensaje del ESP32 a JSON.
- **Dificultad:** Media
- **Afecta:** 

### Desafío: fix_urls
- **Descripción:** Normalizar las URL, API y web (¿qué pasa si el dispositivo ya está desplegado?).
- **Dificultad:** Media
- **Afecta:** DIspositivo/Tools, API, Frontend

### Desafío: api_version
- **Descripción:** Agregar versionamiento de API (lidiar con dispositivos ya desplegados).
- **Dificultad:** Media
- **Afecta:** DIspositivo/Tools, API, DB

### Desafío: persistence_real
- **Descripción:** Reemplazar las bases de datos PostgreSQL en memoria por bases de datos reales.
- **Dificultad:** ALTA
- **Afecta:** API

### Desafío: persistence_hack
- **Descripción:** Terminar de implementar la funcionalidad de persistencia de las bases de datos a archivos.
- **Dificultad:** Alta
- **Afecta:** API

### Desafío: new_board
- **Descripción:** Usar cualquier otro board disponible.
- **Dificultad:** Alta
- **Afecta:** Dispositivo

---

## Cuarto grupo de desafios

### Desafío: device_id_mac
- **Descripción:** Device_ID: que use su mac address.
- **Dificultad:** Media
- **Afecta:** Dispositivo, Tools

### Desafío: device_id_gpio
- **Descripción:** Device_ID: que lo tome de GPIO.
- **Dificultad:** Media
- **Afecta:** Dispositivo

---

## Quinto grupo de desafios

### Desafío: device_delete_api
- **Descripción:** Implementar Baja de dispositivos.
- **Dificultad:** Baja
- **Afecta:** API, DB, Tools

### Desafío: device_update_api
- **Descripción:** Implementar Modificación de dispositivos.
- **Dificultad:** Media
- **Afecta:** API, DB, Tools

### Desafío: device_crud_web
- **Descripción:** Implementar el ABM de dispositivos vía WEB.
- **Dificultad:** Alta
- **Afecta:** Frontend

### Desafío: device_crud_spa
- **Descripción:** Implementar el ABM de dispositivos vía SPA.
- **Dificultad:** Alta
- **Afecta:** SPA

### Desafío: auto_register
- **Descripción:** El dispositivo hace post device con su id, que puede ser la hardcodeada o su MAC address.
- **Dificultad:** Media
- **Afecta:** Dispositivo/Tools

### Desafío: smart_auto_register
- **Descripción:** Igual que auto_register pero sin generar duplicados.
- **Dificultad:** Alta
- **Afecta:** Evaluar

---

## Sexto grupo de desafios

### Desafío: multi_sensor
- **Descripción:** Usar varios sensores por dispositivo y reflejarlo en la estructura de datos.
- **Dificultad:** Alta
- **Afecta:** Dispositivo/Tools, API, Frontend, DB

### Desafío: multi_sampling
- **Descripción:** Enviar varias lecturas separadas en el tiempo en un solo mensaje.
- **Dificultad:** Alta
- **Afecta:** Dispositivo/Tools, API, DB

### Desafío: multi_sensor_sampling
- **Descripción:** Combinar multi_sensor con multi_sampling.
- **Dificultad:** Casi Doble Alta
- **Afecta:** Dispositivo/Tools, API, DB

---

## Septimo grupo de desafios

### Desafío: api_port
- **Descripción:** Reimplementar con otro framework o lenguaje.
- **Dificultad:** Muy Alta
- **Afecta:** API

### Desafío: spa_port
- **Descripción:** Reimplementar con otro engine o lenguaje.
- **Dificultad:** Muy Alta
- **Afecta:** SPA

### Desafío: db_port
- **Descripción:** Reimplementar con otro engine.
- **Dificultad:** Muy Alta
- **Afecta:** SPA
