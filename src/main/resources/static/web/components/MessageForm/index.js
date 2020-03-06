import React from 'react';
import {Button} from 'react-bootstrap-buttons';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import axios from 'axios';

import { connect } from "react-redux";

import {
    FormGroup,
    Form,
    Input,
    Col,
    Label
} from "reactstrap";
import setStateAction from "../../actions/actionStage";

class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.status = "";
        this.state = {
            message: "",
            to_login: ""
        }
        this.Send = this.Send.bind(this);
        this.toMessage = this.toMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    toMessage() {
        this.props.setStage('messages');
    }

    Send(event) {
        axios.post("/api/send",
                    JSON.stringify({from_id: this.props.user.id, text: this.state.message, to_login: this.state.to_login}),
                    {headers: {'Content-Type': 'application/json'}})
        .then(response => {
            let data = response.data;
            if (data.result === 'OK') {
                this.status = "sented";
                this.props.setStage('messages');
            }
            else {
                this.status = data.result;
            }
            this.forceUpdate();
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
            <div>
                <h1 align="center">{this.status}</h1>
                <Form className="form" onSubmit={this.Send}>
                    <Col sm={10}>
                    <FormGroup>
                        <Label>Сообщение</Label>
                        <Input
                            height='100px'
                            type="textarea"
                            name="message"
                            style={{height: "50px"}}
                            value={this.state.message}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Логин получателя</Label>
                        <Input
                            height='100px'
                            type="text"
                            name="to_login"
                            style={{height: "50px"}}
                            value={this.state.to_login}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <Button btnStyle="info" type="submit" style={{align: "right"}}><h1>Отправить</h1></Button>
                    <Button btnStyle="info" onClick={this.toMessage}><h1>Назад</h1></Button>
                    </Col>
                </Form>
            </div>
        );
    }
}

class MessageForm extends React.Component {

    render() {
        return (
            <div>
                <Forms user={this.props.user} setStage={this.props.setStateFunction}/>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
