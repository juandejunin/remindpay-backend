# remindpay-backend

## Construir la imagen con docker
docker build -t remindpay-back .

## Levantar un contenedor a partir de esa imagen y crear las  variables de entorno necesarias para ello debemos tener previamente creadas: 
### La cuenta en mongo atlas para la variable URL_MONGO
### La cuenta de google con contraseña de aplicacion para la variable EMAIL_PASSWORD
docker run -p 8000:8000  -e PORT=8000 -e URL_MONGO='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' -e EMAIL_ACCOUNT="jxxxxxxxxxx@gmail.com" -e EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"  remindpay-back 

## Si todo salio bien la app estara corriendo en el puerto 8000