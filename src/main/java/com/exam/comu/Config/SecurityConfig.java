package com.exam.comu.Config;

import com.exam.comu.Service.UserLoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserLoginService userLoginService() {
        return new UserLoginService();
    }


    @Bean
    public DaoAuthenticationProvider userProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userLoginService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }


    @Bean
    @Order(2)
    public SecurityFilterChain filterChain3(HttpSecurity http) throws Exception {
        //사용권한
        http.authorizeRequests()
                .requestMatchers("/**", "/css/**", "/js/**", "/img/**", "/images/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                .requestMatchers("/login", "/logout").permitAll()
                .requestMatchers("/member/**").hasAnyRole("USER");

        http.formLogin(login -> login
                .defaultSuccessUrl("/", true)
                .failureUrl("/member/login?error=true")
                .loginPage("/member/login")
                .usernameParameter("userid")
                .permitAll()
                .successHandler(new CustomLoginSuccessHandler()));


        http.csrf(AbstractHttpConfigurer::disable);

        http.logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/member/login"));

        http.authenticationProvider(userProvider());
        return http.build();
    }
}