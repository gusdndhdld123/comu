import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Card, CardBody, CardHeader, Container, Table} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import parse from "html-react-parser";

const { kakao } = window
function KakaoMap({ address }) {
    useEffect(() => {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

        // 지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption);
    });

    return (
        <div id="map" style={{ width: "100%", height: "auto" }}>

        </div>
        )
}

export default KakaoMap;