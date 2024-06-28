package com.exam.comu.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RestaurantDTO {
    private int restaurantIdx;


    private String 개방서비스명;


    private String 개방서비스아이디;


    private Integer 개방자치단체코드;


    private String 관리번호;


    private String 인허가일자;


    private String 인허가취소일자;


    private Integer 영업상태구분코드;


    private String 영업상태명;


    private Integer 상세영업상태코드;


    private String 상세영업상태명;


    private String 폐업일자;


    private String 휴업시작일자;


    private String 휴업종료일자;


    private String 재개업일자;


    private String 소재지전화;


    private String 소재지면적;


    private String 소재지우편번호;


    private String 소재지전체주소;


    private String 도로명전체주소;


    private String 도로명우편번호;


    private String 사업장명;


    private String 최종수정시점;


    private String 데이터갱신구분;


    private String 데이터갱신일자;


    private String 업태구분명;


    private String X;


    private String Y;


    private String 위생업태명;


    private Integer 남성종사자수;


    private Integer 여성종사자수;


    private String 영업장주변구분명;


    private String 등급구분명;


    private String 급수시설구분명;


    private Integer 총직원수;


    private Integer 본사직원수;


    private Integer 공장사무직직원수;


    private Integer 공장판매직직원수;


    private Integer 공장생산직직원수;


    private String 건물소유구분명;


    private Integer 보증액;


    private Integer 월세액;


    private String 다중이용업소여부;


    private Double 시설총규모;


    private String 전통업소지정번호;


    private String 전통업소주된음식;

    private String 홈페이지;

}
