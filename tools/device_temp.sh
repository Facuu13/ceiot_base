#!/bin/bash

# Tu clave de API de OpenWeatherMap
API_KEY="2287fb577d35a990fdbaa47ff609c6f4"

# Realiza una solicitud GET de prueba a la API de OpenWeatherMap (ejemplo de ciudad: Nueva York)
response=$(curl -s "http://api.openweathermap.org/data/2.5/forecast?q=New+York&appid=$API_KEY")

# Verifica si la solicitud fue exitosa (código de estado HTTP 200)
if [ $? -eq 0 ]; then
    # Usa jq para extraer la temperatura actual (en Kelvin) del primer elemento en la lista 'list'
    temperatura_kelvin=$(echo "$response" | jq -r '.list[0].main.temp')

    # Convierte la temperatura a grados Celsius
    temperatura_celsius=$(echo "$temperatura_kelvin - 273.15" | bc)

    echo "Temperatura actual en Nueva York: ${temperatura_celsius}°C"
else
    echo "Error al realizar la solicitud a la API de OpenWeatherMap."
fi

