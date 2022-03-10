import React from "react";
import { Box, Typography, Divider, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import UserCard from "./UserCard";

const Sidebar = ({ setLoggedIn }) => {
  const users = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Jane", lastName: "Doe" },
    { id: 3, firstName: "John", lastName: "Smith" },
  ];

  return (
    <Box backgroundColor="#f7f7f7" height="100vh" width="250px" padding="10px">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Chat</Typography>
        <LogoutIcon
          onClick={() => {
            localStorage.removeItem("jwt");
            setLoggedIn(false);
          }}
        />
      </Stack>
      <Divider />
      {users.map((user, index) => {
        return <UserCard key={index} user={user} />;
      })}
    </Box>
  );
};

export default Sidebar;
