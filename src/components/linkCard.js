import {Button, Paper, Stack} from "@mui/material";

import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import {toast, ToastContainer} from "react-toastify";
import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";
import EditLinkModal from "./editLinkModal.js";
import Loader from "./loader.js";

const LinkCard = ({link}) => {
	const {request, loading} = useHttp();
	const {userId, token} = useContext(AuthContext);
	const history = useHistory()
	const [open, setOpen] = useState(false);
	const [dataLink, setDataLink] = useState(null);

	const deleteHandler = async () => {

		if (window.confirm("Do you really want to delete this link?")) {
			if (userId === link.owner) {

				const data = await request(
					`${process.env.REACT_APP_PUBLIC_LINK}/api/v1/link/${link._id}`,
					'DELETE',
					null,
					{Authorization: `Bearer ${token}`}
				);

				toast.success(data.message)

				if (data.success === true) {
					history.push('/links');
				} else {
					toast.error(data.message)
				}
			}
		}
	};

	useEffect(() => {
		setDataLink(link);
	}, [link]);

	if (loading) {
		return <Loader/>
	}
	return dataLink !== null && (
		<Paper
			sx={{
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				height: 270,
			}}
			elevation={3}
		>

			<p>Date of creation: <strong>{new Date(link.createdAt).toLocaleDateString()}</strong></p>
			<p>ShortLink: <a
				href={link.to}
				target="_blank" rel="noopener noreferrer"
			>
				{link.to}
			</a>
			</p>
			<p>Original Link: <a href={link.from} target="_blank"
			                     rel="noopener noreferrer">{link.from.substring(0, 25)}...</a></p>
			<p>Total Clicks: <strong>{link.clicks}</strong></p>
			<Stack
				sx={{pt: 1}}
				direction="row"
				spacing={2}
				justifyContent="space-evenly"
			>
				<EditLinkModal open={open} setOpen={setOpen} link={link} setLinkData={setDataLink}/>
				<Button
					variant="outlined"
					color="error"
					onClick={deleteHandler}
				>Delete</Button>
			</Stack>
			<ToastContainer/>
		</Paper>
	)
}

export default LinkCard;
