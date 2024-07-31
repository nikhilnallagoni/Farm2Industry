// import React from "react";
// import TextField from "@mui/material/TextField";
// import { Container, Typography } from "@mui/material";
// import Button from "@mui/material/Button";
// function RegisterPage() {
//   function handleSubmit(event) {
//     event.preventDefault();
//     alert("form submitted");
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <Container
//         style={{
//           // boxShadow: "3",
//           height: "300px",
//           width: "600px",
//           display: "flex",
//           justifyItems: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           border: "1px solid #bdbdbd",
//           justifyContent: "space-evenly",
//           backgroundColor: "#eeeeee",
//           marginTop: "100px",
//           borderRadius: "15px",
//         }}
//       >
//         <Typography variant="h4">Register!</Typography>
//         <TextField
//           id="email"
//           label="Email"
//           variant="outlined"
//           className="register-email"
//           style={{
//             width: "500px",
//           }}
//           type="email"
//         />
//         <TextField
//           id="password"
//           label="Password"
//           variant="outlined"
//           className="register-password"
//           type="password"
//           style={{
//             width: "500px",
//           }}
//         />
//         <Button type="submit" variant="contained">
//           Register
//         </Button>
//       </Container>
//     </form>
//   );
// }

// export default RegisterPage;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, NavLink } from "react-router-dom";
import { useState } from "react";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !password || !type) {
      alert("Please fill all the fields");
      return;
    }
    // console.log(name, email, password);
    const respose = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, type }),
      headers: { "Content-Type": "application/json" },
    });
    if (respose.status === 200) {
      alert(`registration successful`);
      setRedirect(true);
    } else {
      alert(`registration failed`);
    }
  };
  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className={`p-4 border border-gray-300 rounded-md w-full ${
                    type === "" ? "text-gray-500" : ""
                  } text-left`}
                >
                  <option value="" className="">
                    select type *
                  </option>
                  <option value="farmer">farmer</option>
                  <option value="industrialist">industrialist</option>
                </select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
