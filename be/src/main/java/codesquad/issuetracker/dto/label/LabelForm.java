package codesquad.issuetracker.dto.label;

import com.fasterxml.jackson.annotation.JsonFormat;
import javax.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class LabelForm {

    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @NotBlank
    private String color;
    @JsonFormat(shape = JsonFormat.Shape.BOOLEAN)
    private boolean isDarkText;
}
