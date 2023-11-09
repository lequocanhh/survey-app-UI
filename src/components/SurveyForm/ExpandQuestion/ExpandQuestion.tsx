import classNames from "classnames/bind";
import styles from "./ExpandQuestion.module.scss";

import { AccordionDetails, Button } from "@mui/material";
import { Question } from "../../../types/survey";
import Option from "../Option/Option";
import ToolBar from "../ToolBar/ToolBar";

const cx = classNames.bind(styles);

type Props = {
  indexQuestion: number;
  question: Question;
  questions: Question[];
  setQuestion: React.Dispatch<React.SetStateAction<Question[]>>;
};

const ExpandQuestion = ({
  indexQuestion,
  question,
  questions,
  setQuestion,
}: Props) => {
  const handleChangeQuestion = (title: string) => {
    const newQuestion = [...questions];
    newQuestion[indexQuestion].title = title;
    setQuestion(newQuestion);
  };

  const handleAddOption = () => {
    const newOptionOfQuestion = [...questions];
    if (newOptionOfQuestion[indexQuestion].options.length < 5) {
      newOptionOfQuestion[indexQuestion].options.push({
        title: `Option ${
          newOptionOfQuestion[indexQuestion].options.length + 1
        }`,
        selected: false,
      });
      setQuestion(newOptionOfQuestion);
    } else {
      console.log("Max 5 options");
    }
  };

  return (
    <AccordionDetails className={cx("add-question")}>
      <div className={cx("add-question-top")}>
        <input
          onChange={(e) => handleChangeQuestion(e.target.value)}
          type="text"
          className={cx("question")}
          placeholder="Question"
          value={question.title}
        />
      </div>

      {question.options.map((option, j) => (
        <Option
          option={option}
          indexOption={j}
          indexQuestion={indexQuestion}
          questions={questions}
          setQuestion={setQuestion}
        />
      ))}

      {question.options.length < 5 && (
        <div className="add-question-body">
          <Button
            onClick={handleAddOption}
            size="small"
            style={{
              textTransform: "none",
              color: "#4285f4",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            Add Option
          </Button>
        </div>
      )}

      <div className={cx("add-footer")}>
        <div className={cx("add-question-bottom-left")}>
          <Button
            size="small"
            sx={{
              textTransform: "none",
              color: "#4285f4",
              fontSize: "13px",
              fontWeight: "600",
            }}
          ></Button>
        </div>

        <div className={cx("add-question-bottom")}>
          <ToolBar
            question={question}
            questions={questions}
            setQuestion={setQuestion}
            indexQuestion={indexQuestion}
          />
        </div>
      </div>
    </AccordionDetails>
  );
};

export default ExpandQuestion;
