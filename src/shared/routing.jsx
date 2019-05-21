import React from "react";

import {Switch, Route} from "react-router-dom";

import LandingPage from "../components/landingPage/LandingPage";
import AddPost from "../components/addPost/AddPost";
import Forum from "../components/forum/Forum";
import Chat from "../components/chat/Chat";
import Profile from "../components/profile/Profile";
import ForoFor from "../components/main/forOFour/ForoFour";

const ContentRouting = ({user}) => {
    return (
        <Switch>
            <Route exact={true} path="/" render={() => <LandingPage user={user} />}/>
            <Route path="/home" render={() => <LandingPage user={user} />} />
            <Route path="/addPost" render={() => <AddPost user={user} />} />
            <Route path="/forum" render={() => <Forum user={user} />} />
            <Route path="/chat" render={() => <Chat user={user} />} />
            <Route path="/profile" render={() => <Profile user={user} />} />
            <Route path="**" component={ForoFor} />
        </Switch>
    );
};

export default ContentRouting;
