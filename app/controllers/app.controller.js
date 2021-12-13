const App = require("../models/app.model");

//Criar e salvar uma nova Mensagem
exports.create = (req, res)=> {
    const message = new App({
        message: req.body.message,
    });
    message
    .save()
    .then((data)=> {
        res.send(data);
    })
    .catch((err)=> {
        res.status(500).send({
            message:
            err.message || "Ocorreu algum erro ao criar a mensagem.",
        });
    });
};

//Encontre uma única mensagem com um messageId
exports.findeOnde = (req, res)=> {
    App.findById(req.params.messageId)
    .then((data)=> {
        if(!data) {
            return res.status(404).send({
                message: "Mensagem não encontrada com o ID " + req.params.messageId,
            });
        }
        res.send(data);
    })
    .catch((err)=> {
        if (err,kind === "ObjectId") {
            return res.status(404).send({
                message: "Mensagem não encontrada com o ID " + req.params.messageId,
            });
        }
        return res.status(500).send({
            message: "Erro ao recuperar mensagem pelo ID " + req.params.messageId,
        });
    });
};

//Atualize uma mensagem identificada pelo messageId na solicitação

exports.update = (req, res)=> {
    App.findByIdAndUpdate(
        req.params.messageId,
        {
            message: req.body.message,
        },
        {new: true}
    )
    .then((data)=> {
        if(!data) {
            return res.status(404).send({
                message: "Mensagem não encontrada com Id " + req.params.messageId,
            });
        }
        res.send(data);
    })
    .catch((err)=> {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Mensagem não encontrada com Id " + req.params.messageId,
            });
        }
        return res.status(500).send({
            message: "Erro ao fazer o uplaod da menssagem com esse Id " + req.params.messageId,
        });
    });
};
// Exclua uma mensagem com o messageId especificado na solicitação
exports.delete = (req, res) => {
    App.findByIdAndRemove(req.params.messageId)
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          });
        }
        res.send({ message: "Message deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "Message not found with id " + req.params.messageId,
          });
        }
        return res.status(500).send({
          message: "Could not delete message with id " + req.params.messageId,
        });
      });
  };
