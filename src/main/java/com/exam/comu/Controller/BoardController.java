package com.exam.comu.Controller;
import com.exam.comu.DTO.BoardDTO;
import com.exam.comu.Service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.hibernate.query.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/boards")
public class BoardController {
    private final BoardService boardService;

    // 등록
    @PostMapping
    public ResponseEntity<BoardDTO> createBoard(@RequestBody BoardDTO boardDTO) {
        return new ResponseEntity<>(boardService.register(boardDTO), HttpStatus.CREATED);
    }

    // 전체 조회
    @GetMapping
    public ResponseEntity<List<BoardDTO>> getAllBoards(Pageable pageable) {
        return new ResponseEntity<>(boardService.list(pageable), HttpStatus.OK);
    }

    // 개별 조회
    @GetMapping("/{id}")
    public ResponseEntity<BoardDTO> getBoardById(@PathVariable("id") Long id) {
        log.info(id + "개별조회 옴");
        return new ResponseEntity<>(boardService.read(id), HttpStatus.OK);
    }

    // 수정
    @PutMapping("/{id}")
    public ResponseEntity<BoardDTO> updateBoard(@RequestBody BoardDTO boardDTO, @PathVariable Long id) {
        boardDTO.setBoardIdx(id);
        return new ResponseEntity<>(boardService.update(boardDTO), HttpStatus.OK);
    }

    // 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long id) {
        boardService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}