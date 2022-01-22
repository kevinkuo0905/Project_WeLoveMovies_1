const service = require("./reviews.service")

async function reviewExists(req, res, next) {
  const review = await service.read(Number(req.params.reviewId))
  if (review) {
    res.locals.review = review
    return next()
  }
  return next({ status: 404, message: "Review cannot be found." })
}

async function read(req, res) {
  const critic = await service.readCritic(res.locals.review.critic_id)
  res.status(200).json({ data: { ...res.locals.review, critic } })
}

async function update(req, res, next) {
  const updatedReview = { ...req.body.data, review_id: res.locals.review.review_id }
  await service.update(updatedReview)
  return next()
}

async function destroy(req, res) {
  await service.destroy(Number(req.params.reviewId))
  res.sendStatus(204)
}

module.exports = {
  read: [reviewExists, read],
  update: [reviewExists, update, reviewExists, read], // SQLite needs to query the database again to return updated record.
  delete: [reviewExists, destroy],
}
