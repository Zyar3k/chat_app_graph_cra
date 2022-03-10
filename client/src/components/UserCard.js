import React from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user: { firstName, lastName, id } }) => {
  const navigate = useNavigate();

  return (
    <Stack
      className="userCard"
      direction="row"
      spacing={2}
      sx={{ py: 1 }}
      onClick={() => navigate(`/${id}/${firstName} ${lastName}`)}
    >
      <Avatar
        src={`https://avatars.dicebear.com/api/initials/${firstName} ${lastName}.svg`}
        sx={{ width: "32px", height: "32px" }}
      />
      <Typography variant="subtitle2">
        {firstName} {lastName}
      </Typography>
    </Stack>
  );
};

export default UserCard;
// https://avatars.dicebear.com/api/:sprites/:seed.svg
