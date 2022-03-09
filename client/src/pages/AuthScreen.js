import React, { useRef, useState } from "react";
import { Box, Card, Stack, Typography, Button, TextField } from "@mui/material";

const AuthScreen = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({});
  const authForm = useRef({});

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
      <Card variant="outlined" sx={{ padding: "10px" }}>
        <Stack direction="column" spacing={2} sx={{ width: "400px" }}>
          <Typography variant="h5">
            Please {showLogin ? "Login" : "Signup"}
          </Typography>
          {showLogin && (
            <>
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
            </>
          )}
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
          <Typography
            variant="subtitle1"
            textAlign="center"
            onClick={() => {
              setShowLogin(!showLogin);
              setFormData({});
              authForm.current.reset();
            }}
          >
            {showLogin ? "Signup?" : "Login?"}
          </Typography>
          <Button type="submit" variant="outlined" color="primary">
            Please {showLogin ? "Login" : "Signup"}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default AuthScreen;
