package com.exam.comu.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long boardIdx;
    private String boardTitle;
    @Column(columnDefinition="LONGTEXT")
    private String boardContent;
    private String boardWriter;
}
