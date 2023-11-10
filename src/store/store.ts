import {create} from 'zustand'
import { User } from '../types/user'
import { Survey, SurveyInfo } from '../types/survey'


type Authen = {
    user: User,
    isAdmin: boolean,
    isAuthenticated: boolean,
    login: (userData: User) => void
    checkAdmin: (isAdmin: boolean) => void
}



type SurveyCard = {
    surveyInfo: SurveyInfo[],
    setSurveyCard: (data: SurveyInfo[]) => void
    
}


type DoSurvey = {
    survey: Survey,
    setSurvey: (data: any) => void
}

type Action = {
    action: string,
    setAction: (action: string) => void
}


export const useAuthStore = create<Authen>((set) => ({
    user: {} as User,
    isAdmin: false,
    isAuthenticated: false,
    login: (userData: User) => set({ user: userData, isAuthenticated: true }),
    checkAdmin: (isAdmin: boolean) => set({ isAdmin })
}))


export const useSurveyCardStore = create<SurveyCard>((set) => ({
    surveyInfo: [] as SurveyInfo[],
    setSurveyCard: (data: SurveyInfo[]) => set({ surveyInfo: data })
}))

export const useActionStore = create<Action>((set) => ({
    action: "",
    setAction: (action: string) => set({action: action})
}))


export const useDoForm = create<DoSurvey>((set) => ({
    survey: {} as Survey,
    setSurvey: (data: any) => set({survey: data})
}))