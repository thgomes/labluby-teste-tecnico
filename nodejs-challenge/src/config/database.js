
module.exports = {
  dialect: "postgres",
  host: "127.0.0.1",
  username: "postgres",
  password: "secret",
  database: "node-luby",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  },
}