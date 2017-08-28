const mongoose = require('mongoose')
const Prediction = mongoose.model('Prediction')

exports.homePage = (req, res) => {
  res.render('layout', {title: 'Home'})
}

exports.addPrediction = (req, res) => {
  res.render('addPrediction', {title: 'Add Prediction'})
}

exports.createPrediction = async(req, res) => {
  // Trim to remove empty strings from array
  let team1arr = req.body.team1.filter(e => String(e.trim()))
  let team2arr = req.body.team2.filter(e => String(e.trim()))
  let predictionarr = req.body.prediction.filter(e => String(e.trim()))

  // Only push data to model if more than 5
  if (team1arr.length >= 5 && team2arr.length >= 5 && predictionarr.length >= 5) {
    const prediction = new Prediction({
      author: req.user._id,
      price: 10
    })

    for (var i = 0; i < req.body.team1.length; i++) {
      //  If all the required inputs are filled save to database else ignore the incomplete fields
      if (req.body.team1[i] !== '' && req.body.team2[i] !== '' && req.body.prediction[i] !== '' && req.body.time[i] !== '' && req.body.date[i] !== null) {
        prediction.team.push({
          team1: req.body.team1[i],
          team2: req.body.team2[i],
          prediction: req.body.prediction[i],
          date: req.body.date[i],
          time: req.body.time[i]
        })
      }
    }
    await prediction.save()
    req.flash('success', 'Succesfully created prediction')
    res.redirect(`/predictions/${prediction.slug}`)
  } else {
    req.flash('error', 'You must enter 5 or more')
    res.render('addPrediction', { title: 'Add Prediction', body: req.body, flashes: req.flash() })
  }
  console.log(predictionarr)
}

exports.getPredictions = async(req, res) => {
  // 1. Query database for list of all stores
  const predictions = await Prediction.find().populate('author')
  res.render('predictions', { title: 'Predictions', predictions: predictions })
}

exports.getPredictionBySlug = async(req, res, next) => {
  const prediction = await Prediction.findOne({ slug: req.params.slug }).populate('author')
  if (!prediction) return next()
  res.render('prediction', { prediction, title: 'Prediction' })
}

exports.getUserPredictions = async(req, res) => {
  // 1. Query database for list of all stores
  const predictions = await Prediction.find({author: req.user}).populate('author')
  console.log(predictions)
  res.render('userpredictions', { title: 'My Predictions', predictions: predictions })
}
