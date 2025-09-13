#!/bin/bash
set -e

echo "🔹 Subindo containers com docker-compose..."
docker-compose up -d

echo "🔹 Inicializando app_veiculos..."
cd ./app_veiculos
npm install
npm run start:dev &
cd ..

echo "🔹 Inicializando angular_app..."
cd ./angular_app
npm install
npm run start &
cd ..

echo "✅ Todos os serviços foram iniciados!"
