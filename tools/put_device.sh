#!/bin/bash

# Verifica si se proporcionó un ID de dispositivo y una nueva clave como argumentos
if [ $# -ne 2 ]; then
  echo "Uso: $0 <ID_device> <nueva_clave>"
  exit 1
fi

# Establece el ID de dispositivo y la nueva clave como variables
DEVICE_ID="$1"
NEW_KEY="$2"

# Define la URL de la API PUT
URL="http://localhost:8080/device/$DEVICE_ID"

# Crea los datos que se enviarán en el cuerpo de la solicitud PUT
DATA="key=$NEW_KEY"


wget -O - --method=PUT --body-data="$DATA" --header="Content-Type: application/x-www-form-urlencoded" $URL
