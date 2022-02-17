const Msg = require('./models/Chat.model')

// socket.io for the chat function
const app = require("./app");
const socket = require('socket.io');


// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

const io = socket(server);

io.on('connection', socket => {  
  console.log('new connection')
  console.log('id of the socket: ', socket.id)
  socket.on("chat message", msg => {
    const message = new Msg({msg})
    message.save().then(() => {
      console.log('this is the incoming message: ', msg);
      io.emit('chat message', msg)
  })
    
  })
})