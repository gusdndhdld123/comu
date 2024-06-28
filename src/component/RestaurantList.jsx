import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import Pagination from "react-js-pagination";
import LoadingPopup from './LoadingPopup';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(`/restaurants?page=${activePage - 1}&size=10`);
                setRestaurants(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchRestaurants();
    }, [activePage]);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    }

    return (
        <Container>
            <h2>음식점 목록</h2>
            {isLoading ? <LoadingPopup /> : null }
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>음식점명</th>
                    <th>지역</th>
                    <th>종류</th>
                </tr>
                </thead>
                <tbody>
                {restaurants.map(restaurant => {
                    return (
                        <tr key={restaurant.restaurantIdx}>
                            <td className="col-7">
                                <Link to={`/restaurant/read/${restaurant.restaurantIdx}`}>
                                    {restaurant.사업장명}
                                </Link>
                            </td>
                            <td className="col-3">
                                {restaurant.소재지전체주소.split(" ")[0]}
                            </td>
                            <td className="col-2">
                                {restaurant.업태구분명}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                    style={{margin:"auto"}}
                />
            </div>
        </Container>

    );
};

export default RestaurantList;