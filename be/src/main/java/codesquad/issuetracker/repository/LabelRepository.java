package codesquad.issuetracker.repository;

import codesquad.issuetracker.domain.Label;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LabelRepository extends JpaRepository<Label, Long> {

}
