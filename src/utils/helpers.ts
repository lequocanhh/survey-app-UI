import { z } from "zod";
import { Question, SurveyProp } from "../types/survey";
import { User } from "../types/user";


export const filterGetSelectedId = (questions: Question[]): string[] => {
    let selectedId: string[] = []
      questions.map((question) => {
        question.options.map((option) => {
            if(option.selected && option.id){
                selectedId.push(option.id)
            }
        })
      })
      return selectedId
}

export const filterDataToCreateSurvey = (surveyInfo: SurveyProp, questions: Question[], user: User) => {
  return {
    created_by: user.id,
    title: surveyInfo.title,
    description: surveyInfo.description,
    questions: questions.map((question) => {
      delete question.open
      delete question.required
      return question
    })
  }
}

export const filterDataToUpdateSurvey = (surveyInfo: SurveyProp, questions: Question[]) => {
  return {
    id: surveyInfo.id,
    title: surveyInfo.title,
    description: surveyInfo.description,
    questions: questions.map((question) => {
      delete question.open
      delete question.required
      return question
    })
  }
}

type CheckValidationProps = {
  surveyInfo: SurveyProp,
  questions: Question[],
  setSurveyValidationErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>,
  event: React.MouseEvent<HTMLButtonElement>
}

export const checkIfAllValidated = ({
  surveyInfo,
  questions,
  setSurveyValidationErrors,
  setAnchorEl,
  event
}: CheckValidationProps) => {

  const surveySchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, "Survey title must be at least 2 character").max(200),
    description: z.string().min(2, "Survey description must be at least 2 character").max(20000),
  });

  const questionSchema = z.object({
    title: z.string().min(2, "question title must be at least 2 character").max(200),
    required: z.boolean().default(true).optional(),
    open: z.boolean().default(true)
  });
  const questionsSchema = z.array(questionSchema);

  const optionSchema = z.object({
    title: z.string().min(2, "option title must be at least 2 character").max(200),
    selected: z.boolean().default(false).optional()
  });
  const optionsSchema = z.array(optionSchema);

  const validationSurvey = surveySchema.safeParse(surveyInfo);
  const validationQuestion = questionsSchema.safeParse(questions);
  const validationOption = optionsSchema.safeParse(questions.flatMap(question => question.options));

  if (!validationSurvey.success) {
    const errors: Record<string, string> = {};
    validationSurvey.error.errors.forEach((error) => {
      if (error.path) {
        errors[error.path[0]] = error.message;
      }
    });
    setSurveyValidationErrors(errors);
    setAnchorEl(event.currentTarget);
    return false;
  }

  if (!validationQuestion.success) {
    const errors: Record<string, string> = {};
    validationQuestion.error?.errors.forEach((error) => {
      if (error.path) {
        errors[error.path[0]] = error.message;
      }
    });
    setSurveyValidationErrors(errors);
    setAnchorEl(event.currentTarget);
    return false;
  }

  if (!validationOption.success) {
    const errors: Record<string, string> = {};
    validationOption.error?.errors.forEach((error) => {
      if (error.path) {
        errors[error.path[0]] = error.message;
      }
    });
    setSurveyValidationErrors(errors);
    setAnchorEl(event.currentTarget);
    return false;
  }

  return true;
}

