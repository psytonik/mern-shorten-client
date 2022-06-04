import BlurCircularSharpIcon from "@mui/icons-material/BlurCircularSharp.js";
import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	TextField,
	Typography
} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";

import {toast, ToastContainer} from "react-toastify";
import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";

export const AuthPage = () => {
	const auth = useContext(AuthContext)
	const {loading, request, error, clearErrors} = useHttp();
	const [form, setForm] = useState({
		email: '',
		password: ''
	});
	const [checked, setChecked] = useState(false);
	const changeHandler = (event) => {
		setForm({...form, [event.target.name]: event.target.value})
	};
	useEffect(() => {
		clearErrors();
	}, [error, clearErrors]);

	const signUpHandler = async () => {
		try {
			if (form.password.length < 8) {
				return toast.error("Short password, Password must be minimum 8 characters at least");
			}
			const data = await request(`${process.env.REACT_APP_PUBLIC_LINK}/api/v1/auth/sign-up`, 'POST', {...form});

			if (data.success === false) {
				return toast.error(data.message);
			} else {
				return toast.success(data.message);
			}
		} catch (e) {
			return toast.error("Registration Failed ", e.message);
		}
	}
	const signInHandler = async () => {
		try {
			const data = await request(`${process.env.REACT_APP_PUBLIC_LINK}/api/v1/auth/sign-in`, 'POST', {...form});

			if (data.success === false) {
				return toast.error(data.message)
			} else {
				await auth.login(data.token, data.userId);
				return toast.success(data.message);
			}
		} catch (e) {
			return toast.error(e.message);
		}
	}
	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography
					variant="h3"
					noWrap
					component="h3"
					sx={{
						display: {xs: 'flex', md: 'flex'},
						flexGrow: 1,
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.3rem',
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					Sh<BlurCircularSharpIcon sx={{fontSize:"3rem"}}/>rten
				</Typography>

				<Typography
					variant="h5"
					noWrap
					component="h5"
					sx={{
						display: {xs: 'flex', md: 'flex'},
						flexGrow: 1,
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.2rem',
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					Make your URL short
				</Typography>

				<Box component="form" noValidate sx={{mt: 1}}>

					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						type='email'
						value={form.email}
						onChange={changeHandler}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						size='lg'
						minLength="8"
						value={form.password}
						onChange={changeHandler}
						className='form-control mb-3'
					/>

					<FormControlLabel
						control={<Checkbox
							checked={checked}
							onChange={handleChange}
							inputProps={{ 'aria-label': 'controlled' }}
						/>}
						label="I have read and agree to the terms"
					/>

					<Button
						type="submit"
						color="info"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={loading || checked === false || form.email === "" || form.password === ""}
						onClick={signInHandler}
					> Sign In </Button>

					<Grid container justifyContent="flex-end">
						<Grid item>
							<Button
								html="#"
								variant="body2"
								onClick={signUpHandler}
								sx={{color:'#1976d2',cursor:'pointer'}}
								disabled={loading || checked === false || form.email === "" || form.password === ""}
							>
								{"Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</Box>

			</Box>

			<ToastContainer/>
		</Container>
	)
}
