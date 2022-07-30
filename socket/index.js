
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (user, socketId) => {
  !onlineUsers.some((user) => user.username === user) &&
  onlineUsers.push({ user, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  console.log([...onlineUsers]+"hiioo")
  // console.log(userId)

  return onlineUsers.find((userObj) => userObj.user.user._id === receiverId);  // bug
};




io.on("connection", (socket) => {
  // console.log("a user connected");

  socket.on("newUser", (user) => {
    
    {user? addNewUser(user, socket.id) : null}
    // addNewUser(user, socket.id);

    // console.log(onlineUsers[0].user.user._id);
    // console.log([...onlineUsers]);
    console.log("added nnew user");

  });

  socket.on("sendNotification", ({ senderId, receiverId, info, data }) => {
    const receiver = getUser(receiverId);

    // console.log(receiver)
    // console.log(senderId)
    // console.log(type)

    if (receiver) {
       io.to(receiver.socketId).emit("getNotification", {
      senderId,
      info,
      data,
    });

    }

   

  });

    

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("user disconnected");
  });
  
});


io.listen(3006);

