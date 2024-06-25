package com.exam.comu.Controller;

import com.exam.comu.DTO.UserDTO;
import com.exam.comu.Service.UserService;
import lombok.RequiredArgsConstructor;

import org.hibernate.query.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.List;
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    // Constructor Injection
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 등록
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        Long id = userService.register(userDTO);
        UserDTO newUser = userService.read(id);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

//    // 전체 조회
//    @GetMapping
//    public ResponseEntity<Page<UserDTO>> getAllUsers(Pageable pageable) {
//        return new ResponseEntity<>(userService.list(pageable), HttpStatus.OK);
//    }

    // 개별 조회
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("id") Long id) {
        UserDTO user = userService.read(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    // 수정
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO, @PathVariable Long id) {
        userDTO.setUserIdx(id);
        userService.modify(userDTO);
        UserDTO updatedUser = userService.read(id);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    // 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO request) {
        UserDTO user = userService.loginUser(request.getUserEmail(), request.getPassword());
        return user != null ?
                new ResponseEntity<>(user, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}