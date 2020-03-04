import React from 'react';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import { connect } from "react-redux";
import { Button } from "react-bootstrap-buttons";
import { Redirect } from 'react-router-dom';

import setStateAction from "../../actions/actionStage";
import setUserAction from "../../actions/actionUser";

class LoginWindow extends React.Component {
    constructor(props) {
        super(props);
        this.toLogin = this.toLogin.bind(this);
        this.toRegister = this.toRegister.bind(this);
    }

    toLogin() {
        return this.props.setStage("login");
    }

    toRegister() {
        return this.props.setStage('register');
    }

    render() {
        switch(this.props.stage) {
            case 'start page':
                return (
                    <div align="center">
                        <Button onClick={this.toLogin} lg btnStyle="link">
                            <h1>
                                Login
                            </h1>
                        </Button>
                        <Button onClick={this.toRegister} lg btnStyle="link">
                            <h1>
                                Register
                            </h1>
                        </Button>
                    </div>
                );
            case 'login':
                return (
                    <div>
                        <LoginForm setStage={this.props.setStateFunction} setUser={this.props.setUserFunction}/>
                    </div>
                );
            case 'register':
                return (
                    <div>
                        <RegisterForm setStage={this.props.setStateFunction} setUser={this.props.setUserFunction}/>
                    </div>
                );
            case 'messages':
                return (
                    <div>
                        <Redirect to="/messages" />
                    </div>
                );
            default:
                return null;
        }
    }
};

function mapStateToProps(state) {
    return {
        stage: state.startStageInfo.stage,
        user: state.startStageInfo.user
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginWindow);