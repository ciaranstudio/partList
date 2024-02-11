import {
  Form,
  redirect,
  // useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { authProvider } from "../auth";
// import SignIn from "../sign-in/SignIn";

import * as React from "react";
// import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  Canvas,
  // useLoader
} from "@react-three/fiber";
// import Container from "@mui/material/Container";
import PmndrsVan from "../PmndrsVan";
import { OrbitControls } from "@react-three/drei";

export async function action({ request }) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  // Validate form inputs and return validation errors via useActionData()
  if (!email || !password) {
    return {
      error: "You must provide an credentials to log in",
    };
  }
  // Sign in and redirect to the proper destination if successful.
  try {
    await authProvider.signin(email, password).then(() => {
      // console.log("sign in attempted");
      // console.log("email:", email, " password: ", password);
    });
  } catch (error) {
    // Handle invalid username/password combinations
    // console.log("log in error from loginAction(): ", error);
  }
  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo || "/admin");
}

export async function loader() {
  if (authProvider.isAuthenticated) {
    return redirect("/admin");
  }
  return null;
}

const defaultTheme = createTheme();

function SignIn() {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/admin";

  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("email") != null;

  // let actionData = useActionData();

  // useEffect(() => {
  //   console.log(actionData);
  // }, [actionData]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item xs={3} sx={{ pb: 20 }}>
            <Canvas>
              <OrbitControls autoRotate />
              <ambientLight />
              <directionalLight intensity={3} />
              <PmndrsVan scale={0.5} position={[0, -2, 0]} />
            </Canvas>
            <Typography component="h1" variant="h5" textAlign={"center"}>
              Sign in
            </Typography>
            <Box
              // component="form"
              // onSubmit={handleSubmit}
              // noValidate
              sx={{ mt: 1 }}
            >
              <Form method="post" replace>
                <input type="hidden" name="redirectTo" value={from} />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  size="small"
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size="small"
                />
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="info"
                  sx={{ mt: 1, mb: 2 }}
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Logging in..." : "Login"}
                </Button>
                {/* <Typography> */}
                {/* {actionData && actionData.error ? (
                  <p style={{ color: "red" }}>{actionData.error}</p>
                ) : null} */}
                {/* </Typography> */}
              </Form>

              {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            </Box>
          </Grid>
        </Grid>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

export default function LoginPage() {
  document.body.style.backgroundColor = "rgb(235, 235, 235)";
  return <SignIn />;
}
