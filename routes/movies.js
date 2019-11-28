const express = require('express')
const router = express.Router()
const Movie = require('../models/movies')
const User = require('../models/users')
const axios = require('axios')
const cheerio = require('cheerio')
const delay = require('delay')
let date = require('yyyy-mm-dd')

const crawling = async() => {
    let data = await Movie.find({})
    for (i = 171581; i < data.length; i++) {
      const html = await axios.get(data[i].posterUrl)
      const $ = cheerio.load(html.data);
      const imgSrc = $('#targetImage').attr('src')
      data[i].posterUrl = imgSrc
      data[i].save()
      console.log(i)
    }
  }
  // 이름만들기
  // let movies = await Movie.find()
  // for (movie of movies) {
  //   movie.acotrs_name = []
  //   try {
  //     for (a of movie.actors) {
  //       let c = a.name.split(' ').join('')
  //       movie.actors_name.push(c)
  //     }
  //   } catch (e) {
  //     res.send('error')
  //   }

// router.get('/test', async function(req, res) {
//   try {
//     crawling()
//   } catch (e) {
//     console.log(e)
//   }
//   res.send('good')
// })

// router.get('/test2', async function(req, res) {
//     let movies = await Movie.find()
//     for (movie of movies) {
//       try {
//         movie.title_trim = movie.title.split(' ').join('')
//       } catch (e) {
//         console.log(e)
//       }
//       // res.send(movie)
//       await movie.save()
//         // res.json(movie)
//       console.log(movie.index)
//     }
//     res.send('success')
//   })
// for (d of data) {
//   d.title_trim = d.title.split(' ').join('')
//   console.log(d.title.split(' ').join(''))
//   d.save()
// }

// 영화 전체 조회
router.get('/', async function(req, res, next) {
  Movie.find({}).lt('openDt', date())
    .sort('-openDt -score')
    .ne('score', null)
    .limit(50)
    .then((movies) => {
      // console.log(movies[0])
      if (!movies.length) {
        return res.status(404).send({ message: 'error' })
      }
      res.json(movies)
    })
})

// 영화 추가
router.post('/', function(req, res) {
  // console.log('1111111111')
  console.log(req.body)
  Movie.create(req.body)
    .then((movie) => {
      res.send(movie)
    })
    .catch((err) => res.send({ message: 'error' }))
})

// 해당 영화 조회
router.get('/:index', async function(req, res) {
  const movie = await Movie.findOne({ index: req.params.index })
  res.json(movie)
})


// 조건 만족하는 영화목록 조회
router.post('/search', async function(req, res) {
  let movie_title
  let movie_actor
  let movie_director
  let result
  let genres = []

  if (req.body.keyword) {
    let target = req.body.keyword.split(' ').join('')

    // target = Array.from(target).join(' ')
    console.log(target)
    const aaa = await Movie.find({ director_name: { $regex: target, $options: "i" } })
      // console.log(aaa)
    movie_title = Movie.find({ title_trim: { $regex: target, $options: "ix" } })
    movie_actor = Movie.find({ actors_name: { $in: target } })
    movie_director = Movie.find({ directors_name: { $in: target } })
  }
  if (req.body.openDt) {
    movie_title = movie_title
      .gt('openDt', req.body.openDt.from)
      .lt('openDt', req.body.openDt.to)
    movie_actor = movie_actor
      .gt('openDt', req.body.openDt.from)
      .lt('openDt', req.body.openDt.to)
    movie_director = movie_director
      .gt('openDt', req.body.openDt.from)
      .lt('openDt', req.body.openDt.to)
  }

  if (req.body.genre) {
    for (g of req.body.genre) {
      genres.push({ genres: g })
    }

    movie_title = movie_title
      .or(genres)
    movie_actor = movie_actor
      .or(genres)
    movie_director = movie_director
      .or(genres)
  }

  if (req.body.rating) {
    movie_title = movie_title
      .gt('score', req.body.rating)
    movie_actor = movie_actor
      .gt('score', req.body.rating)
    movie_director = movie_director
      .gt('score', req.body.rating)
  }

  if (req.body.runingTime) {
    movie_title = movie_title
      .lt('runningTime', req.body.runingTime)
    movie_actor = movie_actor
      .lt('runningTime', req.body.runingTime)
    movie_director = movie_director
      .lt('runningTime', req.body.runingTime)
  }

  movie_title = await movie_title
  movie_actor = await movie_actor
  movie_director = await movie_director

  result = {
    movie_title: movie_title,
    movie_actor: movie_actor,
    movie_director: movie_director
  }

  res.json({ result: result })
})


// 영화 리뷰정보 작성 + 유저모델에 작성
router.post('/:index/review', async function(req, res) {
  // 유저정보와 평점, 리뷰정보와 해당 영화아이디(index)가 넘어와 야됨
  // 영화정보는 위에서 보는 것 처럼 넘겨주면 됨
  // user 라우트에 함수 추가
  let movie = await Movie.findOne({ index: req.params.index })
  const review = { // user, rate, content
    email: req.body.email,
    content: req.body.content,
    userId: req.body.userId
  }

  movie.reviews.push(review)
  movie.save()

  let user = await User.findOne({ email: req.body.email })
  const user_review = {
    content: req.body.content,
    index: req.params.index
  }
  user.reviews.push(user_review)
  user.save()
  res.send('successfully saved')
})

// 리뷰 삭제
router.delete('/:index/review', async function(req, res) {
  let movie = await Movie.findOne({ index: req.params.index })
  console.log(movie.reviews)
  const fm = item => item.email === req.body.email
  movie.reviews.splice(movie.reviews.findIndex(fm), 1)
  movie.save()
    // console.log(movie.reviews)

  let user = await User.findOne({ email: req.body.email })
  const fu = item => item.index === req.params.index
  user.reviews.splice(user.reviews.findIndex(fu), 1)
  user.save()
    // console.log(user.reviews)
  res.send('successfully saved')
})


// 영화 좋아요 달기 및 유저 좋아요 정보 작성
router.post('/:index/like', async function(req, res) { // 유저정보(email)와 해당 영화 id가 넘어와야 됨
  let movie = await Movie.findOne({ index: req.params.index })
  if (movie.like_users.includes(req.body.email)) {
    movie.like_users.splice(movie.like_users.indexOf(req.body.email), 1)
  } else {
    movie.like_users.push(req.body.email)
  }

  movie.save()

  let user = await User.findOne({ email: req.body.email })
  if (user.like_movies.includes(req.params.index)) {
    user.like_movies.splice(user.like_movies.indexOf(req.params.index), 1)
  } else {
    user.like_movies.push(req.params.index)
  }

  user.save()

  res.send('successfully saved')
})

// 평점
router.post('/:index/rate', async function(req, res) {
  // 검증필요
  let movie = await Movie.findOne({ index: req.params.index })
  let user = await User.findOne({ email: req.body.email })
  let rate = await Movie.findOne({ index: req.params.index }).distinct('rate')
  let user_rate = await User.findOne({ email: req.body.email }).distinct('rate')

  if (rate.some(item => item.email === req.body.email)) {
    rate.forEach(function(item) {
      if (item.email === req.body.email) {
        item.rate = req.body.rate
      }
    })
    rate.forEach(function(item) {
      if (item.index === req.params.index) {
        item.rate = req.body.rate
      }
    })
  } else {
    rate.push({
      email: req.body.email,
      rate: req.body.rate
    })
    user.rate.push({
      index: req.params.index,
      rate: req.body.rate
    })
  }

  movie.rate = rate
  user.rate = rate
  await movie.save()
  await user.save()

  // let user = await User.findOne({ email: req.body.email })
  // if (user.like_movies.includes(req.params.index)) {
  //   user.like_movies.splice(user.like_movies.indexOf(req.params.index), 1)
  // } else {
  //   user.like_movies.push(req.params.index)
  // }

  // user.save()

  res.send('successfully saved')
})

// router.put('/:movie_id', function(req, res) {
//   Movie.findOne({ _id: req.params.movie_id }, { $set: req.query })
//     .then()
// })

module.exports = router