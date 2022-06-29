package codesquad.issuetracker.dto.milestone;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class MilestoneForm {

    @NotBlank
    private String subject;
    @NotBlank
    private String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate endDate;
}
