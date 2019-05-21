import React, {Component} from "react";
import "./styles/main.scss";

import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/main/header/Header";
import Footer from "./components/main/footer/Footer";
import ContentRouting from "./shared/routing";



class Programmerlingsliv extends Component {
    render() {

        return (
            <Router>
                <Header />
                <main>
                    <ContentRouting />
                </main>
                <Footer />
            </Router>
        );
    }
}


export default Programmerlingsliv;
