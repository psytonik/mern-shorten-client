import {Container, Grid} from "@mui/material";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams,Redirect} from 'react-router-dom';
import LinkCard from "../components/linkCard.js";
import LinkChart from "../components/linkChart.js";
import Loader from "../components/loader.js";

import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";

export const DetailPage = ()=> {
	const [link,setLink] = useState(null);
	const linkId = useParams().id;
	const {request,loading} = useHttp();
	const {token,userId} = useContext(AuthContext);

	const getLink = useCallback(async()=>{
		try{
			const data = await request(
				`${process.env.REACT_APP_PUBLIC_LINK}/api/v1/link/${linkId}`,
				"GET",
				null,
				{Authorization:`Bearer ${token}`}
			);
			setLink(data)
		}catch (e) {}
	},[token,linkId,request])

	useEffect(()=>{
		getLink().then(r=>r);
	},[getLink]);

	if(link && link.owner !== userId){
		return <Redirect to="/create" />
	}
	if(loading){
		return <Loader />
	}
	return (
		<Container  sx={{ mt: 4, mb: 4 }}>
			<Grid container spacing={2}>
				<Grid item md={4} xs={12}>
					{!loading && link && (<LinkCard link={link} />)}
				</Grid>
				<Grid item md={8} xs={12}>
					{!loading && link && (<LinkChart link={link}/>)}
				</Grid>
			</Grid>
		</Container>
	)
}
