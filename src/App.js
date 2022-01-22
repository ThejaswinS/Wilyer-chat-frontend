import React, { useState, useEffect } from "react";
import socketClient from "socket.io-client";
import "./App.css";
import { BiSend } from "react-icons/bi";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";
var socket = socketClient("https://wilyer-chat-backend.herokuapp.com");

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const room = "123";
  const [socketid, setSocketid] = useState();

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
      
    });
  });

  const connectToRoom = () => {
    setSocketid(socket.id);
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const sendMessage = async () => {
       if(message !== null && message !== " " && message !== "" )
       {
          let messageContent = {
            room: room,
            content: {
              uid: socketid,
              message: message,
            },
        }
        await socket.emit("send_message", messageContent);
        setMessageList([...messageList, messageContent.content]);
        setMessage("");
    };
  };

  
  return (
    <div className="App">
      {!loggedIn ? (
        <>
        <Accordion style={{ width:'100%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
            Accordion Demo
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className="logIn">
          <button onClick={(connectToRoom)}>Join chat</button>
        </div>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ width:'100%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
            Accordion Demo
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className="logIn">
          <button onClick={(connectToRoom)}>Join chat</button>
        </div>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ width:'100%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
            Accordion Demo
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className="logIn">
          <button onClick={(connectToRoom)}>Join chat</button>
        </div>
        </AccordionDetails>
      </Accordion>
        </>
      ) : (
        <>
        <div style={{overflowX: "hidden",display:"flex", flexDirection: "column"}} className="chatContainer">
          <div className="messages">
            {messageList.map((val, key) => {
              return (
                <div className="messageContainer" id={val.uid === socketid ? "second" : "first"}>
                  <div className="messageIndividual talk-bubble tri-right left-top" >
                    {val.message}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
          <div class="messageInputs">
            <div class="area"><textarea type="text" value={message} placeholder="Enter your message..." onChange={(e) => {setMessage(e.target.value);}}/></div>
            <div class="btn"><button onClick={sendMessage}><BiSend/></button></div>
        </div>
        
      </>
      )}
    </div>
  );
}

export default App;
