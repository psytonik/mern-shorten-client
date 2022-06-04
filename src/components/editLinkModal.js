import {TextField} from "@mui/material";
import React, {useContext, useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";
import { ToastContainer, toast } from 'react-toastify';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	border: '1px solid #000',
	borderRadius:'10px',
	boxShadow: 24,
	p: 4,
};

const EditLinkModal = ({open,setOpen,link}) =>{
	const {request} = useHttp();
	const [linkCode,setLinkCode] = useState('');
	const handleClose = () => setOpen(false);
	const {token} = useContext(AuthContext);
	const handleOpen = async() => {
		setOpen(true);
		const {code} = await request(
			`${process.env.REACT_APP_PUBLIC_LINK}/api/v1/link/${link._id}`,
			'GET',
			null,
			{Authorization: `Bearer ${token}`}
		);
		if(code){
			setLinkCode(code)
		}
	};
	const handleChange = (event) => {
		setLinkCode(event.currentTarget.value);
	}
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = await request(
			`${process.env.REACT_APP_PUBLIC_LINK}/api/v1/link/${link._id}`,
			'PUT',
			{code:linkCode},
			{Authorization: `Bearer ${token}`}
		);
		if (data.success === true) {
			toast.success("Link Changed")
			return handleClose();
		}else {
			toast.error(data.message)
			return handleClose();
		}
 	}
	useEffect(() => {
		return link;
	}, [link]);


	return (
		<>
			<Button onClick={handleOpen} variant="outlined">Edit Link</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<TextField
						id="code"
						label="Link Code"
						name="code"
						autoComplete="code"
						autoFocus
						type='text'
						fullWidth
						value={linkCode}
						onChange={handleChange}/>
					<Button
						type="submit"
						sx={{ mt: 3 }}
						onClick={handleSubmit}
						fullWidth>Save</Button>
				</Box>
			</Modal>
			<ToastContainer/>
		</>
	);
}
export default EditLinkModal;
