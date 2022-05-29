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
				<Route path="/links" exact>
					<LinksPage/>
				</Route>
				<Route path="/create" exact>
					<CreatePage/>
				</Route>
				<Route path="/detail/:id" >
					<DetailPage/>
				</Route>
				<Redirect  to="/create"/>
				<Route path="*">
					<Error404/>
				</Route>
			</Switch>
		)
	}
	return (
		<Switch>
			<Route path="/" exact>
				<AuthPage/>
			</Route>
			<Redirect  to="/"/>
		</Switch>
	)
}
