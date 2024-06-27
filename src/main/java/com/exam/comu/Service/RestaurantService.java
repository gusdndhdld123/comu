package com.exam.comu.Service;

import com.exam.comu.DTO.BoardDTO;
import com.exam.comu.DTO.RestaurantDTO;
import com.exam.comu.Entity.BoardEntity;
import com.exam.comu.Entity.RestaurantEntity;
import com.exam.comu.Repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
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
}
