import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Card, CardBody, CardHeader, Container, Table} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import parse from "html-react-parser";
import KakaoMap from "./KakaoMap";

function RestaurantRead(){
    let { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();
    const [center, setCenter] = useState(null);


    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await axios.get(`/restaurants/${id}`);
                setRestaurant(response.data);
            } catch (error) {
                console.error(error);
                alert("Loading failed.")
            }
        };

        fetchRestaurant();
    }, [id]);


    return(
        <Container>
            {
                restaurant ? (
                    <div>
                        <Card>
                            <CardHeader><h2 style={{margin: '10px'}}>{restaurant.사업장명}</h2></CardHeader>
                            <CardBody>
                                <Table striped bordered hover>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <KakaoMap address={restaurant.도로명전체주소} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>사업장명</td>
                                        <td>{restaurant.사업장명}</td>
                                    </tr>
                                    {restaurant.업태구분명 && (
                                        <tr>
                                            <td>업종</td>
                                            <td>{restaurant.업태구분명}</td>
                                        </tr>
                                    )}
                                    {restaurant.소재지전체주소 && (
                                        <tr>
                                            <td>주소</td>
                                            <td>{restaurant.소재지전체주소}</td>
                                        </tr>
                                    )}
                                    {restaurant.도로명전체주소 && (
                                        <tr>
                                            <td>도로명주소</td>
                                            <td>{restaurant.도로명전체주소}</td>
                                        </tr>
                                    )}
                                    {(restaurant.도로명우편번호 &&
                                        <tr>
                                            <td>우편번호</td>
                                            <td>{restaurant.도로명우편번호}</td>
                                        </tr>
                                    )}
                                    {restaurant.등급구분명 &&
                                        (<tr>
                                            <td>위치 특징</td>
                                            <td>{restaurant.등급구분명}</td>
                                        </tr>)
                                    }
                                    {restaurant.소재지전화 && (
                                        <tr>
                                            <td>전화번호</td>
                                            <td>{restaurant.소재지전화}</td>
                                        </tr>
                                    )}

                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button variant="outline-primary" as={Link} to="/restaurant">뒤로 가기</Button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </Container>
    )
}

export default RestaurantRead;