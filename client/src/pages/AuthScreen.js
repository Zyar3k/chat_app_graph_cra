import React, { useState } from "react";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";

const AuthScreen = () => {
  const [formData, setFormData] = useState({});

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Stack direction="column" spacing={2} sx={{ width: "400px" }}>
        <Typography variant="h5">Please signup</Typography>
        <TextField
          name="firstName"
          label="First name"
          variant="standard"
          onChange={handleOnChange}
        />
        <TextField
          name="lastName"
          label="Last name"
          variant="standard"
          onChange={handleOnChange}
        />
        <TextField
          type="email"
          name="email"
          label="Email"
          variant="standard"
          onChange={handleOnChange}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          variant="standard"
          onChange={handleOnChange}
        />
        <Button type="submit" variant="outlined" color="primary">
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default AuthScreen;
