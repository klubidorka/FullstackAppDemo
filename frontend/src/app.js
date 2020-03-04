import React from 'react';

import Start from './containers/StartPage';
import MessageWindow from './containers/MessageWindow';

import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {connect} from "react-redux";
import setStateAction from "./actions/actionStage";
import setUserAction from "./actions/actionUser";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Start} />
                    <Route exact path="/home" component={Start} />
                    <Route exact path="/messages" component={MessageWindow} />
                </Switch>
            </BrowserRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);