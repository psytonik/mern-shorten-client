
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardFooter,
	MDBCardHeader,
	MDBCardTitle,
	MDBCheckbox,
	MDBInput,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCardText,
	MDBTypography,
	MDBIcon
} from "mdb-react-ui-kit";
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
	const [checked,setChecked] = useState(false);
	const changeHandler = (event) => {
		setForm({...form, [event.target.name]: event.target.value})
	};
	useEffect(() => {
		clearErrors();
	}, [error,clearErrors]);

	const signUpHandler = async () => {
		try {
			if(form.password.length <8){
				return toast.error("Short password, Password must be minimum 8 characters at least");
			}
			const data = await request(`${process.env.REACT_APP_PUBLIC_LINK}/api/v1/auth/sign-up`,'POST', {...form});

			if(data.success === false){
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
			const data = await request(`${process.env.REACT_APP_PUBLIC_LINK}/api/v1/auth/sign-in`,'POST', {...form});

			if(data.success === false) {
				return toast.error(data.message)
			} else {
				await auth.login(data.token,data.userId);
				return toast.success(data.message);
			}
		} catch (e) {
			return toast.error(e.message);
		}
	}
	const handleChange = () => {
		setChecked(!checked);
	};

	return (
		<MDBContainer>
			<ToastContainer/>
			<MDBRow className="row text-center mt-5 d-flex align-items-center align-self-center">
				<MDBTypography tag='h1' colorText="info">
					Shorten <MDBIcon fas icon="brain"/>
				</MDBTypography>
				<MDBTypography tag='h4' colorText="secondary" className="pb-3">
					Make your URL short
				</MDBTypography>
				<MDBCol size="md" md='3' className="align-self-center">
					<MDBCard>
						<MDBCardBody>
							<MDBCardTitle>Sponsored by</MDBCardTitle>
							<MDBCardText>
								<a href="https://flbba.org/" target="_blank" rel="noopener noreferrer">
									<img src="https://himselected.com/sp4.gif" border="0"  alt="flbba.org"/>
								</a>
							</MDBCardText>

						</MDBCardBody>
					</MDBCard>
				</MDBCol>

				<MDBCol size="md" md='6'>
						<MDBCard className="shadow-5">
							<MDBCardHeader>
								<MDBCardTitle>Authorization</MDBCardTitle>
							</MDBCardHeader>
							<MDBCardBody>
									<div className="form-outline mb-3">
										<MDBInput
											name='email'
											id='email'
											type='email'
											label="Email"
											size='lg'
											value={form.email}
											onChange={changeHandler}
										/>
									</div>
									<div className="form-outline mb-3">
										<MDBInput
											name='password'
											id='password'
											type='password'
											label="Password"
											size='lg'
											minLength="8"
											value={form.password}
											onChange={changeHandler}
											className='form-control mb-3'
										/>
									</div>
								<div className="form-check d-flex justify-content-center mb-1">
									<MDBCheckbox
										value=""
										label="I have read and agree to the terms"
										defaultChecked={checked}
										onChange={handleChange}
									/>
								</div>
							</MDBCardBody>
							<MDBCardFooter>
								<div className="d-flex justify-content-evenly">
									<div>
										<MDBBtn
											color="info"
											rounded
											outline
											size='lg'
											onClick={signUpHandler}
											disabled={loading || checked === false || form.email === "" || form.password === ""}
										>
											Sign Up
										</MDBBtn>
									</div>
									<div>
										<MDBBtn
											outline
											rounded
											color='secondary'
											size='lg'
											disabled={loading || checked === false || form.email === "" || form.password === ""}
											onClick={signInHandler}
										> Sign In </MDBBtn>
									</div>
								</div>
							</MDBCardFooter>
						</MDBCard>
				</MDBCol>

				<MDBCol size="md" md='3' className="align-self-center">
					<MDBCard>
						<MDBCardBody>
							<MDBCardTitle>Sponsored by</MDBCardTitle>
							<MDBCardText>
								<a href="https://flbba.org/" target="_blank" rel="noopener noreferrer">
									<img src="https://himselected.com/sp4.gif" border="0"  alt="flbba.org"/>
								</a>
							</MDBCardText>

						</MDBCardBody>
					</MDBCard>
				</MDBCol>

			</MDBRow>
		</MDBContainer>
	)
}
