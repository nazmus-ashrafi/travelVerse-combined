
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];
let onlineUsersDetails = [];

const addNewUser = (user, socketId) => {
  let userId = user._id;
  !onlineUsers.some((user) => user.userId === userId) &&
  onlineUsers.push({ userId,user, socketId });

  // !onlineUsersDetails.some((user) => user.userId === userId) &&
  // onlineUsersDetails.push({ user, socketId });

  // !onlineUsersDetails.some((onlineUser) => onlineUser.username === user.username) &&
  // onlineUsersDetails.push({user});
  
};



const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);


};

const getUser = (receiverUserId) => {
  // console.log([...onlineUsers])
  // console.log(receiverUserId)
  // console.log(onlineUsers)

  return onlineUsers.find((userObj) => userObj.userId === receiverUserId);  // bug
};




io.on("connection", (socket) => {
  // console.log("a user connected");


  socket.on("newUser", (userId) => {
    
    
    {userId ? addNewUser(userId, socket.id) : null}
    // addNewUser(user, socket.id);

    // console.log(onlineUsers[0].user.user._id);
    // console.log([...onlineUsers]);
    console.log("added new user");

    io.emit("getUsers", onlineUsers);

  });

  socket.on("sendNotification", ({ senderUserId, receiverUserId, data,type }) => {
    const receiver = getUser(receiverUserId);

    // console.log(receiver.socketId +"socket recei")
    // console.log(senderUserId)
    // console.log(type)

    if (receiver) {
      io.to(receiver.socketId).emit("getNotification", {
        senderUserId,
        data,
        type
      });

    }


  });


  socket.on("sendLike", ({ senderUserId, receiverUserId, data }) => {
    const receiver = getUser(receiverUserId);

    if (receiver) {
      io.to(receiver.socketId).emit("getLike", {
        senderUserId,
        data,
      });

    }


  });


  // send and get message
  socket.on("sendMessage", ({ senderUserId, receiverUserId, text }) => {

    console.log(receiverUserId)
    console.log(text)
    const receiver = getUser(receiverUserId);
    console.log(receiver.socketId)

    io.to(receiver.socketId).emit("getMessage", {
      senderUserId,
      text,
    });
  });

 

    
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("user disconnected");
    io.emit("getUsers", onlineUsers);
  });

  //------------------------------messenger------------------------------

  io.emit("getUsers", onlineUsers);
  io.emit("getUsersDetails", onlineUsersDetails);
 
  io.emit("welcome", "welcome to this server");
  
});


io.listen(3006);

