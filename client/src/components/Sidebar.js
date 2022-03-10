import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import UserCard from "./UserCard";

const Sidebar = () => {
  const users = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Jane", lastName: "Doe" },
    { id: 3, firstName: "John", lastName: "Smith" },
  ];

  return (
    <Box backgroundColor="#f7f7f7" height="100vh" width="250px" padding="10px">
      <Typography variant="h6">Chat</Typography>
      <Divider />
      {users.map((user, index) => {
        return <UserCard key={index} user={user} />;
      })}
    </Box>
  );
};

export default Sidebar;
