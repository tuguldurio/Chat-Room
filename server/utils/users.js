const { images } = require('../images/images.json')

const users = []

function addUser({ id, username, room }) {
  if (users.find(user => user.username === username)) {
    throw 'Username is taken'
  }

  const imgIndex = Math.floor(Math.random() * images.length)
  const user = { id, username, room, image: images[imgIndex] }

  users.push(user)
  return user
}

function getUser(id) {
  return users.find(user => user.id === id)
}

function removeUser(id) {
  const index = users.findIndex(user => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

function getUsersInRoom(room) {
  return users.filter(user => user.room === room)
}

module.exports = { addUser, getUser, removeUser, getUsersInRoom }