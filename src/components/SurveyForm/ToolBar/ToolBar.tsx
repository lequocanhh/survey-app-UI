import { IconButton, Switch } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoreVert } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Question } from "../../../types/survey";

type Prop = {
    question: Question,
    questions: Question[],
    setQuestion: React.Dispatch<React.SetStateAction<Question[]>>;
    indexQuestion: number
}

const ToolBar = ({
    question,
    questions,
    setQuestion,
    indexQuestion
}: Prop) => {

    const handleCopyQuestion = () => {
        const copiedQuestion = [...questions];
        const newQuestion = { ...copiedQuestion[indexQuestion] };
        setQuestion([...questions, newQuestion]);
      };
    
      const handleDeleteQuestion = () => {
        const question = [...questions];
        if (questions.length > 1) {
          question.splice(indexQuestion, 1);
          setQuestion(question);
        }
      };
    
      const handleRequiredQuestion = () => {
        const questionRequired = [...questions];
        questionRequired[indexQuestion].required =
          !questionRequired[indexQuestion].required;
    
        console.log(indexQuestion);
    
        setQuestion(questionRequired);
      };

  return (
    <>
      <IconButton>
        <ContentCopyIcon onClick={handleCopyQuestion} />
      </IconButton>
      <IconButton>
        <DeleteIcon onClick={handleDeleteQuestion} />
      </IconButton>
      <IconButton>
        <span style={{ color: "#5f6368", fontSize: "13px" }}>Required</span>
        <Switch
          onClick={handleRequiredQuestion}
          name="checkedA"
          color="primary"
          checked={question.required}
        />
      </IconButton>
      <IconButton>
        <MoreVert />
      </IconButton>
    </>
  );
};

export default ToolBar;
