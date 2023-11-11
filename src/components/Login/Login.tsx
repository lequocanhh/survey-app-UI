import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/store';

const defaultTheme = createTheme();



const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, checkAdmin } = useAuthStore();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
})




const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
        ...formValue,
        [e.target.name]: e.target.value
    })
}

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/login", 
      JSON.stringify(formValue))
      if(response.data.status === 200){
        const {data: {data}} = response
        login(data);
        checkAdmin(data.is_admin)
        localStorage.setItem('token', data.token)
      }
    } catch (error) {
        console.log(error);
    }
  };
  
  useEffect(() => {
    if(isAuthenticated){
      navigate("/")
    }
  }, [isAuthenticated])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              value={formValue.email}
              onChange={handleChange}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              value={formValue.password}
              onChange={handleChange}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="forgotpassword">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/signup'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login