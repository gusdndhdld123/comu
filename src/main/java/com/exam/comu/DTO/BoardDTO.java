package com.exam.comu.DTO;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardDTO {
    private Long boardIdx;
    private String boardTitle;
    private String boardContent;
    private String boardWriter;
    private LocalDateTime regDate;
    private LocalDateTime modDate;
}
