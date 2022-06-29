package codesquad.issuetracker.handler;

import codesquad.issuetracker.dto.ResponseMessage;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
@ResponseBody
public class DataProcessExceptionHandler {

    @ExceptionHandler(EmptyResultDataAccessException.class)
    public ResponseEntity<ResponseMessage> handleEmptyDataException() {
        ResponseMessage message = new ResponseMessage(HttpStatus.NOT_FOUND, "존재하지 않는 정보입니다.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ResponseMessage> handleIllegalStateException(IllegalStateException exception) {
        ResponseMessage message = new ResponseMessage(HttpStatus.NOT_FOUND, exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseMessage> handleValidationException(MethodArgumentNotValidException exception) {
        ResponseMessage message = new ResponseMessage(HttpStatus.BAD_REQUEST, exception.getBindingResult().getFieldError().getDefaultMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ResponseMessage> handleHttpMessageNotReadableException() {
        ResponseMessage message = new ResponseMessage(HttpStatus.BAD_REQUEST, "요청 바디 상 데이터 항목이 잘못된 형식으로 입력되었습니다.");
        return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }
}
