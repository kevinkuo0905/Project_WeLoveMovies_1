const knex = require("../db/connection")

function list() {
  return knex("movies").select("*")
}

function listInTheaters() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ is_showing: true })
    .groupBy("m.movie_id")
}

function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first()
}

function playingInTheaters(movie_id) {
  return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.*")
    .where({ "mt.movie_id": movie_id, is_showing: true })
}

function movieReviews(movie_id) {
  return knex("reviews")
    .select("*")
    .where({ movie_id })
}

function readCritic(critic_id) {
  return knex("critics")
    .select("*")
    .where({ critic_id })
    .first()
}

module.exports = {
  list,
  listInTheaters,
  read,
  playingInTheaters,
  movieReviews,
  readCritic,
}
