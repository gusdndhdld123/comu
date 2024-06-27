package com.exam.comu.Repository;


import com.exam.comu.Entity.RestaurantEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends JpaRepository<RestaurantEntity,Integer> {
    Page<RestaurantEntity> findAll(Pageable pageable);
}
