#!/bin/bash

# Incluimos las funciones compartidas
source consumir_api.sh

# Verificamos si se proporcionaron tres argumentos: id, nombre y clave
if [ $# -ne 3 ]; then
    echo "Uso: $0 <id> <nombre> <clave>"
    echo "Este script acepta tres argumentos: id, nombre y clave."
    exit 1
fi
# Lista de ciudades para elegir aleatoriamente
ciudades=("Buenos+Aires" "Cordoba" "Rosario" "Mendoza" "La+Plata" "Mar+del+Plata" "Salta" "San+Juan" "San+Luis" "San+Miguel+de+Tucuman")
# Elegir una ciudad aleatoria de la lista
ciudad_aleatoria=${ciudades[$RANDOM % ${#ciudades[@]}]}

# Llamamos a la función get_clima_data para obtener el dato de temperatura
clima_data=$(get_clima_data "$ciudad_aleatoria")

if [ -n "$clima_data" ]; then
    # obtenemos los valores de temperatura y humedad
    read -r temperatura humedad <<< "$clima_data"
    echo "El clima actual en $ciudad_aleatoria: temp:$temperatura°C"

    # Realizamos la solicitud post
    wget -O - --method=POST http://localhost:8080/device --body-data="id=$1&n=$2&k=$3&t=$temperatura"
else
    exit 1
fi