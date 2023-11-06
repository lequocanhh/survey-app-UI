import { FormControlLabel, Radio, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CloseQuestion.module.scss";
import { Question } from "../../../types/survey";

const cx = classNames.bind(styles);

type Prop ={
    question: Question,
    indexQuestion: number
}

const CloseQuestion = ({ question, indexQuestion }: Prop) => {
  return (
    <div className={cx("saved_question")}>
      <Typography
        sx={{
          fontSize: "15px",
          fontWeight: "400",
          letterSpacing: ".1px",
          lineHeight: "24px",
          paddingBottom: "8px",
        }}
      >
        {indexQuestion + 1}. {question.title}
      </Typography>
      {question.options.map((option, i) => (
        <div key={i}>
          <div style={{ display: "flex" }}>
            <FormControlLabel
              sx={{ marginLeft: "5px", marginBottom: "5px" }}
              disabled
              control={
                <Radio
                  sx={{ marginRight: "10px" }}
                  checked={option.selected}
                  required={question.required}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "400",
                    letterSpacing: ".2px",
                    lineHeight: "20px",
                    color: "#202124",
                  }}
                >
                  {question.options[i].title}
                </Typography>
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CloseQuestion;
