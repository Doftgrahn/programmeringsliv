import React from "react";

import {Switch, Route} from "react-router-dom";

import LandingPage from "../components/landingPage/LandingPage";
import AddPost from "../components/addPost/AddPost";
import Forum from "../components/forum/Forum";
import Chat from "../components/chat/Chat";
import Profile from "../components/profile/Profile";
import ForoFor from "../components/main/forOFour/ForoFour";

const ContentRouting = () => {
    return (
        <Switch>
            <Route exact={true} path="/" component={LandingPage} />
            <Route path="/home" component={LandingPage} />
            <Route path="/addPost" component={AddPost} />
            <Route path="/forum" component={Forum} />
            <Route path="/chat" component={Chat} />
            <Route path="/profile" component={Profile} />
            <Route path="**" component={ForoFor} />
        </Switch>
    );
};

export default ContentRouting;
