import {MDBInput, MDBRow, MDBBtn, MDBCol} from "mdb-react-ui-kit";
import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';


export const CreatePage = ()=> {
	const history = useHistory()
	const auth = useContext(AuthContext)
	const {request} = useHttp();
	const [link,setLink] = useState('');
	const [btn,setBtn] = useState(true);
	useEffect(()=>{
		console.log(link);
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
		<MDBRow>
			<MDBCol>
				<MDBRow className="col-8 offset-2 pt-2">
					<h1 className="text-center">Short Link Generator</h1>
					<MDBRow>
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
								color='info'
								size='lg'
								disabled={btn}
								onClick={pressHandler}
							>Generate</MDBBtn>
					</MDBRow>
					<ToastContainer/>
				</MDBRow>
			</MDBCol>
		</MDBRow>
	)
}
