import classNames from "classnames/bind";
import styles from "./SurveyForm.module.scss";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Question, SurveyProp } from "../../types/survey";
import { useActionStore, useAuthStore, useDoForm } from "../../store/store";
import QuestionItem from "./QuestionItem/QuestionItem";
import { AddCircleOutline } from "@mui/icons-material";
import {
  checkIfAllValidated,
  filterDataToCreateSurvey,
  filterDataToUpdateSurvey,
  filterGetSelectedId,
} from "../../utils/helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CREATE, DO, EDIT } from "../../constants/constant";
import BasicPopover from "../shares/Popover";

const cx = classNames.bind(styles);

const SurveyForm = () => {
  const { survey } = useDoForm();
  const { action } = useActionStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [surveyValidationErrors, setSurveyValidationErrors] = useState<
    Record<string, string>
  >({});
  const [surveyInfo, setSurveyInfo] = useState<SurveyProp>({
    id: "",
    title: "",
    description: "",
  });

  const [questions, setQuestion] = useState<Question[]>([
    {
      title: "",
      options: [{ title: "", selected: false }],
      required: true,
      open: true,
    },
  ]);

  const handleSurveyInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurveyInfo({
      ...surveyInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMoreQuestion = () => {
    const optionLength = questions[questions.length - 1].options.length;
    const isEmptyTitle =
      questions[questions.length - 1].options[optionLength - 1].title;

    if (optionLength >= 2 && isEmptyTitle) {
      expandCloseAll();
      const newQuestion: Question = {
        title: "",
        options: [{ title: "", selected: false }],
        open: true,
        required: false,
      };
      setQuestion([...questions, newQuestion]);
    } else {
      alert("You must be have more than 1 option and not empty title");
    }
  };

  const expandCloseAll = () => {
    let closedQuestion = [...questions];
    for (let i = 0; i < closedQuestion.length; i++) {
      closedQuestion[i].open = false;
    }
    setQuestion(closedQuestion);
  };

  const setStateReveiveFromServer = () => {
    setSurveyInfo({
      id: survey.id,
      title: survey.title,
      description: survey.description,
    });
    if (survey && survey.questions) {
      const updatedQuestions = survey.questions.map((question) => ({
        ...question,
        open: false,
        required: true,
        options: question.options.map((option) => ({
          ...option,
          selected: false,
        })),
      }));
      setQuestion(updatedQuestions);
    }
  };

  const handleSubmitAnswer = async (): Promise<void> => {
    const updatedRecord = {
      survey_id: survey.id,
      ids: filterGetSelectedId(questions),
    };
    console.log(updatedRecord);
    
    try {
      const token = localStorage.getItem("token") ?? "";
      const response = await axios.post(
        "http://localhost:8080/api/v1/survey/do-form",
        JSON.stringify(updatedRecord),{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data.status === 200) {
        alert("Completed survey");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitCreateSurvey = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    const validated = checkIfAllValidated({surveyInfo, questions, setSurveyValidationErrors, setAnchorEl, event});
    if(!validated) return;
    const data = filterDataToCreateSurvey(surveyInfo, questions, user);

    try {
      const token = localStorage.getItem("token") ?? "";
      const response = await axios.post(
        "http://localhost:8080/api/v1/survey/create",
        JSON.stringify(data), {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data.status === 200) {
        alert("Create survey successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdateSurvey = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    const validated = checkIfAllValidated({surveyInfo, questions, setSurveyValidationErrors, setAnchorEl, event});
    if(!validated) return;
    const data = filterDataToUpdateSurvey(surveyInfo, questions);

    try {
      const token = localStorage.getItem("token") ?? "";

      const response = await axios.put(
        "http://localhost:8080/api/v1/survey/edit",
        JSON.stringify(data), {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data.status === 200) {
        alert("Update survey successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (action === DO || action === EDIT) {
      setStateReveiveFromServer();
    }
  }, [action, survey]);

  const questionUI = () => {
    return questions.map((question, index) => (
      <QuestionItem
        question={question}
        questions={questions}
        setQuestion={setQuestion}
        indexQuestion={index}
      />
    ));
  };

  return (
    <div>
      <div className={cx("survey-form")}>
        <br />
        <div key="id" className={cx("section")}>
          <div className={cx("survey-title-section")}>
            <div className={cx("survey-form-top")}>
              <input
                className={cx("survey-form-title")}
                placeholder="Untitled document"
                name="title"
                disabled={action === DO}
                value={surveyInfo.title}
                onChange={(e) => handleSurveyInfo(e)}
                type="text"
              />

              <input
                className={cx("survey-form-desc")}
                placeholder="Form description"
                disabled={action === DO}
                name="description"
                value={surveyInfo.description}
                onChange={(e) => handleSurveyInfo(e)}
                type="text"
              />
            </div>
          </div>
          {questionUI()}

          {action === CREATE && (
            <div className={cx("btn-bottom")}>
              {" "}
              <Button
                onClick={handleAddMoreQuestion}
                variant="contained"
                endIcon={<AddCircleOutline />}
                sx={{ marginTop: "10px" }}
              >
                Add Question
              </Button>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSubmitCreateSurvey}
                sx={{ marginTop: "10px" }}
              >
                Submit
              </Button>
            </div>
          )}
          {action === DO && (
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSubmitAnswer}
              sx={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          )}
          {action === EDIT && (
            <div className={cx("btn-bottom")}>
              <Button
                onClick={handleAddMoreQuestion}
                variant="contained"
                endIcon={<AddCircleOutline />}
                sx={{ marginTop: "10px" }}
              >
                Add Question
              </Button>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSubmitUpdateSurvey}
                sx={{ marginTop: "10px" }}
              >
                Submit
              </Button>
            </div>
          )}
        </div>
        <BasicPopover
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          surveyValidationErrors={surveyValidationErrors}
        />
      </div>
    </div>
  );
};

export default SurveyForm;
