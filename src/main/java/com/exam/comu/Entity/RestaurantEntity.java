package com.exam.comu.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.Instant;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "restaurant")
public class RestaurantEntity {
    @Id
    @NotNull
    @Column(name = "restaurantIdx", nullable = false)
    private Integer restaurantIdx;

    @Lob
    @Column(name = "`개방서비스명`")
    private String 개방서비스명;

    @Lob
    @Column(name = "`개방서비스아이디`")
    private String 개방서비스아이디;

    @Column(name = "`개방자치단체코드`")
    private Integer 개방자치단체코드;

    @Lob
    @Column(name = "`관리번호`")
    private String 관리번호;

    @Lob
    @Column(name = "`인허가일자`")
    private String 인허가일자;

    @Lob
    @Column(name = "`인허가취소일자`")
    private String 인허가취소일자;

    @Column(name = "`영업상태구분코드`")
    private Integer 영업상태구분코드;

    @Lob
    @Column(name = "`영업상태명`")
    private String 영업상태명;

    @Column(name = "`상세영업상태코드`")
    private Integer 상세영업상태코드;

    @Lob
    @Column(name = "`상세영업상태명`")
    private String 상세영업상태명;

    @Lob
    @Column(name = "`폐업일자`")
    private String 폐업일자;

    @Lob
    @Column(name = "`휴업시작일자`")
    private String 휴업시작일자;

    @Lob
    @Column(name = "`휴업종료일자`")
    private String 휴업종료일자;

    @Lob
    @Column(name = "`재개업일자`")
    private String 재개업일자;

    @Lob
    @Column(name = "`소재지전화`")
    private String 소재지전화;

    @Lob
    @Column(name = "`소재지면적`")
    private String 소재지면적;

    @Lob
    @Column(name = "`소재지우편번호`")
    private String 소재지우편번호;

    @Lob
    @Column(name = "`소재지전체주소`")
    private String 소재지전체주소;

    @Lob
    @Column(name = "`도로명전체주소`")
    private String 도로명전체주소;

    @Lob
    @Column(name = "`도로명우편번호`")
    private String 도로명우편번호;

    @Lob
    @Column(name = "`사업장명`")
    private String 사업장명;

    @Lob
    @Column(name = "`최종수정시점`")
    private String 최종수정시점;

    @Lob
    @Column(name = "`데이터갱신구분`")
    private String 데이터갱신구분;

    @Lob
    @Column(name = "`데이터갱신일자`")
    private String 데이터갱신일자;

    @Lob
    @Column(name = "`업태구분명`")
    private String 업태구분명;

    @Lob
    @Column(name = "`좌표정보(x)`")
    private String X;

    @Lob
    @Column(name = "`좌표정보(y)`")
    private String Y;

    @Lob
    @Column(name = "`위생업태명`")
    private String 위생업태명;

    @Column(name = "`남성종사자수`")
    private Integer 남성종사자수;

    @Column(name = "`여성종사자수`")
    private Integer 여성종사자수;

    @Lob
    @Column(name = "`영업장주변구분명`")
    private String 영업장주변구분명;

    @Lob
    @Column(name = "`등급구분명`")
    private String 등급구분명;

    @Lob
    @Column(name = "`급수시설구분명`")
    private String 급수시설구분명;

    @Column(name = "`총직원수`")
    private Integer 총직원수;

    @Column(name = "`본사직원수`")
    private Integer 본사직원수;

    @Column(name = "`공장사무직직원수`")
    private Integer 공장사무직직원수;

    @Column(name = "`공장판매직직원수`")
    private Integer 공장판매직직원수;

    @Column(name = "`공장생산직직원수`")
    private Integer 공장생산직직원수;

    @Lob
    @Column(name = "`건물소유구분명`")
    private String 건물소유구분명;

    @Column(name = "`보증액`")
    private Integer 보증액;

    @Column(name = "`월세액`")
    private Integer 월세액;

    @Lob
    @Column(name = "`다중이용업소여부`")
    private String 다중이용업소여부;

    @Column(name = "`시설총규모`")
    private Double 시설총규모;

    @Lob
    @Column(name = "`전통업소지정번호`")
    private String 전통업소지정번호;

    @Lob
    @Column(name = "`전통업소주된음식`")
    private String 전통업소주된음식;

    @Lob
    @Column(name = "`홈페이지`")
    private String 홈페이지;

    @Column(name = "mod_date")
    private Instant modDate;

    @Column(name = "reg_date")
    private Instant regDate;

}