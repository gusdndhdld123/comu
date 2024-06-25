import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider';
import { Button, Form, Container, Row, Col } from 'react-bootstrap'; // import necessary components from react-bootstrap

function Login() {
    const { setUser } = useContext(UserContext);
    const [form, setForm] = useState({
        userEmail: "",
        password: "",
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
        axios.post('/users/login', form)
            .then(response => {
                console.log(response);
                alert('User logged in successfully');
                setUser(response.data.username);
                navigate('/');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h2>Login</h2>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={form.userEmail} placeholder="Enter email" onChange={e => {
                                setForm({...form, userEmail: e.target.value})
                            }} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={form.password} placeholder="Password" onChange={e => {
                                setForm({...form, password: e.target.value})
                            }} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <Link to="/register">Register</Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;