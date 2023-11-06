import classNames from "classnames/bind";
import styles from "./SurveyForm.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  MenuItem,
  Radio,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AddCircleOutline } from "@mui/icons-material";
import CloseQuestion from "./CloseQuestion/CloseQuestion";
import Option from "./Option/Option";
import ToolBar from "./ToolBar/ToolBar";

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
      title: "this is question 1",
      options: [
        { title: "abc", selected: true },
        { title: "abc2", selected: false },
        { title: "abc3", selected: false },
        { title: "abc4", selected: false },
      ],
      required: true,
      open: true,
    },
  ]);

  const handleChangeQuestion = (title: string, index: number) => {
    const newQuestion = [...questions];
    newQuestion[index].title = title;
    setQuestion(newQuestion);
  };

  const handleAddOption = (indexQuestion: number) => {
    const newOptionOfQuestion = [...questions];
    if (newOptionOfQuestion[indexQuestion].options.length < 5) {
      newOptionOfQuestion[indexQuestion].options.push({
        title: `Option ${
          newOptionOfQuestion[indexQuestion].options.length + 1
        }`,
        selected: false,
      });
      setQuestion(newOptionOfQuestion);
      console.log(newOptionOfQuestion);
    } else {
      console.log("Max 5 options");
    }
  };


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
              <AccordionDetails className={cx("add-question")}>
                <div className={cx("add-question-top")}>
                  <input
                    onChange={(e) => handleChangeQuestion(e.target.value, i)}
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
                    indexQuestion={i}
                    questions={questions}
                    setQuestion={setQuestion}
                  />
                ))}

                {question.options.length < 5 && (
                  <div className="add-question-body">
                    <Button
                      onClick={() => handleAddOption(i)}
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
                    <ToolBar question={question} questions={questions} setQuestion={setQuestion} indexQuestion={i}/>
                  </div>
                </div>
              </AccordionDetails>
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
