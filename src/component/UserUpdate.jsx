import React, {useState, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './UserProvider';
import {Button, Col, Container, Form, Row, Table, FormControl} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function UserUpdate(){
    const { user, setUser } = useContext(UserContext);
    const [updatedUser, setUpdatedUser] = useState({...user});
    const navigate = useNavigate();
    const handleChange = (e) => {
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put("/users", updatedUser);
            setUser(response.data);
            alert("수정되었습니다")
            navigate('/');
        } catch (error) {
            console.error(error);
            alert("수정 시 에러 발생")
        }
    };

    return(
        <Container className="justify-content-sm-center d-flex" style={{paddingTop : '10%'}}>
            <Row className="justify-content-md-center border" style={{width:'70%'}}>
                <Col md="auto">
                    <br></br>
                    <h2>내 정보</h2>
                    <br></br>
                    <Table>
                        <tbody>
                        <tr>
                            <td>Id(이메일) :</td>
                            <td><FormControl name="userEmail" onChange={handleChange} placeholder={user.userEmail} readOnly /></td>
                        </tr>
                        <tr>
                            <td>이름:</td>
                            <td>
                                <FormControl name="userName" onChange={handleChange} placeholder={user.userName} />
                            </td>
                        </tr>
                        <tr>
                            <td>나이:</td>
                            <td>
                                <FormControl name="userAge" onChange={handleChange} placeholder={user.userAge} />
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호:</td>
                            <td>
                                <FormControl name="password" onChange={handleChange} placeholder="password" />
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    <Button variant="primary" onClick={handleUpdate}>변경</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default UserUpdate;