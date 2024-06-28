import React, {useContext, useState} from 'react';
import {Button, Form, Container, Col} from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {UserContext} from "./UserProvider";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Write from "./Write";

const Register = () => {
    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const boardWriter = user.userEmail;

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('/boards', {boardTitle, boardWriter, boardContent});
            if (response.status === 201) {
                alert('등록되었습니다.');
                setBoardTitle('');
                setBoardContent('');
                navigate('/boards');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="justify-content-sm-center d-flex" style={{paddingTop : '3%'}}>
            <Col className="justify-content-md-center" style={{width:'80%'}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="d-flex align-items-center">
                        <Form.Label className="col-1">제목:</Form.Label>
                        <Form.Control value={boardTitle} onChange={e => setBoardTitle(e.target.value)} required />
                    </Form.Group>
                    <br></br>
                    <Form.Group className="d-flex align-items-start">
                        <Write
                            style={{height: '500px' , width:"100%"}}
                            value={boardContent}
                            onChange={setBoardContent}
                        />
                    </Form.Group>
                    <Form.Group style={{display:"none"}}>
                        <Form.Label>Writer</Form.Label>
                        <Form.Control readOnly type="text" value={boardWriter} />
                    </Form.Group>
                    <br></br>
                    <div className="d-flex justify-content-end" style={{paddingTop:"2%"}}>
                        <Button variant="primary" type="submit" style={{width:"100%"}}>Register</Button>
                    </div>
                </Form>
            </Col>
        </Container>
    )
}

export default Register;