import {MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle} from "mdb-react-ui-kit";
import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";

import {toast,ToastContainer} from "react-toastify";
import {useHistory} from "react-router-dom";

const LinkCard = ({link})=> {
	const {request} = useHttp();
	const {userId,token} = useContext(AuthContext);
	const history = useHistory()

	const deleteHandler = async () => {
		if(userId === link.owner){
			const data = await request(`${process.env.REACT_APP_PUBLIC_LINK}/api/v1/link/${link._id}`,'DELETE',null,{Authorization:`Bearer ${token}`});
			toast.success(data.message)
			if(data.success === true){
				history.push('/create');
			} else {
				toast.error(data.message)
			}
		}
	};

	return (
					<MDBCard className="shadow-5">
						<ToastContainer/>
						<MDBCardHeader>
							<MDBCardTitle className="text-center">Link</MDBCardTitle>
						</MDBCardHeader>
						<MDBCardBody>
							<p>Date of creation: <strong>{new Date(link.createdAt).toLocaleDateString()}</strong></p>
							<p>ShortLink: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
							<p>Original Link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
							<p>Total Clicks: <strong>{link.clicks}</strong></p>
							<button onClick={deleteHandler} className="btn btn-danger">Delete</button>
						</MDBCardBody>
					</MDBCard>
	)
}

export default LinkCard;
