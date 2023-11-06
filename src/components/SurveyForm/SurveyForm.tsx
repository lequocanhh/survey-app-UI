import classNames from "classnames/bind";
import styles from "./SurveyForm.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddCircleOutline, MoreVert } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const cx = classNames.bind(styles);

type Options = {
  title: string;
  selected: boolean;
};

type Question = {
  title: string;
  options: Options[];
  required: boolean;
  answered: boolean,
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
      answered: false,
      open: true,
    },
  ]);

  const handleChangeQuestion = (title: string, index: number) => {
    const newQuestion = [...questions];
    newQuestion[index].title = title;
    setQuestion(newQuestion);
    console.log(newQuestion);
  };

  const handleChangeOption = (
    title: string,
    indexQuestion: number,
    indexOption: number
  ) => {
    const newQuestionOption = [...questions];
    newQuestionOption[indexQuestion].options[indexOption].title = title;
    setQuestion(newQuestionOption);
  };

  const handleRemoveOption = (indexQuestion: number, indexOption: number) => {
    const removeOption = [...questions];
    if (removeOption[indexQuestion].options.length > 1) {
      removeOption[indexQuestion].options.splice(indexOption, 1);
      setQuestion(removeOption);
      console.log(removeOption);
    }
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

  const handleCopyQuestion = (indexQuestion: number) => {
    const copiedQuestion = [...questions];
    const newQuestion = { ...copiedQuestion[indexQuestion] };
    setQuestion([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (indexQuestion: number) => {
    const question = [...questions];
    if (questions.length > 1) {
      question.splice(indexQuestion, 1);
      setQuestion(question);
    }
  };

  const handleRequiredQuestion = (indexQuestion: number) => {
    const questionRequired = [...questions];
    questionRequired[indexQuestion].required = !questionRequired[indexQuestion].required;

    console.log(indexQuestion);

    setQuestion(questionRequired);
  };

  const handleAddMoreQuestion = () => {
    expandCloseAll()
    const newQuestion: Question = {
      title: "Question ",
      options: [{ title: "option 1", selected: false }],
      open: true,
      answered: false,
      required: false,
    };
    setQuestion([...questions, newQuestion]);
  };

  const handleChangeSelectedOption = (
    indexQuestion: number,
    indexOption: number
  ) => {
    setQuestion((prevQuestions) =>
      prevQuestions.map((question, questionIndex) => ({
        ...question,
        options:
          questionIndex === indexQuestion
            ? question.options.map((option, optionIndex) => ({
                ...option,
                selected: optionIndex === indexOption,
              }))
            : question.options,
      }))
    );
  };

//   const handleDragEnd = (result) => {
//     if(!result.destination){
//         return;
//     }
//     const itemgg = [questions]
//     const itemF = reoder(
//         itemgg,
//         result.source.index,
//         result.destination.index
//     )
//     setQuestion(itemF)
//   }

const expandCloseAll = () => {
    let closedQuestion = [...questions]
    for (let i = 0; i < closedQuestion.length; i++) {
        closedQuestion[i].open = false
    }
    setQuestion(closedQuestion)
}

const handleExpand = (i) => {
    let expandQuestion = [...questions]
    for (let j = 0; j < expandQuestion.length; j++) {
        if(i === j){
            expandQuestion[i].open = true
        }else{
            expandQuestion[j].open = false
        }        
    }
    setQuestion(expandQuestion)
}

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const questionUI = () => {
    return questions.map((question, i) => {
      return (
        <Accordion
          key={i}
          expanded={true}
          className={cx({add_border: question.open})}
          onChange={() => handleExpand(i)}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ width: "100%" }}
          >
            {!questions[i].open ? (

                        <div className={cx('saved_question')}>

                            <Typography sx={{ fontSize: "15px", fontWeight: "400", letterSpacing: ".1px", lineHeight: "24px", paddingBottom: "8px" }}>
                                {i+1}. {questions[i].title}</Typography>
                                
                                {question.options.map((option, i) => (
                                    <div key={i}>
                                        <div style={{display: "flex"}}>
                                            <FormControlLabel sx={{marginLeft: "5px", marginBottom: "5px"}} disabled control={ <Radio
                                                sx={{ marginRight: "10px" }}
                                                checked={option.selected}
                                                required={question.required}
                                                onChange={() => handleChangeSelectedOption(i, j)}
                                                value="a"
                                                name="radio-buttons"
                                                inputProps={{ "aria-label": "A" }}
                                            />}
                                            label={
                                                <Typography sx={{
                                                    fontSize: "13px",
                                                    fontWeight: '400',
                                                    letterSpacing: '.2px',
                                                    lineHeight: "20px",
                                                    color: "#202124"
                                                }}
                                                >{question.options[i].title}</Typography>
                                            }/>
                                        </div>
                                    </div>
                                ))} 
                        </div>
                    ) : ""}
          </AccordionSummary>
                {questions[i].open ? (
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
                <Select
                  className={cx("select")}
                  style={{ color: "#5f6368", fontSize: "13px" }}
                >
                  <MenuItem id="radio" value="radio">
                    <Radio style={{ marginRight: "10px", color: "#70757a" }} />
                    Multiple Choice
                  </MenuItem>
                </Select>
              </div>
            

              {question.options.map((option, j) => (
                <div className={cx("add-question-body")} key={j}>
                    <div className={cx('content')}>
                  <Radio
                    sx={{ marginRight: "10px" }}
                    checked={option.selected}
                    onChange={() => handleChangeSelectedOption(i, j)}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <div>
                    <input
                      onChange={(e) => handleChangeOption(e.target.value, i, j)}
                      type="text"
                      className={cx("text-input")}
                      placeholder="option"
                      value={option.title}
                    />
                  </div>
                  </div>
                  <IconButton aria-label="delete" >
                    <CloseIcon onClick={() => handleRemoveOption(i, j)} />
                  </IconButton>
                </div>
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
                  >
                    Answer key
                  </Button>
                </div>

                <div className={cx("add-question-bottom")}>
                  <IconButton>
                    <ContentCopyIcon onClick={() => handleCopyQuestion(i)} />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon onClick={() => handleDeleteQuestion(i)} />
                  </IconButton>
                  <IconButton>
                    <span style={{ color: "#5f6368", fontSize: "13px" }}>
                      Required
                    </span>
                    <Switch
                      onClick={() => handleRequiredQuestion(i)}
                      name="checkedA"
                      color="primary"
                      checked={question.required}
                    />
                  </IconButton>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </div>
              </div>
            </AccordionDetails>
          </div>): ""}
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

            {/* <DragDropContext onDragEnd={handleDragEnd}>
                <Draggable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}> */}
                            {questionUI()} 
                            {/* {provided.placeholder}
                        </div>
                    )}
                </Draggable>
            </DragDropContext> */}

          
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
