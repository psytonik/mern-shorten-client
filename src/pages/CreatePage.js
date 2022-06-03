import {Box, Button, Container, TextField, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
import SendIcon from '@mui/icons-material/Send';


export const CreatePage = ()=> {
	const history = useHistory()
	const auth = useContext(AuthContext)
	const {request} = useHttp();
	const [link,setLink] = useState('');
	const [btn,setBtn] = useState(true);
	useEffect(()=>{
		if(link){
			setBtn(false)
		}
	},[link])
	const pressHandler = async (event) => {
			event.preventDefault();
			try{
				const {newLink} = await request(
					`${process.env.REACT_APP_PUBLIC_LINK}/api/v1/link/generate`,
					'POST',
					{from:link},
					{Authorization:`Bearer ${auth.token}`}
				);
				toast.success('Link Successfully added');
				if(newLink){
					history.push(`/detail/${newLink._id}`);
				}
			} catch (e) {
				setBtn(true);
				toast.error(e.message);
			}
	}
	return (
		<Container maxWidth="sm">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography variant="h4" component="h4">Short Link Generator</Typography>
				<Box component="form" onSubmit={pressHandler} noValidate sx={{ mt: 1 }}>
						<TextField
							id='link'
							label="Original Link"
							variant="outlined"
							value={link}
							required={true}
							margin="normal"
							fullWidth
							autoFocus
							onChange={e=>setLink(e.target.value)}
						/>
						<Button
							type="submit"
							variant="outlined"
							color="info"
							fullWidth
							disabled={btn}
							endIcon={<SendIcon />}
						>Generate</Button>
					</Box>
			<ToastContainer/>
			</Box>
		</Container>
	)
}
