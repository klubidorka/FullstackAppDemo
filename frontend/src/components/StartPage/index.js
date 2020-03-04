import React from 'react';

import { connect } from "react-redux";
import LoginWindow from '../../containers/LoginWindow';
import setStateAction from "../../actions/actionStage";
import setUserAction from "../../actions/actionUser";

class StartPage extends React.Component {

    render() {
        return (
            <div>
                <LoginWindow setStage={this.props.setStateFunction} setUser={this.props.setUserFunction}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.startStageInfo.user,
        stage: state.startStageInfo.stage
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

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);