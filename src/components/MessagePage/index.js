import React from "react";

import {connect} from "react-redux";
import MessageForm from "../../components/MessageForm";
import axios from 'axios';
import { Button } from "reactstrap";
import setStateAction from "../../actions/actionStage";
import {Col, Row} from 'reactstrap';
import { Redirect } from "react-router-dom";


class MessagePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sented: [],
            received: [],
        };
        this.updateMessageList = this.updateMessageList.bind(this);
        this.toLogout = this.toLogout.bind(this);
        this.toSend = this.toSend.bind(this);
    }

    toSend() {
        return this.props.setStage('send');
    }

    toLogout() {
        this.props.setUser(null);
        this.props.setStage('logout');
    }

    updateMessageList(event) {
        axios
            .post("/api/listmsg", JSON.stringify({id: this.props.user.id}), {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                var data = response.data;
                this.setState({
                    sented: data.sented,
                    received: data.received
                })
                this.forceUpdate();
            });
        if (event !== null) {
            event.preventDefault();
        }
    }

    componentWillMount() {
        this.updateMessageList(null);
    }

    render() {
        if (this.props.stage === 'start page') {
            if (this.props.user === null)
                this.props.setStage('logout');
            else
                this.props.setStage('messages');
        }
        if (this.props.stage === 'messages') {
            return (
                <React.Fragment>
                    <Button onClick={this.toSend}>Новое сообщение</Button>
                    <Button onClick={this.updateMessageList}>Обновить список</Button>
                    <Button onClick={this.toLogout}>Выйти</Button>
                    <div>Отправленные</div>
                    <div>{this.state.sented.map((message) => {
                        return <Row><Col>получатель: {message.toLogin}</Col><Col>текст: {message.text}</Col></Row>
                    })}</div>
                    <div>Полученные</div>
                    <div>{this.state.received.map((message) => {
                        return <Row><Col>отправитель: {message.toLogin}</Col><Col>текст: {message.text}</Col></Row>
                    })}</div>
                </React.Fragment>
            );
        }
        if (this.props.stage === 'send') {
            return (
                <React.Fragment>
                    <MessageForm user={this.props.user} setState={this.props.setStateFunction}/>
                </React.Fragment>
            );
        }
        if (this.props.stage === 'logout') {
            this.props.setStage('start page');
            return (
                <Redirect to="/home" />
            )
        }
        return null;
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage);