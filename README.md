# remindpay-backend
## Crear .env en la raiz del proyecto
PORT
## Construir la imagen con docker
docker build -t remindpay-back .

## Levantar un contenedor a partir de esa imagen
docker run -p 8000:8000 remindpay-back