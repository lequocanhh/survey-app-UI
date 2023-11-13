import { useEffect } from "react";
import SurveyForm from "../../components/SurveyForm/SurveyForm";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useActionStore, useDoForm } from "../../store/store";
import { DO, EDIT } from "../../constants/constant";

const Form = () => {
  const { id } = useParams();
  const { setSurvey } = useDoForm();
  const {action} = useActionStore()
  

  const getSurveyDetail = async (param: string) => {
    try {
      const token = localStorage.getItem("token") ?? "";
      const response = await axios.get(
        `http://localhost:8080/api/v1/survey/${param}/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const { data } = await response.data;
      
      setSurvey(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    switch (action) {
      case DO: {
        getSurveyDetail("do-form");
        break;
      }
      case EDIT: {
        getSurveyDetail("edit");
        break;
      }
      default:
        console.log("");
        break;
    }
  }, [action]);
  return (
    <SurveyForm/>
)};

export default Form;
