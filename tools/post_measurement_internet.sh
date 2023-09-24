#!/bin/bash

# Incluimos las funciones compartidas desde common_functions.sh
source consumir_api.sh

# Verificamos si se proporcionó un argumento: id
if [ $# -ne 1 ]; then
    echo "Uso: $0 <id>"
    echo "Este script acepta un solo argumento, que es la ID."
    exit 1
fi

# Lista de ciudades para elegir aleatoriamente
ciudades=("Buenos+Aires" "Cordoba" "Rosario" "Mendoza" "La+Plata" "Mar+del+Plata" "Salta" "San+Juan" "San+Luis" "San+Miguel+de+Tucuman")

# Elegir una ciudad aleatoria de la lista
ciudad_aleatoria=${ciudades[$RANDOM % ${#ciudades[@]}]}

# Llamamos a la función get_clima_data para obtener datos de temperatura y humedad
clima_data=$(get_clima_data "$ciudad_aleatoria")

if [ -n "$clima_data" ]; then
    # obtenemos los valores de temperatura y humedad
    read -r temperatura humedad <<< "$clima_data"
    echo "El clima actual en $ciudad_aleatoria: temp:$temperatura°C y hum:$humedad%"
    
    # Realizamos una solicitud POST a la API con los datos y el argumento proporcionado
    wget -O - --method=POST http://localhost:8080/measurement --body-data="id=$1&t=$temperatura&h=$humedad"
else
    exit 1
fi