# Remindpay-backend

Este repositorio contiene el código fuente del backend de RemindPay, una aplicación que hace uso de diversas tecnologías para recordatorios y pagos. A continuación, se describen los pasos para construir la imagen de Docker y ejecutar la aplicación.

## Construcción de la Imagen Docker

Para iniciar, sigue estos pasos para construir la imagen de Docker:

```
docker build -t remindpay-back .
```

## Ejecución de la Aplicación en un Contenedor

Una vez que la imagen de Docker se haya construido con éxito, puedes ejecutar la aplicación en un contenedor. Asegúrate de tener las siguientes variables de entorno previamente configuradas:

+ URL_MONGO: La URL de conexión a tu cuenta en MongoDB Atlas.

+ EMAIL_PASSWORD: La contraseña de la cuenta de Google que utilizarás para enviar correos.

A continuación, utiliza el siguiente comando para levantar el contenedor:

```
docker run -p 8000:8000  -e PORT=8000 -e URL_MONGO='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' -e EMAIL_ACCOUNT="<jxxxxxxxxxx@gmail.com>" -e EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"  remindpay-back
```

Si todo se ha configurado correctamente y el contenedor se ha iniciado sin problemas, la aplicación estará funcionando en el puerto 8000.

¡Listo! Ahora puedes acceder a la aplicación en http://localhost:8000.

