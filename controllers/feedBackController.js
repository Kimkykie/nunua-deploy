exports.help = (req, res) => {
  res.render('help', {title: 'Help and Feedback'})
}

exports.terms = (req, res) => {
  res.render('terms', {title: 'Terms and Conditions'})
}

exports.privacy = (req, res) => {
  res.render('privacy', {title: 'Privacy Policy'})
}
