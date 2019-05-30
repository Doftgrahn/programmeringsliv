import React, {useState} from "react";

import {Switch, Route} from "react-router-dom";

import LandingPage from "../components/landingPage/LandingPage";
import AddPost from "../components/addPost/AddPost";
import Forum from "../components/forum/Forum";
import ChatDatabase from "../components/chat/ChatDatabase";
import Profile from "../components/profile/Profile";
import ForoFor from "../components/main/forOFour/ForoFour";

const ContentRouting = ({user, logIn}) => {
    const [routes] = useState([
        {exact: true, path: "/", component: LandingPage},
        {exact: false, path: "/home", component: LandingPage},
        {exact: false, path: "/addPost", component: AddPost},
        {exact: false, path: "/forum", component: Forum},
        {exact: false, path: "/chat", component: ChatDatabase},
        {exact: false, path: "/profile", component: Profile},
        {exact: false, path: "**", component: ForoFor}
    ]);

    const Routes = routes.map((route, index) => (
        <Route
            key={index}
            exact={route.exact}
            path={route.path}
            render={() => <route.component user={user} logIn={logIn} />}
        />
    ));

    return <Switch>{Routes}</Switch>;
};

export default ContentRouting;
