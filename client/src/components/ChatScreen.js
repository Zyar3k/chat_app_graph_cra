import { useMutation, useQuery } from "@apollo/client";
import {
  AppBar,
  Avatar,
  Box,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_MSG } from "../graphql/queries";
import MessageCard from "./MessageCard";
import SendIcon from "@mui/icons-material/Send";
import { SEND_MSG } from "../graphql/mutations";

const ChatScreen = () => {
  const { id, name } = useParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { data, loading, error } = useQuery(GET_MSG, {
    variables: {
      receiverId: +id,
    },
    onCompleted(data) {
      setMessages(data.messagesByUser);
    },
  });

  const [sendMessage] = useMutation(SEND_MSG, {
    onCompleted(data) {
      setMessages((prevMessages) => [...prevMessages, data.createMessage]);
    },
  });

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
        {loading ? (
          <Typography variant="h6">Loading messages...</Typography>
        ) : (
          messages.map((msg, index) => (
            <MessageCard
              key={index}
              text={msg.text}
              date={msg.createdAt}
              direction={msg.receiverId == +id ? "end" : "true"}
            />
          ))
        )}
      </Box>
      <Stack direction="row">
        <TextField
          placeholder="Type a message"
          variant="standard"
          fullWidth
          multiline
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SendIcon
          fontSize="large"
          onClick={() => {
            sendMessage({ variables: { text, receiverId: +id } });
          }}
        />
      </Stack>
    </Box>
  );
};

export default ChatScreen;
