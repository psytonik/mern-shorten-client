import {Button, Card, CardContent, CardHeader, Typography} from "@mui/material";

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

		if (window.confirm("Do you really want to delete this link?")) {
			if(userId === link.owner){

				const data = await request(
					`${process.env.REACT_APP_PUBLIC_LINK}/api/v1/link/${link._id}`,
					'DELETE',
					null,
					{Authorization:`Bearer ${token}`}
				);

				toast.success(data.message)

				if(data.success === true){
					history.push('/links');
				} else {
					toast.error(data.message)
				}
			}
		}
	};

	return (
					<Card>
						<ToastContainer/>
						<CardHeader>
							<Typography>Link</Typography>
						</CardHeader>
						<CardContent>
							<p>Date of creation: <strong>{new Date(link.createdAt).toLocaleDateString()}</strong></p>
							<p>ShortLink: <a
								href={link.to}
								target="_blank" rel="noopener noreferrer"
							>
								{link.to}
							</a></p>
							<p>Original Link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from.substring(0,75)}...</a></p>
							<p>Total Clicks: <strong>{link.clicks}</strong></p>
							<Button
								variant="outlined"
								color="warning"
								onClick={deleteHandler}
								>Delete</Button>
						</CardContent>
					</Card>
	)
}

export default LinkCard;
