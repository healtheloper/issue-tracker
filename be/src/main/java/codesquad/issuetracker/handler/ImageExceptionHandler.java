package codesquad.issuetracker.handler;

import codesquad.issuetracker.dto.ResponseMessage;
import codesquad.issuetracker.exception.ImageUploadException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
@ResponseBody
public class ImageExceptionHandler {

    @ExceptionHandler(ImageUploadException.class)
    public ResponseEntity<ResponseMessage> handleImageUploadException(ImageUploadException exception) {
        ResponseMessage message = new ResponseMessage(HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
    }

}
