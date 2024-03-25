require("dotenv").config();
const mongoose= require('mongoose');
mongoose.connect(process.env.DATABASE,
{ useNewUrlParser: true,
    useUnifiedTopology: true });
    
mongoose.connection.on("error", (err) => {
    console.log("Mongoose Connection ERROR: " + err.message);
  });
  
  mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
  });
  
  //Bring in the models
  require("./models/User");

  
  const app = require("./app");

const server=app.listen(8000,()=>{
    console.log('Server is listening on port 8000');
});
const io = require('socket.io')(server,{
  allowEIO3:true,
  cors:{
    origin:true,
    methods:['GET','POST','DELETE','PUT'],
    credentials:true
  }
});

const jwt = require('jwt-then')
const User= mongoose.model('User');
io.use(async(socket,next)=>{
  try{
    const token = socket.handshake.query.token;
    const payload=await jwt.verify(token, process.env.SECRET);
    socket.userId =payload.indexOf;
    next();

  }
  catch(err){}
});
io.on('connection',(socket)=>{
  console.log("Connected:",socket.userId);
  socket.on("disconnect",()=>{
    console.log("Disconnected:"+socket.userId)
  })
});

