import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from './UserProvider';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function UserInfo(){
    const { user } = useContext(UserContext);

    if(!user) return <p>Loading user information...</p>;

    return(
        <Container className="justify-content-sm-center d-flex" style={{paddingTop : '10%'}}>
            <Row className="justify-content-md-center border" style={{width:'60%'}}>
                <Col md="auto">
                    <br></br>
                    <h2>내 정보</h2>
                    <br></br>
                    <Table>
                        <tbody>
                        <tr>
                            <td>Id(이메일) :</td>
                            <td>{user.userEmail}</td>
                        </tr>
                        <tr>
                            <td>이름:</td>
                            <td>{user.userName}</td>
                        </tr>
                        <tr>
                            <td>나이:</td>
                            <td>{user.userAge}</td>
                        </tr>
                        </tbody>
                    </Table>
                    <Button variant="outline-primary" as={Link} to={"/userupdate"}>수정</Button>
                    <Button variant="danger">탈퇴</Button>
                </Col>
            </Row>
        </Container>
    )
}
export default UserInfo;