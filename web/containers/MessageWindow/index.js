import React from "react";
import MessagePage from "../../components/MessagePage";
import Header from "../../components/Header";

import setStateAction from "../../actions/actionStage";
import {connect} from "react-redux";
import setUserAction from "../../actions/actionUser";

class MessageWindow extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Header/>
                <MessagePage setStage={this.props.setStateFunction} setUser={this.props.setUserFunction}/>
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

function mapDispatchToProps(dispatch) {
    return {
        setStateFunction: stage => {
            dispatch(setStateAction(stage))
        },
        setUserFunction: user => {
            dispatch(setUserAction(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageWindow);