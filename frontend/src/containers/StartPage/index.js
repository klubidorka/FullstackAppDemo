import React from "react";

import {connect} from "react-redux";

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StartPage from '../../components/StartPage';

class Start extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Footer/>
                <StartPage/>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.startStageInfo.user,
        stage: state.startStageInfo.stage,
    }
}

export default connect(mapStateToProps)(Start);