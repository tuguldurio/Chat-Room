const moment = require('moment')

function formatMessage(user, text) {
  let username = 'admin'
  let image = null

  if (user !== 'admin') {
    username = user.username
    image = user.image
  }

  return {
    username: username,
    image: image,
    text,
    time: moment.utc().format()
  }
}

module.exports = { formatMessage }