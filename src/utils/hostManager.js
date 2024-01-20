const buildHostName = (request) => {
  // Verifica si la variable de entorno NODE_ENV es 'production'.
  if (process.env.NODE_ENV === 'production') {
    // En entorno de producción, simplemente devuelve el hostname de la solicitud.
    return request.hostname;
  } else {
    // En otros entornos, combina el hostname de la solicitud con el puerto definido en process.env.PORT.
    return `${request.hostname}:${process.env.PORT}`;
  }
}

module.exports = buildHostName;
