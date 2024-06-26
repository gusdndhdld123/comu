import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

function UserRegister() {
    const [form, setForm] = useState({
        userName: "",
        password: "",
        userEmail: "",
        userAge: ""
    });
    const navigate = useNavigate();
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('/users', form)
            .then(response => {
                console.log(response);
                alert('회원가입 되었습니다');
                navigate('/login');  // 로그인 페이지로 이동한다.
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h2>Register</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={form.userEmail} onChange={e => {
                            setForm({...form, userEmail: e.target.value})
                        } }></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={form.password} onChange={e =>{
                            setForm({...form, password: e.target.value})}}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>UserName</Form.Label>
                        <Form.Control type="text" value={form.userName} onChange={e =>{
                            setForm({...form, userName: e.target.value})}}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>UserAge</Form.Label>
                        <Form.Control type="text" value={form.userAge} onChange={e =>{
                            setForm({...form, userAge: e.target.value})}}>
                        </Form.Control>
                    </Form.Group>
                    <Button onClick={onSubmit}>Submit</Button>
                </Col>
            </Row>
        </Container>

    );
}

export default UserRegister;