import React from "react";

import {Switch, Route} from "react-router-dom";

import LandingPage from "../components/landingPage/LandingPage";
import Forum from "../components/forum/Forum";
import Chat from "../components/chat/Chat";
import Profile from "../components/profile/Profile";

const ContentRouting = () => {
    return (
        <Switch>
            <Route exact={true} path="/" component={LandingPage} />
            <Route path="/home" component={LandingPage} />
            <Route path="/forum" component={Forum} />
            <Route path="/chat" component={Chat} />
            <Route path="/profile" component={Profile} />
        </Switch>
    );
};

export default ContentRouting;
