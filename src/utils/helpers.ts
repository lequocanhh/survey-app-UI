
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



