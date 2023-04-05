const WebSocket = require("ws")

// connectionStore.js
let connections = new Set()

function addConnection(connection) {
  connections.add(connection)
}

function removeConnection(connection) {
  connections.delete(connection)
}

function broadcastMessage(message) {
  const messageString = JSON.stringify(message)
  connections.forEach((connection) => {
    if (connection.readyState === WebSocket.OPEN) {
      connection.send(messageString)
    }
  })
}

module.exports = {
  addConnection,
  removeConnection,
  broadcastMessage,
}
