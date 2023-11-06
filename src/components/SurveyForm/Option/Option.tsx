import classNames from "classnames/bind";
import styles from "./Option.module.scss";
import { IconButton, Radio } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { OptionProp, Question } from "../../../types/survey";

const cx = classNames.bind(styles);

type Props = {
  option: OptionProp;
  indexOption: number;
  indexQuestion: number;
  questions: Question[];
  setQuestion: React.Dispatch<React.SetStateAction<Question[]>>;
};

const Option = ({
  option,
  indexOption,
  indexQuestion,
  questions,
  setQuestion,
}: Props) => {
  console.log();

  const handleChangeSelectedOption = () => {
    console.log(indexQuestion);

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

  return (
    <div className={cx("add-question-body")} key={indexOption}>
      <div className={cx("content")}>
        <Radio
          sx={{ marginRight: "10px" }}
          checked={option.selected}
          onChange={handleChangeSelectedOption}
          value="a"
          name="radio-buttons"
          inputProps={{ "aria-label": "A" }}
        />
        <div>
          <input
            onChange={(e) =>
              handleChangeOption(e.target.value, indexQuestion, indexOption)
            }
            type="text"
            className={cx("text-input")}
            placeholder="option"
            value={option.title}
          />
        </div>
      </div>
      <IconButton aria-label="delete">
        <CloseIcon
          onClick={() => handleRemoveOption(indexQuestion, indexOption)}
        />
      </IconButton>
    </div>
  );
};

export default Option;
