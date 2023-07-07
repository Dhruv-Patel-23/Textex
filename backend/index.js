import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connection from "./database/db.js";
import dotenv from "dotenv";
import User from "./models/user.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
import allUserRoute from "./routes/allUserRoute.js"
import messageRoute from "./routes/messageRoute.js"
// import { allUsers } from "./controllers/userController.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

connection();

app.get("/", (req, res) => {
  res.send("API is running..");
});
app.use("/api/chat", chatRoutes);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/api/user", allUserRoute);
app.use("/api/message",messageRoute);
app.use(notFound);
app.use(errorHandler);




const server=app.listen(PORT, () => {
  console.log(`server is running at port http://localhost:${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://master--starlit-lokum-e96e21.netlify.app",
    // credentials: true,
  },
});

io.on("connection",(socket)=>{
console.log("socket connected")

socket.on("setup",(userData)=>{
socket.join(userData._id);
socket.emit("connected");
})

socket.on('join chat',(room)=>{
  socket.join(room);
  console.log("User joined room "+ room);
})

socket.on('typing',(room)=>socket.in(room).emit("typing"));
socket.on('stop typing',(room)=>socket.in(room).emit(" stop typing"));
socket.on('new message',(newMessageRecieved)=>{
var chat= newMessageRecieved.chat;
if(!chat.users) return console.log("chat.users users not defined");
chat.users.forEach(user=>{
  if(user._id==newMessageRecieved.sender._id)return;
  socket.in(user._id).emit("message recieved",newMessageRecieved)
})

})
socket.off("setup", () => {
  console.log("USER DISCONNECTED");
  socket.leave(userData._id);
});

})

