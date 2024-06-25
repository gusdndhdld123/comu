package com.exam.comu.DTO;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private Long userIdx;
    private String password;
    private String userName;
    private Long userAge;
    private String userEmail;
}
