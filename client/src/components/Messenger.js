import React from 'react'
import Message from './Message/Message'

import SendRoundedIcon from '@mui/icons-material/SendRounded';

import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

import { useEffect, useState,useRef } from "react";
import Conversation from './Conversation';
import OnlineTravellers from './OnlineTravellers';

import { io } from "socket.io-client";


const Messenger = ({socket, unOpenedMessages, setUnOpenedMessages}) => {

    const { user } = useSelector(
      (state) => state.auth
    )

    const { userDetails } = useSelector(
    (state) => state.user
  )

    const scrollRef = useRef();

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [friend, setFriend] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    
    
    // const [unOpened, setUnOpened] = useState(false);

    
    // const socket = useRef(io("ws://localhost:3006"));
    // const socket = useRef(io("ws://localhost:3006"));

    //------------socket.io--------------------------------------------

    useEffect(() => {
        socket.current.on("getMessage", (data) => {
            
            setArrivalMessage({
                sender: data.senderUserId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, [socket]);

    // console.log(arrivalMessage)

    useEffect(() => {
        arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);
    

    useEffect(() => {
        
        // socket?.on("welcome", (user) => {
        //   console.log(user);
        // })

        // socket.current.emit("newUser", user.user._id);

        socket.current.on("getUsers", (users) => {
        //   console.log(users);
            setOnlineUsers(users);
            setOnlineUsers(users.filter((u) => u.userId !== user.user._id)); // exclude self
            // setOnlineUsers(users.filter((u) => u.userId === userDetails.following)); // include only followers

            // console.log(userDetails.following)

            // setOnlineUsers(
            //     userDetails?.followers.filter((f) => users.some((u) => u.userId === f))
            // )
        })

        

    }, [user,socket,userDetails]);

    // console.log(onlineUsers)


    //--------------------------------

    useEffect(() => {
        const getConversations = async () => {
        try {
            const res = await axios.get("/conversation/" + user.user._id);
            setConversations(res.data);
            // console.log(res.data)
        } catch (err) {
            console.log(err);
        }
        };
        getConversations();
    }, [user._id]);



    useEffect(() => {
        const getMessages = async () => {
        try {
            const res = await axios.get("/message/" + currentChat?._id);
            setMessages(res.data);
        } catch (err) {
            console.log(err);
        }
        };
        getMessages();

        const friendId = currentChat?.members.find((member) => member !== user.user._id);
        const getFriend = async () => {
            try {
                const res = await axios("/post/" + friendId + "/getanyuser");
                setFriend(res.data);
                // console.log(res.data)
                
            } catch (err) {
                console.log(err);
            }
        };
        if (friendId){
            getFriend();
        }

    }, [currentChat]);

    const receiverUserId = currentChat?.members.find(
      (member) => member !== user.user._id
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user.user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        socket.current.emit("sendMessage", {
            senderUserId: user.user._id,
            receiverUserId,
            text: newMessage,
        });

        
        

        try {
            const res = await axios.post("/message", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    useEffect(() => {
        try {

        socket.current.on("getConversation", (data) => {
            // console.log(data.conversation)
            setConversations((prev) => [...prev, data.conversation]);
           
            setUnOpenedMessages((prev) => [...prev, data.conversation._id]);

            

        });
        
        } catch (error) {

            console.log(error)
        
        }
      
    }, [socket]);

    // console.log(unOpenedMessages)

   



  return (
    
    // chatmenu, chatbox, online friends

    <>
        <div class="flex flex-col w-full lg:flex-row">

            <div class="grid flex-grow bg-base-300 rounded-box place-items-center overflow-y-auto h-fit no-scrollbar relative chats">

                <div className="overflow-x-auto w-full h-[44rem] no-scrollbar">
                    <table className="table w-full">
                        {/* <!-- head --> */}
                        <thead className='sticky top-0 z-50'>
                        <tr>
                            {/* <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th> */}
                            <th>Chats</th>
                            
                        </tr>
                        {/* <tr className=' '>
                            <th colSpan="2" className='p-2'>
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </span>

                                    <input type="text" class="w-full py-2 pl-10 pr-4 input" placeholder="Search Chat"  />
                                </div>
                            </th>
                            
                        </tr> */}
                        
                         <hr class="my-3 border-gray-200 dark:border-gray-600 opacity-50" />


                        </thead>
                        
                        <tbody className=''>

                            

                            {conversations.map((conversation) => (
                                <tr className='cursor-pointer' onClick={() => {
                                    setCurrentChat(conversation)
                                    setUnOpenedMessages((prev) => prev.filter((id) => id !== conversation._id))

                                    
                                }

                                
                                }>
                                    <Conversation 
                                    conversation={conversation} 
                                    currentUser={user.user} 
                                    setConversations={setConversations} 
                                    conversations={conversations} 
                                    setCurrentChat={setCurrentChat} 
                                    socket={socket} 

                                    // unOpenedMessages={unOpenedMessages}
                                    // setUnOpenedMessages={setUnOpenedMessages}
                                    
                                    unOpened = {unOpenedMessages.includes(conversation._id)}
                                    

                                    
                                    />
                                </tr>
                                
                            ))}

                        </tbody>
                        
                        
                    </table>
                </div>
            
            </div> 

            <div class="divider lg:divider-horizontal"></div> 

            <div>
                <div class="p-3 bg-base-200 rounded-t-xl place-items-center lg:w-96 mr-4 lg:mr-0 overflow-y-auto h-[40rem] no-scrollbar messages relative ml-4">

                    {currentChat?
                    <>

                        <div className='sticky top-0'>
                            <a class="flex items-center px-4 py-2 transition-colors duration-200 transform rounded-md hover:ring bg-base-100">

                                <img class="object-cover mx-1 rounded-full h-6 w-6" src={friend && friend.profileImage != undefined && friend.profileImage.length>0 ? friend.profileImage[0] : require('../img/default.png')} alt="avatar"/>

                                <span class="mx-2 font-medium">@{friend?.username}</span>
                            </a>
                        </div>

                        <div className=''>
                            {messages.map((message) => (
                                <>
                                    <div ref={scrollRef}>
                                        <Message own={message.sender === user.user._id} message={message}/>
                                    </div>
                                    
                                    
                                </>

                            ))}
                            
                            
                        </div>



                    </> : (
                        

                        <article class="prose absolute top-1/3 text-center ml-5">
                            <p for="" class="mt-3 mb-3 tracking-wider prose-lg ml-3 opacity-60"><b>Open a chat to start messaging.</b></p>
                                
                        </article>
                    )}

                    
                    

                </div>
                
            
                <div class="form-control ml-4 bg-base-200 rounded-b-xl mr-4 lg:mr-0">
                
                    <label class="input-group p-3 ">
                        {currentChat?
                        <input type="text" placeholder="Aa" class="input input-bordered w-full" onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage} />:
                        <input type="text" placeholder="" class="input input-bordered w-full" disabled/>}
                        
                        {currentChat?
                        <button class="btn btn-square" onClick={handleSubmit}>
                            <SendRoundedIcon/>
                        </button>:null}
                    </label>
                </div>

                
            </div>
            
            

            <div class="divider lg:divider-horizontal"></div> 

            <div class="grid flex-grow bg-base-300 rounded-box place-items-center overflow-y-auto h-fit no-scrollbar relative online-friends">

                <div className="overflow-x-auto w-full h-[44rem] no-scrollbar">
                    <table className="table w-full">
                        {/* <!-- head --> */}
                        <thead className='sticky top-0 z-50'>
                        <tr>
                            
                            <th>Online Travellers</th>
                            
                        </tr>

                        <tr>
                            {/* <th className='p-2'>
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </span>

                                    <input type="text" class="w-full py-2 pl-10 pr-4 input" placeholder="Search Travellers"  />
                                </div>
                            </th> */}

                            <hr class="my-3 border-gray-200 dark:border-gray-600 opacity-50" />
                            
                        </tr>
                        </thead>
                        <tbody>
                            <OnlineTravellers 
                                onlineUsers={onlineUsers}
                                currentId={user.user._id}
                                setCurrentChat={setCurrentChat}
                                socket={socket}
                                conversations = {conversations}
                                setConversations = {setConversations}
                                
                            />
                        
                        </tbody>
                        
                        
                    </table>
                </div>
            
            </div> 

        </div>
    </>

    
  )
}

export default Messenger