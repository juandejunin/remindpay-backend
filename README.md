# Backend de RemindPay: Instrucciones de Configuración y Uso

Este repositorio contiene el código fuente del backend de RemindPay, una aplicación que hace uso de diversas tecnologías para recordatorios y pagos. A continuación, se describen los pasos para construir la imagen de Docker y ejecutar la aplicación.

## Clonar repositorio

Para comenzar, debes clonar este repositorio en tu máquina local. Puedes hacerlo fácilmente ejecutando el siguiente comando en tu terminal:

```
git clone https://github.com/juandejunin/remindpay-backend.git
```

## Opción levantar el repositorio en local

1- Crea en la raíz del repositorio un archivo .env basado en el ejemplo proporcionado en .env-example.txt

2- Ejecutar el comando

```
npm i
```

## Opción construcción de la Imagen Docker

A continuación, sigue estos pasos para construir la imagen de Docker. Asegúrate de verificar que te encuentras en la carpeta 'remindpay-backend' antes de proceder.

```
docker build -t remindpay-back --build-arg NODE_VERSION=18.17.1 .
```

### Ejecución de la Aplicación en un Contenedor

Una vez que la imagen de Docker se haya construido con éxito, puedes ejecutar la aplicación en un contenedor. Asegúrate de tener las siguientes variables de entorno previamente configuradas:

+ URL_MONGO: La URL de conexión a tu cuenta en MongoDB Atlas.

+ EMAIL_PASSWORD: La contraseña de la cuenta de Google que utilizarás para enviar correos.

A continuación, utiliza el siguiente comando para levantar el contenedor:

```
docker run -p 8000:8000 --name remind2 -e PORT=8000 -e URL_MONGO='mongodb+srv://<usuario>:<contraseá>@<link-de-mongo>' 
-e JWT_SECRET_KEY='clavesecreta'  -e EMAIL_ACCOUNT="<usuario-de-gmail>@gmail.com" -e EMAIL_PASSWORD="<password-de-aplicacion-de-gmail>"
 -e URL_SIGNIN='<link-de-redireccion-inicio>'  remindpay-back
```

Si todo se ha configurado correctamente y el contenedor se ha iniciado sin problemas, la aplicación estará funcionando en el puerto 8000.

¡Listo! Ahora puedes acceder a la aplicación en <http://localhost:8000>.

## Endpoints

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

#### Respuesta en caso de éxito

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

#### Respuesta en caso de éxito

```
{
    "success": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTQ4NDcyNjcsImV4cCI6MTY5NDg5MDQ2N30.wQ5VrDNki8O-7DWDGnlt-o-MiK32_WH-GYxHXzHCdvE"
    },
    "errorMsg": null
}
```

## Endpoint Recordatorios

Para todos los endpoints CRUD de recordatorios, es necesario estar autenticados. Deberás incluir en la cabecera la clave "Authorization" y completar el campo con el token JWT obtenido en el inicio de sesión.

### create reminder

#### URL del Endpoint

```
localhost:8000/api/reminder/create
```

#### Campos que recibe en formato json

{
    "remindername":"cablevision",
    "price":"78888",
    "date": "2024-09-23T10:30:22"
}

#### Respuesta en caso de éxito

```
Recordatorio creado con exito
```


### update reminder

#### URL del Endpoint

```
localhost:8000/api/reminder/update/<id del recordatorio>
```

#### Campos que recibe en formato json

```
{
    "remindername":"netflix",
    "price":"5",
    "date": "2024-09-23T03:22:00"
}
```


#### Respuesta en caso de éxito

```
{
    "status": "success",
    "message": "Recordatorio actualizado con éxito"
}
```

### Read reminder

#### URL del Endpoint

```
localhost:8000/api/reminder/read
```

#### Campos que recibe en formato json

```
{
    "remindername":"netflix",
    "price":"5",
    "date": "2024-09-23T03:22:00"
}
```


#### Respuesta en caso de éxito

```
{
    "status": "success",
    "message": "Reminders encontrados",
    "reminders": [
        
        {
            "_id": "650e3d9b2ec784e611870cc5",
            "remindername": "cablevision",
            "price": "78888",
            "date": "2023-09-23T01:22:00.000Z",
            "created_at": "2023-09-23T01:21:31.291Z",
            "user": "650db166eef5d154365d8a62",
            "__v": 0
        },
        {
            "_id": "650fd916767b52be359bc91a",
            "remindername": "netflix",
            "price": "78888",
            "date": "2023-09-23T01:22:00.000Z",
            "created_at": "2023-09-24T06:37:10.079Z",
            "user": "650db166eef5d154365d8a62",
            "__v": 0
        },
        {
            "_id": "650fd93d1c7bc60fbdbfb2a1",
            "remindername": "amazon",
            "price": "78888",
            "date": "2023-09-23T01:22:00.000Z",
            "created_at": "2023-09-24T06:37:49.119Z",
            "user": "650db166eef5d154365d8a62",
            "__v": 0
        }
    ]
}
```

### Read One reminder

#### URL del Endpoint

```
localhost:8000/api/reminder/read/<id del recordatorio>
```


#### Respuesta en caso de éxito

```
{
    "status": "success",
    "message": "Recordatorio encontrado",
    "reminder": {
        "_id": "6511124a97a336e8fd76bed0",
        "remindername": "cablevision",
        "price": "78888",
        "date": "2023-09-23T01:22:00.000Z",
        "created_at": "2023-09-25T04:53:30.103Z",
        "user": "650db166eef5d154365d8a62",
        "__v": 0
    }
}
```

### Delete reminder

#### URL del Endpoint

```
localhost:8000/api/reminder/delete/<id del recordatorio>
```


#### Respuesta en caso de éxito

```
{
    "status": "success",
    "message": "El recordatorio ha sido eliminado exitosamente."
}
```

## El formato ISO 8601 sigue una estructura específica

Fecha (AAAA-MM-DD): Representa la parte de la fecha con el año (AAAA), el mes (MM) y el día (DD) separados por guiones ("-"). Por ejemplo, "2023-09-22" representa el 22 de septiembre de 2023.

Hora (HH:MM:SS.sss): Representa la parte de la hora con la hora (HH), los minutos (MM) y los segundos (SS) separados por dos puntos (":"). Opcionalmente, se puede incluir una fracción de segundo (sss) después de un punto decimal. Por ejemplo, "14:30:00" representa las 2:30 PM, mientras que "14:30:45.123" representa las 2:30:45.123 segundos.

Zona horaria: Opcionalmente, se puede incluir una zona horaria al final de la cadena. Por ejemplo, "+00:00" representa la zona horaria UTC (Tiempo Universal Coordinado).

Ejemplos de fechas y horas en formato ISO 8601:

Fecha: "2023-09-22" (22 de septiembre de 2023)
Hora: "14:30:00" (2:30 PM)
Fecha y hora: "2023-09-22T14:30:00" (22 de septiembre de 2023, 2:30 PM)
Fecha, hora y zona horaria: "2023-09-22T14:30:00+00:00" (22 de septiembre de 2023, 2:30 PM en UTC)
El formato ISO 8601 es muy útil porque es independiente de la configuración regional y permite una representación unificada de fechas y horas en todo el mundo, lo que facilita el intercambio de información entre sistemas y aplicaciones.
