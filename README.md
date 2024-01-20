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
localhost:8000/api/v1/auth/register
```

#### Campos que recibe en formato json

```
{
    "username": "juanciddsaas",
    "email": "juan75amieva@gmail.com",
    "password": "contra123"
}
```
#### Si el username o el email ya esta en uso

```
{"status":"error","data":null,"message":"Invalid Email/Username"}
```

#### Respuesta en caso de éxito

```
{
    "status": "success",
    "message": "User created"
}

```

### Inicio de Sesion (Login)

Este endpoint permite a los usuarios iniciar sesión en el sistema. Es importante destacar que, previo a esto, se debe verificar la cuenta mediante el enlace que se envía al correo electrónico proporcionado durante el registro.

#### URL del Endpoint

```
localhost:8000/api/v1/auth/login
```

#### Campos que recibe en formato json

```
{
    "email": "juandejunin75@gmail.com",
    "password": "contra123"
}
```

#### Si intentamos logearnos sin confirmar el email


```
{
    "status": "error",
    "message": "You must verify the account. Check your mail"
}
```

### Si la contraseña es incorrecta


```
{
    "status": "error",
    "message": "You did not identify yourself correctly"
}
```

#### Si el usuario es incorrecto

```
{
    "status": "error",
    "message": "User not found"
}

```
#### Respuesta en caso de éxito

```
{
    "status": "success",
    "message": "login action",
    "user": {
        "id": "65a43438c3fbc5fe88b1d4c3"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1YTQzNDM4YzNmYmM1ZmU4OGIxZDRjMyIsInVzZXJuYW1lIjoianVhbmNoaSIsImVtYWlsIjoianVhbmRlanVuaW43NUBnbWFpbC5jb20iLCJpYXQiOjE3MDUyNjA3MzgsImV4cCI6MTcwNTM0NzEzOH0.Z4AXgNoq2xka_TbiYwJkb8nd7D5JdZ-vOJEVFA9E1yg"
}
```

## Endpoint Recordatorios

Para todos los endpoints CRUD de recordatorios, es necesario estar autenticados. Deberás incluir en la cabecera la clave "Authorization" y completar el campo con el token JWT obtenido en el inicio de sesión.

#### Formato de la cabecera

Al token obtenido en login se le antepone la palabre beaer 

```
Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1YTYxZDIyZGZmZDg2YWVhYmRkNDNmZCIsInVzZXJuYW1lIjoianVhbmNoaSIsImVtYWlsIjoianVhbmRlanVuaW43NUBnbWFpbC5jb20iLCJpYXQiOjE3MDUzODY1ODQsImV4cCI6MTcwNTQ3Mjk4NH0.fjtX-NxGo7VjvBFOdxhZcZi--3wVeCAldUTZA-x--K0
```
### create reminder

#### URL del Endpoint

```
http://localhost:8000/api/v1/reminder/create

http://5.250.186.76/api/v1/auth/register
```

#### Campos que recibe en formato json

{
    "remindername":"prueba2",
    "price":"65123",
    "date":"2024-09-23T10:30:22"
}

#### Respuesta en caso de éxito

```
{
    "status": "success",
    "message": "Reminder created successfully",
    "reminder": {
        "remindername": "prueba2",
        "price": "65123",
        "date": "2024-09-23T08:30:22.000Z",
        "_id": "65a62881a0f59d2e65c3ba1a",
        "created_at": "2024-01-16T06:56:01.814Z",
        "user": "65a61d22dffd86aeabdd43fd",
        "alarmDate7": "2024-09-16T08:30:22.000Z",
        "alarmDate5": "2024-09-18T08:30:22.000Z",
        "alarmDate1": "2024-09-22T08:30:22.000Z",
        "__v": 0
    }
}
```


### update reminder

#### URL del Endpoint

```
localhost:8000/api/v1/reminder/update/<id del recordatorio>
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
localhost:8000/api/v1/reminder/read
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
localhost:8000/api/v1/reminder/read/<id del recordatorio>
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
localhost:8000/api/v1/reminder/delete/<id del recordatorio>
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
