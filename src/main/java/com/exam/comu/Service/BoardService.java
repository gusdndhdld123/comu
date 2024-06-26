package com.exam.comu.Service;

import com.exam.comu.DTO.BoardDTO;
import com.exam.comu.Entity.BoardEntity;
import com.exam.comu.Repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final ModelMapper modelMapper;

    //등록
    public BoardDTO register(BoardDTO boardDTO) {
        BoardEntity boardEntity = modelMapper.map(boardDTO, BoardEntity.class);
        BoardEntity saveEntity = boardRepository.save(boardEntity);

        return modelMapper.map(saveEntity, BoardDTO.class);
    }

    //전체조회

    public List<BoardDTO> list(Pageable pageable) {
        Page<BoardEntity> boardEntityPage = boardRepository.findAll(pageable);

        // Page 결과를 List<BoardEntity>로 변환
        List<BoardEntity> boardEntityList = boardEntityPage.getContent();

        return Arrays.asList(modelMapper.map(boardEntityList, BoardDTO[].class));
    }

    //개별조회
    public BoardDTO read(Long id) {
        Optional<BoardEntity> optionalBoard = boardRepository.findById(id);

        return modelMapper.map(optionalBoard, BoardDTO.class);

    }

    //수정
    public BoardDTO update(BoardDTO boardDTO) {
        Optional<BoardEntity> optionalBoard =
                boardRepository.findById(boardDTO.getBoardIdx());

        if(optionalBoard.isPresent()) {
            BoardEntity boardEntity = modelMapper.map(boardDTO, BoardEntity.class);
            boardRepository.save(boardEntity);

            return modelMapper.map(boardEntity, BoardDTO.class);
        }

        return null;
    }

    //삭제
    public void delete(Long boardIdx) {
        boardRepository.deleteById(boardIdx);
    }
}
