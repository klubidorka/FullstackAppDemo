import React from "react";
import {Button} from 'react-bootstrap-buttons';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';

import {
    FormGroup,
    Form,
    Input,
    Col,
    Label
} from "reactstrap";
import setStateAction from "../../actions/actionStage";
import setUserAction from "../../actions/actionUser";
import {connect} from "react-redux";
import axios from 'axios';

class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            login: "",
            password: ""
        };
        this.register_responce = ""
        this.toLogin = this.toLogin.bind(this);
        this.toStart = this.toStart.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    toStart() {
        this.props.setStage('start page');
    }

    toLogin(event) {
        axios.post("/auth/register", JSON.stringify(this.state), {headers: {'Content-Type': 'application/json'}})
        .then(response => {
            let data = response.data;
            if (data.result === 'OK') {
                this.props.setStage('login');
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
                <h1>Заполните форму для создания аккаунта</h1>
                <h1>{this.register_responce}</h1>
                <Form className="form" onSubmit={this.toLogin}>
                    <Col>
                        <FormGroup>
                            <Label>Почта</Label>
                            <Input
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                    </Col>
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
                <Button btnStyle="warning" type="submit"><h1>Зарегистрироваться</h1></Button>
                <Button btnStyle="secondary" onClick={this.toStart}><h1>Назад</h1></Button>
                </Form>
            </div>
        );
    }
}

class RegisterForm extends React.Component {
    render(){
        return(
            <div style={{textAlign: 'center'}}>
                <Forms setStage={this.props.setStateFunction} setUser={this.props.setUserFunction}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);