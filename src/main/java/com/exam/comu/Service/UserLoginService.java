package com.exam.comu.Service;
import com.exam.comu.Entity.UserEntity;
import com.exam.comu.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Log
public class UserLoginService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String useremail) {

        Optional<UserEntity> optionalUser = userRepository.findByUserEmail(useremail);
        if (optionalUser.isPresent()) {

            log.info("가져온거@@@@@@@@@@@   "+optionalUser.get().getUserEmail());
            log.info("가져온거@@@@@@@@@@@   "+optionalUser.get().getPassword());

            return User.withUsername(optionalUser.get().getUserEmail())
                    .password(optionalUser.get().getPassword())
                    .build();
        }
        //일반회원 및 관리자에 존재하지 않으면 오류발생(Console)
        throw new UsernameNotFoundException("알 수 없는 아이디 : "+ useremail);
    }
}