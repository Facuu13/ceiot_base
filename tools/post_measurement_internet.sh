#!/bin/bash

# Verificamos si se ingreso una ID como argumento
if [ $# -ne 1 ]; then
    echo "Uso: $0 <id>"
    echo "Este script acepta un solo argumento, que es la ID."
    exit 1
fi

# Tu clave de API de OpenWeatherMap
API_KEY="2287fb577d35a990fdbaa47ff609c6f4"

# Lista de ciudades para elegir aleatoriamente
ciudades=("Buenos+Aires" "Cordoba" "Rosario" "Mendoza" "La+Plata" "Mar+del+Plata" "Salta" "San+Juan" "San+Luis" "San+Miguel+de+Tucuman")

# Elegir una ciudad aleatoria de la lista
ciudad_aleatoria=${ciudades[$RANDOM % ${#ciudades[@]}]} # Me va a generar un numero aleatorio entre 0 y la cantidad de ciudades

# Realiza una solicitud GET de prueba a la API de OpenWeatherMap con la ciudad aleatoria
response=$(curl -s "http://api.openweathermap.org/data/2.5/forecast?q=$ciudad_aleatoria&appid=$API_KEY") # -s para no mostrar informacion adicional
# En response se almacena la respuesta de la solicitud

# Verifica si la solicitud fue exitosa (código de estado HTTP 200)
if [ $? -eq 0 ]; then
    # Si el código de salida es 0, significa que la solicitud fue exitosa
    # Extraemos la temperatura de la respuesta
    temperatura_celsius=$(echo "$response" | jq -r '.list[0].main.temp')
    # jq es una herramienta diseñada para procesar y extraer datos de documentos JSON.
    # La opción -r se usa para obtener el valor de manera "cruda", lo que significa que elimina 
    # cualquier formato adicional alrededor del valor que se extrae del documento JSON

    # Extraemos la humedad de la respuesta
    humedad=$(echo "$response" | jq -r '.list[0].main.humidity')
    
    
    # Convertir la temperatura a Celsius
    temperatura_celsius=$(echo "scale=2; $temperatura_celsius - 273.15" | bc)
    #scale se usa para que el resultado tenga en este caso 2 decimales.
    # bc se utiliza en esta línea para calcular la expresión matemática, 
    # asegurando que el resultado tenga una precisión de 2 decimales

    # Mostramos el clima actual en la ciudad que salio
    echo "El clima actual en $ciudad_aleatoria: temp:$temperatura_celsius°C y hum:$humedad%" 

    # Realizar una solicitud POST con el valor de temperatura
    wget -O - --method=POST http://localhost:8080/measurement --body-data="id=$1&t=$temperatura_celsius&h=$humedad"
    
else
    echo "Error al realizar la solicitud a la API de OpenWeatherMap."
fi
