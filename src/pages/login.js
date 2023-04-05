import {useState} from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useRouter} from "next/router";

const theme = createTheme();

const Login = () => {

    const [loginForm, setLoginForm] = useState({email: '', password: ''})
    const [fieldErrors, setFieldErrors] = useState({})
    const [alert,setAlert]=useState({showAlert:false,alertSeverity:'',alertMessage:''})
    const router=useRouter()

    const handleRequiredFields = () => {
        const errors = {}
        if (!loginForm.email) {
            errors.email = 'Email is required'
        }
        if (!loginForm.password) {
            errors.password = 'Password is required'
        }
        setFieldErrors(errors)
        setAlert(prevState => ({...prevState,showAlert:false}))
        return Object.keys(errors).length === 0;

    }
    const handleChange = (e) => {
        setLoginForm(prevState => ({...prevState, [e.target.name]: e.target.value}))

    }
    const doSubmit = async () => {
        try {
            const response = await axios.post('api/auth/login', loginForm)
            router.push('/dashboard')

        } catch (error) {
            let serverError = {}
            switch (error.response.status) {
                case 401:
                    serverError = {alertSeverity:'warning',alertMessage:'check credentials'};
                    break;
                default:
                    serverError = {alertSeverity:'error',alertMessage:'server error'}
            }
            setAlert({...serverError,showAlert:true})
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (handleRequiredFields()) {
            await doSubmit()
        }


    }

    return (


        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={loginForm.email}
                            helperText={fieldErrors.email}
                            error={Boolean(fieldErrors.email)}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={loginForm.password}
                            helperText={fieldErrors.password}
                            error={Boolean(fieldErrors.password)}
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
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
                        </Grid>
                    </Box>
                </Box>
                {alert.showAlert?<Alert  severity={alert.alertSeverity}>{alert.alertMessage}</Alert> :null}
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>

    )

}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Login