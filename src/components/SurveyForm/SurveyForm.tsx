import classNames from "classnames/bind";
import styles from "./SurveyForm.module.scss";
import { Accordion, AccordionSummary, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { AddCircleOutline } from "@mui/icons-material";
import CloseQuestion from "./CloseQuestion/CloseQuestion";
import ExpandQuestion from "./ExpandQuestion/ExpandQuestion";

const cx = classNames.bind(styles);

type Options = {
  title: string;
  selected: boolean;
};

type Question = {
  title: string;
  options: Options[];
  required: boolean;
  open: boolean;
};

const SurveyForm = () => {
  const [questions, setQuestion] = useState<Question[]>([
    {
      title: "Question has no title",
      options: [{ title: "Option 1", selected: false }],
      required: true,
      open: true,
    },
  ]);

  const handleAddMoreQuestion = () => {
    expandCloseAll();
    const newQuestion: Question = {
      title: "Question ",
      options: [{ title: "option 1", selected: false }],
      open: true,
      required: false,
    };
    setQuestion([...questions, newQuestion]);
  };

  const expandCloseAll = () => {
    let closedQuestion = [...questions];
    for (let i = 0; i < closedQuestion.length; i++) {
      closedQuestion[i].open = false;
    }
    setQuestion(closedQuestion);
  };

  const handleExpand = (i: number) => {
    let expandQuestion = [...questions];
    for (let j = 0; j < expandQuestion.length; j++) {
      if (i === j) {
        expandQuestion[i].open = true;
      } else {
        expandQuestion[j].open = false;
      }
    }
    setQuestion(expandQuestion);
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const questionUI = () => {
    return questions.map((question, i) => {
      return (
        <Accordion
          key={i}
          expanded={true}
          className={cx({ add_border: question.open })}
          onChange={() => handleExpand(i)}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ width: "100%" }}
          >
            {!questions[i].open && (
              <CloseQuestion question={question} indexQuestion={i} />
            )}
          </AccordionSummary>
          {questions[i].open && (
            <div className={cx("question-boxes")}>
              <ExpandQuestion
                question={question}
                indexQuestion={i}
                questions={questions}
                setQuestion={setQuestion}
              />
            </div>
          )}
        </Accordion>
      );
    });
  };

  return (
    <div>
      <div className={cx("survey-form")}>
        <br />
        <div className={cx("section")}>
          <div className={cx("survey-title-section")}>
            <div className={cx("survey-form-top")}>
              <input
                className={cx("survey-form-title")}
                placeholder="Untitled document"
                type="text"
              />
              <input
                className={cx("survey-form-desc")}
                placeholder="Form description"
                type="text"
              />
            </div>
          </div>
          {questionUI()}
          <Button
            onClick={handleAddMoreQuestion}
            variant="contained"
            endIcon={<AddCircleOutline />}
            sx={{ marginTop: "10px" }}
          >
            Add Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
