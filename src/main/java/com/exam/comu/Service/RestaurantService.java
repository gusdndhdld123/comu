package com.exam.comu.Service;

import com.exam.comu.DTO.BoardDTO;
import com.exam.comu.DTO.RestaurantDTO;
import com.exam.comu.Entity.BoardEntity;
import com.exam.comu.Entity.RestaurantEntity;
import com.exam.comu.Repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class RestaurantService {
    private final ModelMapper modelMapper;
    private final RestaurantRepository restaurantRepository;

    //전체조회

    public List<RestaurantDTO> list(Pageable pageable) {
        Page<RestaurantEntity> restaurantEntityPage = restaurantRepository.findAll(pageable);

        // Page 결과를 List<BoardEntity>로 변환
        List<RestaurantEntity> restaurantEntityList = restaurantEntityPage.getContent();

        return Arrays.asList(modelMapper.map(restaurantEntityList, RestaurantDTO[].class));
    }

    //개별조회
    public RestaurantDTO read(int id) {
        Optional<RestaurantEntity> optionalRestaurant = restaurantRepository.findById(id);
        log.info(id + "개별조회 서비스 감");
        return modelMapper.map(optionalRestaurant, RestaurantDTO.class);

    }
}
