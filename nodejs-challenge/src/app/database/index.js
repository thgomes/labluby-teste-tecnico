const Sequelize = require('sequelize')
const databaseConfig = require('../../config/database')

const User = require('../models/User')
const Repositorie = require('../models/Repository')
const Token = require('../models/Token')
const Follow = require('../models/Follow')
const File = require('../models/File')

const models = [User, Repositorie, Token, Follow, File];

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(databaseConfig)

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models))
    }
}

module.exports = new Database()