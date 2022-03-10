import {
  AppBar,
  Avatar,
  Box,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageCard from "./MessageCard";

const ChatScreen = () => {
  const { id, name } = useParams();

  const [messages, setMessages] = useState([]);

  const getAllMessages = async () => {
    fetch(`http://localhost:4000/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY0NjkyNTEzMiwiZXhwIjoxNjQ2OTI4NzMyfQ.Di3fexy0tXdmSHC3IDJKYttDFN_C_kyJKZ8oum04jNc",
      },
      body: JSON.stringify({
        query: `
          query MessagesByUser($receiverId: Int!) {
            messagesByUser(receiverId: $receiverId) {
              id
              text
              receiverId
              senderId
              createdAt
            }
          }
        `,
        variables: {
          receiverId: 2,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <Box flexGrow={1}>
      <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 0 }}>
        <Toolbar>
          <Avatar
            src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
            sx={{ width: "32px", height: "32px", mr: 2 }}
          />
          <Typography variant="h6" color="black">
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        backgroundColor="#f5f5f5"
        height="80vh"
        padding="10px"
        sx={{ overflowY: "auto" }}
      >
        <MessageCard text="Hello World!" date="1212" direction="end" />
        <MessageCard text="Hello World!" date="1212" direction="start" />
        <MessageCard text="Hello World!" date="1212" direction="end" />
      </Box>
      <TextField
        placeholder="Type a message"
        variant="standard"
        fullWidth
        multiline
        rows={2}
      />
    </Box>
  );
};

export default ChatScreen;
