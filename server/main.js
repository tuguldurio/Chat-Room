const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')
const users = require('./utils/users')
const { formatMessage } = require('./utils/messages')

const app = express()
const server = require('http').createServer(app)
const io = new Server(server, {cors: {origin: '*'}})

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

function joinEvent(socket, user) {
  // Greet user or notice to other users
  socket.emit('message', formatMessage('admin', `Welcome to ${user.room}.`))
  socket.broadcast.to(user.room).emit('message', formatMessage('admin', `${user.username} has joined.`))
  // Send the room data
  io.to(user.room).emit('roomData', { room: user.room, users: users.getUsersInRoom(user.room) })
}

function leaveEvent(socket, user) {
  io.to(user.room).emit('message', formatMessage('admin',`${user.username} has left.`))
  io.to(user.room).emit('roomData', { room: user.room, users: users.getUsersInRoom(user.room) })
}

io.on('connection', socket => {
  console.log(`connection: ${socket.id}`)

  socket.on('joinRoom', ({ username, room }, callback) => {
    try {
      const user = users.addUser({ id: socket.id, username, room: room })
      socket.join(user.room)
      joinEvent(socket, user)
      callback()
    } catch (error) {
      callback(error)
    }
  })

  socket.on('changeRoom', (room, callback) => {
    const user = users.getUser(socket.id)

    // socket.leave current room and send message
    socket.leave(user.room)
    leaveEvent(socket, user)

    // change users room
    user.room = room
    socket.join(room)
    
    // greet user after calling client callback
    callback()
    joinEvent(socket, user)
  })

  socket.on('sendMessage', (message) => {
    const user = users.getUser(socket.id)
    io.to(user.room).emit('message', formatMessage(user, message))
  })
  
  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id)

    if (user) {
      leaveEvent(socket, user)
      console.log(`disconnection: ${socket.id}`)
    }
  })
})

const PORT = process.env.PORT || 8000

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})