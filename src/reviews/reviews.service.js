const knex = require("../db/connection")

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first()
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del()
}

function readCritic(critic_id) {
  return knex("critics").select("*").where({ critic_id }).first()
}

module.exports = {
  read,
  update,
  destroy,
  readCritic,
}
