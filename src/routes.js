import React from "react";
import {Switch,Route, Redirect} from 'react-router-dom';
import Error404 from "./pages/404.js";
import {AuthPage} from "./pages/AuthPage.js";
import {CreatePage} from "./pages/CreatePage.js";
import {DetailPage} from "./pages/DetailPage.js";
import {LinksPage} from "./pages/LinksPage.js";

export const useRoutes = isAuth => {
	if(isAuth){
		return(
			<Switch>
				<Route path="/links" exact component={LinksPage}/>
				<Route path="/create" exact component={CreatePage}/>
				<Route path="/detail/:id" component={DetailPage}/>
				<Redirect  to="/create"/>
				<Route path="*" component={Error404}/>
			</Switch>
		)
	}
	return (
		<Switch>
			<Route path="/" exact component={AuthPage}/>
			<Redirect  to="/"/>
			<Route path="*" component={Error404}/>
		</Switch>
	)
}
