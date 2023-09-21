const Publication = require('../models/Publication');

// Guardar publicación
const save = (req, res) => {
  // Recoger datos del body
  const params = req.body;
  const user = req.user
  console.log(params);

  // Si no llega el texto
  if (!params.text) {
    return res.status(400).send({ status: "error", message: "Debes completar el texto" });
  }


  console.log(req.body)
  // Crear el modelo
  const newPublication = new Publication(params);
  newPublication.user = req.user.id;

  // Guardar el objeto en la base de datos usando Promesas
  newPublication.save()
    .then(publicationStored => {
      if (!publicationStored) {
        return res.status(400).send({ status: "error", message: "No se guardó la publicación" });
      }

      return res.status(200).send({
        status: "success",
        message: "Publicación guardada",
        publicationStored
      });
    })
    .catch(error => {
      console.error(error);
      return res.status(500).send({ status: "error", message: "Error al guardar la publicación" });
    });
};

module.exports = { save };
