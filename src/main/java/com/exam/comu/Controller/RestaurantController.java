package com.exam.comu.Controller;

import com.exam.comu.DTO.BoardDTO;
import com.exam.comu.DTO.RestaurantDTO;
import com.exam.comu.Service.RestaurantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/restaurants")
public class RestaurantController {
    private final RestaurantService restaurantService;
    // 전체 조회
    @GetMapping
    public ResponseEntity<List<RestaurantDTO>> getAllRestaurants(Pageable pageable) {
        return new ResponseEntity<>(restaurantService.list(pageable), HttpStatus.OK);
    }
}
