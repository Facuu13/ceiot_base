#!/bin/bash

# Función para obtener la temperatura y la humedad desde la API de OpenWeatherMap
function get_clima_data {
    local ciudad_aleatoria="$1"
    local API_KEY="2287fb577d35a990fdbaa47ff609c6f4"

    # Realizamos una solicitud GET a la API de OpenWeatherMap con la ciudad aleatoria y la clave API
    local response=$(curl -s "http://api.openweathermap.org/data/2.5/forecast?q=$ciudad_aleatoria&appid=$API_KEY")
    # En response se almacena la respuesta de la solicitud

    # Verifica si la solicitud fue exitosa
    if [ $? -eq 0 ]; then
        # Extraemos la temperatura de la respuesta JSO
        local temperatura_celsius=$(echo "$response" | jq -r '.list[0].main.temp')
        # Extraemos la humedad de la respuesta JSON
        local humedad=$(echo "$response" | jq -r '.list[0].main.humidity')
        # jq es una herramienta diseñada para procesar y extraer datos de documentos JSON.
        # La opción -r se usa para obtener el valor de manera "cruda", lo que significa que elimina 
        # cualquier formato adicional alrededor del valor que se extrae del documento JSON
        
        # Verificamos si la temperatura y la humedad tienen un valor asignado y no estan vacios
        if [ -n "$temperatura_celsius" ] && [ -n "$humedad" ]; then
            # Convertimos la temperatura de Kelvin a Celsius
            # bc se utiliza en esta línea para calcular la expresión matemática, 
            temperatura_celsius=$(echo "$temperatura_celsius - 273.15" | bc)
            temperatura_celsius=${temperatura_celsius%.*} #eliminamos los decimales y lo almacenamos como un número entero
            echo "$temperatura_celsius $humedad"
        else
            echo "Error: No se pudieron obtener los datos de temperatura y humedad."
        fi
    else
        echo "Error: No se pudo realizar la solicitud a la API de OpenWeatherMap."
    fi
}
