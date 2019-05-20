import React from "react";
import "./styles/main.scss";

import {BrowserRouter as Router} from "react-router-dom";

import Header from "./components/main/header/Header";
import Footer from "./components/main/footer/Footer";
import ContentRouting from "./shared/routing";

const Programmerlingsliv = () => {
    return (
        <Router>
            <Header />
            <ContentRouting />
            <Footer />
        </Router>
    );
};

export default Programmerlingsliv;
