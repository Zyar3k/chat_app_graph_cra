import React from "react";
import { Box, Typography, Divider, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import UserCard from "./UserCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../graphql/queries";

const Sidebar = ({ setLoggedIn }) => {
  const { loading, data, error } = useQuery(GET_ALL_USERS);

  if (loading) return <Typography variant="h6">Loading chats...</Typography>;
  if (data) console.log(data);
  if (error) console.error(error.message);

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
      {data.users.map((user, index) => {
        return <UserCard key={index} user={user} />;
      })}
    </Box>
  );
};

export default Sidebar;
