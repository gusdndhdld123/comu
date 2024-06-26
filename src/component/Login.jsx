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
                alert('로그인 되었습니다');
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <Container className="justify-content-sm-center d-flex" style={{paddingTop : '10%'}}>
            <Row className="justify-content-md-center border" style={{width:'60%'}}>
                <Col md="auto">
                    <h2>Login</h2>
                    <br></br>
                    <Form onSubmit={onSubmit} style={{width: '80%'}}>
                        <Form.Group controlId="formBasicEmail" className="d-flex align-items-center">
                            <Col xs="auto" className="my-1">
                                <Form.Label>ID: </Form.Label>

                            </Col>

                            <Col xs="auto" className="my-1" style={{paddingLeft : '15px'}}>
                                <Form.Control type="email" value={form.userEmail}
                                              placeholder="Enter email"
                                              onChange={e => setForm({...form, userEmail: e.target.value})}/>
                            </Col>
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="formBasicPassword" className="d-flex align-items-center">
                            <Col xs="auto" className="my-1">
                                <Form.Label>PW: </Form.Label>
                            </Col>
                            <Col xs="auto" className="my-1" style={{paddingLeft : '15px'}}>
                                <Form.Control type="password" value={form.password}
                                              placeholder="Password"
                                              onChange={e => setForm({...form, password: e.target.value})}/>
                            </Col>
                        </Form.Group>
                        <br></br>
                        <br></br>
                        <Button variant="primary" type="submit" style={{marginLeft : '35px'}}>
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