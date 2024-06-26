package com.exam.comu.Service;

import com.exam.comu.DTO.UserDTO;
import com.exam.comu.Entity.UserEntity;
import com.exam.comu.Repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Log4j2
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    public Long register(UserDTO userDTO) {


        Optional<UserEntity> userEntity = userRepository
                .findByUserEmail(userDTO.getUserEmail());

        if (userEntity.isPresent()) {
            throw new IllegalStateException("이미 가입된 이메일입니다.");
        }

        String password = passwordEncoder.encode(userDTO.getPassword());

        UserEntity user = modelMapper.map(userDTO, UserEntity.class);

        user.setPassword(password);

        userRepository.save(user);

        return userRepository.save(user).getUserIdx();
    }

    public UserDTO modify(UserDTO userDTO) {
        Optional<UserEntity> userEntity = userRepository.findByUserEmail(userDTO.getUserEmail());

        if (userEntity.isPresent()) {
            UserEntity user = userEntity.get();
            user.setUserName(userDTO.getUserName());
            user.setUserAge(userDTO.getUserAge());

            if (userDTO.getPassword() != null) {
                String password = passwordEncoder.encode(userDTO.getPassword());
                user.setPassword(password);
            }

            userRepository.save(user);
        } else {
            log.info("유저 데이터 수정 실패");
        }
        return userDTO;
    }

    public UserDTO read(Long userIdx) {

        Optional<UserEntity> user = userRepository.findById(userIdx);


        return modelMapper.map(user, UserDTO.class);
    }


    public Page<UserDTO> list(Pageable pageable) {

        int currentPage = pageable.getPageNumber() - 1;
        int pageCnt = 5;
        Pageable page = PageRequest.of(currentPage, pageCnt, Sort.by(Sort.Direction.DESC, "userIdx"));

        Page<UserEntity> users = userRepository.findAll(page);


        Page<UserDTO> userDTOS = users.map(data -> modelMapper.map(data, UserDTO.class));

        return userDTOS;
    }


    public void delete(Long userIdx) {
        userRepository.deleteById(userIdx);
    }

    public UserDTO loginUser(String userEmail, String password) {
        Optional<UserEntity> existingUserEntity = userRepository.findByUserEmail(userEmail);

        if (existingUserEntity != null) {
            String existingPassword = existingUserEntity.get().getPassword();
            if (passwordEncoder.matches(password, existingPassword)) {
                // ModelMapper나 다른 메커니즘을 사용하여 UserEntity를 UserDTO에 맵핑합니다
                UserDTO userDTO = modelMapper.map(existingUserEntity, UserDTO.class);
                return userDTO;
            }
        }

        return null;
    }
}
