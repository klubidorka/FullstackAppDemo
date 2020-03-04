import React from 'react';
import {Button} from 'react-bootstrap-buttons';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';

import { connect } from "react-redux";
import axios from 'axios';

import setStateAction from "../../actions/actionStage";
import setUserAction from "../../actions/actionUser";

import {
    FormGroup,
    Form,
    Input,
    Col,
    Label
} from "reactstrap";

class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.register_responce = ""
        this.state = {
            login: "",
            password: ""
        }
        this.toMessage = this.toMessage.bind(this);
        this.toStart = this.toStart.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    toStart() {
        return this.props.setStage('start page');
    }

    toMessage(event) {
        axios.post("http://localhost:8080/auth/login", JSON.stringify(this.state), {headers: {'Content-Type': 'application/json'}})
        .then(response => {
            let data = response.data;
            if (data.result === 'OK') {
                this.props.setUser(data.user);
                this.props.setStage('messages');
            }
            else {
                this.register_responce = data.result
                this.forceUpdate();
            }
        });
        event.preventDefault();
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h1>Вход</h1>
                <h1>{this.register_responce}</h1>
                <Form className="form" onSubmit={this.toMessage}>
                    <Col>
                        <FormGroup>
                            <Label>Логин</Label>
                            <Input
                                type="text"
                                name="login"
                                value={this.state.login}
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Пароль</Label>
                            <Input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                    </Col>
                <Button btnStyle="secondary" onClick={this.toStart}><h1>Назад</h1></Button>
                <Button btnStyle="primary"  type="submit"><h1>Войти</h1></Button>
                </Form>
            </div>
        );
    }
}

class LoginForm extends React.Component {

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <div>
                    <Forms setStage={this.props.setStateFunction} setUser={this.props.setUserFunction}/>
                </div>
            </div>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
