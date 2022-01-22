const service = require("./theaters.service")

async function list(req, res) {
  const theaters = await service.list()
  const theatersWithMovies = await Promise.all(
    theaters.map(async (theater) => {
      const movies = await service.listMoviesAt(theater.theater_id)
      return { ...theater, movies }
    })
  )
  res.status(200).json({ data: theatersWithMovies })
}

module.exports = {
  list,
}
