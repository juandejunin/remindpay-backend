# Define el argumento para la versión de Node.js
ARG NODE_VERSION=18.17.1

# Usa el argumento para especificar la versión de Node.js
FROM node:${NODE_VERSION}

#Definir el directorio de trabajo
WORKDIR /home/app

#Copiar los archivos del proyecto
COPY . .

#Instalar dependencias
RUN npm install

#Exponer el puerto de la app
EXPOSE 8000

#Iniciar la app
CMD [ "npm", "start" ]