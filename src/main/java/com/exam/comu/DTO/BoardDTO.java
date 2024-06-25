package com.exam.comu.DTO;

import lombok.*;

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
}
