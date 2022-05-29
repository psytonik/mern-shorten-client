import {MDBInput, MDBRow,MDBBtn} from "mdb-react-ui-kit";
import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';


export const CreatePage = ()=> {
	const history = useHistory()
	const auth = useContext(AuthContext)
	const {request,loading} = useHttp();
	const [link,setLink] = useState('');

	const pressHandler = async (event) => {
			event.preventDefault();
			try{
				const {newLink} = await request(
					`${process.env.REACT_APP_PUBLIC_LINK}/api/v1/link/generate`,
					'POST',
					{from:link},
					{Authorization:`Bearer ${auth.token}`}
				);
				console.log(loading);
				toast.success('Link Successfully added');
				if(newLink){
					history.push(`/detail/${newLink._id}`);
				}
			} catch (e) {
				toast.error(e.message);
			}
	}
	return (
		<MDBRow>
			<div className="col-8 offset-2 pt-2">
				<h1 className="text-center">Short Link Generator</h1>
				<MDBInput
					id='link'
					type='url'
					size='lg'
					value={link}
					onChange={e=>setLink(e.target.value)}

					label="Insert Your Link"
					/>
				<MDBBtn
					type="button"
					className='my-2'
					rounded
					color='info'
					size='lg'
					disabled={false}
					onClick={pressHandler}
				>Generate</MDBBtn>
				<ToastContainer/>
			</div>
		</MDBRow>
	)
}
