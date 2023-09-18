# Backend de RemindPay: Instrucciones de Configuración y Uso

Este repositorio contiene el código fuente del backend de RemindPay, una aplicación que hace uso de diversas tecnologías para recordatorios y pagos. A continuación, se describen los pasos para construir la imagen de Docker y ejecutar la aplicación.

## Clonar repositorio

Para comenzar, debes clonar este repositorio en tu máquina local. Puedes hacerlo fácilmente ejecutando el siguiente comando en tu terminal:

```
git clone https://github.com/juandejunin/remindpay-backend.git
```


## Construcción de la Imagen Docker

A continuación, sigue estos pasos para construir la imagen de Docker. Asegúrate de verificar que te encuentras en la carpeta 'remindpay-backend' antes de proceder.

```

docker build -t remindpay-back --build-arg NODE_VERSION=18.17.1 .

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

## Enpoints

### Registro(Register)

Este endpoint permite a los usuarios registrarse en la aplicación proporcionando los siguientes campos: username, email y password. Es importante destacar que ninguno de estos campos puede estar vacío. Además, el registro no será exitoso si se proporciona un formato de email inválido o si el username o email ya está en uso en la aplicación.

#### URL del Endpoint

```
localhost:8000/api/auth/register
```

#### Campos que recibe en formato json

```
{
    "username": "juanciddsaas",
    "email": "juan75amieva@gmail.com",
    "password": "contra123"
}
```

#### Respuesta en caso de éxito:

```
{
    "success": true,
    "data": {
        "msg": "Registered successfully. You must verify the account. Check your mail",
        "id": "65054aef1c596b982d066470"
    },
    "errorMsg": null
}

```

### Inicio de Sesion (Login)

Este endpoint permite a los usuarios iniciar sesión en el sistema. Es importante destacar que, previo a esto, se debe verificar la cuenta mediante el enlace que se envía al correo electrónico proporcionado durante el registro.

#### URL del Endpoint

```
localhost:8000/api/auth/login
```

#### Campos que recibe en formato json

```
{
    "email": "juandejunin75@gmail.com",
    "password": "contra123"
}
```

#### Respuesta en caso de éxito:

```
{
    "success": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTQ4NDcyNjcsImV4cCI6MTY5NDg5MDQ2N30.wQ5VrDNki8O-7DWDGnlt-o-MiK32_WH-GYxHXzHCdvE"
    },
    "errorMsg": null
}
```

### Configuracion de las notificaciones de pago (Setting)

Este endpoint se utiliza temporalmente para llevar a cabo pruebas de autenticación.

#### URL del Endpoint (Metodo GET)

```
localhost:8000/api/set/seting
```
Para acceder a este endpoint, debes proporcionar los siguientes datos en la cabecera:

Key:
```
Authorization
```
Value (el token obtenido al iniciar sesión). Por ejemplo:
```
beaer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTQ4NDk1MzksImV4cCI6MTY5NDg5MjczOX0.9W0BcO8pdxHfmVMOZL92fHTkX6n8Sb02_z3oo9ocSwM
```

#### Respuesta en caso de éxito:

Una cadena de texto:
```
Si llegaste hasta aca es porque pudiste autenticarte exitosamente
```

