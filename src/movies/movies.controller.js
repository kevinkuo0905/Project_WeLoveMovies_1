const service = require("./movies.service")

async function list(req, res) {
  const data =
    req.query.is_showing === "true" ? await service.listInTheaters() : await service.list()
  res.status(200).json({ data })
}

async function movieExists(req, res, next) {
  const movie = await service.read(Number(req.params.movieId))
  if (movie) {
    res.locals.movie = movie
    return next()
  }
  return next({ status: 404, message: "Movie cannot be found." })
}

function read(req, res) {
  res.status(200).json({ data: res.locals.movie })
}

async function playingInTheaters(req, res) {
  const theaters = await service.playingInTheaters(Number(req.params.movieId))
  res.status(200).json({ data: theaters })
}

async function movieReviews(req, res) {
  const reviews = await service.movieReviews(Number(req.params.movieId))
  const reviewsWithCritics = await Promise.all(
    reviews.map(async (review) => {
      const critic = await service.readCritic(review.critic_id)
      return { ...review, critic }
    })
  )
  res.status(200).json({ data: reviewsWithCritics })
}

module.exports = {
  list,
  read: [movieExists, read],
  playingInTheaters: [movieExists, playingInTheaters],
  movieReviews: [movieExists, movieReviews],
}
