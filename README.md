# remindpay-backend

## Construir la imagen con docker
docker build -t remindpay-back .

## Levantar un contenedor a partir de esa imagen y crear las  variables de entorno necesarias
docker run -p 8000:8000  e PORT=8000 -e URL_MONGO='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' -e EMAIL_ACCOUNT="jxxxxxxxxxx@gmail.com" -e EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"  remindpay-back 

## Si todo salio bien la app estara corriendo en el puerto 8000