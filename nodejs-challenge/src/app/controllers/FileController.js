const File = require('../models/File')


class FileController {

    /* Método para fazer upload de uma imagem
       Essa imagem podera ser usada como avatar de algum usuário
    */
    async store(req, res) {
        const { originalname: name, filename: path } = req.file;

        const file = await File.create({ name, path })

        return res.json(file)
    }
}

module.exports = new FileController()