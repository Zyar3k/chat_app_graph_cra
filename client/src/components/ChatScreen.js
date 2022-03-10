import { useQuery } from "@apollo/client";
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
import { GET_MSG } from "../graphql/queries";
import MessageCard from "./MessageCard";

const ChatScreen = () => {
  const { id, name } = useParams();
  const { data, loading, error } = useQuery(GET_MSG, {
    variables: {
      receiverId: +id,
    },
  });

  console.log(data);

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
          data.messagesByUser.map((msg, index) => (
            <MessageCard
              key={index}
              text={msg.text}
              date={msg.createdAt}
              direction={msg.receiverId == +id ? "end" : "true"}
            />
          ))
        )}
        {/* <MessageCard text="Hello World!" date="1212" direction="end" />
        <MessageCard text="Hello World!" date="1212" direction="end" /> */}
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
