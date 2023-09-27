#!/bin/bash

# Verifica si se proporcionó un ID de dispositivo como argumento
if [ $# -ne 1 ]; then
  echo "Falta ID_device"
  exit 1
fi

wget -O - --method=DELETE http://localhost:8080/device/$1