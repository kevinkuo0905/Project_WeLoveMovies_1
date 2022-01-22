const knex = require("../db/connection")

function list() {
  return knex("theaters").select("*")
}

function listMoviesAt(theater_id) {
  return knex("movies_theaters as mt")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({ theater_id, is_showing: true })
}

module.exports = {
  list,
  listMoviesAt,
}
