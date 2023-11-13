import { useEffect } from "react";
import CardSection from "../../components/CardSection/CardSection";
import Header from "../../components/Header/Header";
import Template from "../../components/Template/Template";
import { useAuthStore, useSurveyCardStore, useSurveyIndividualStore } from "../../store/store";
import instance from "../../service/api";

const Home = () => {
  const { setSurveyCard } = useSurveyCardStore();
  const { setSurveyIndividual } = useSurveyIndividualStore()
  const {user} = useAuthStore()

  const fetchAllSurveyData = async () => {
    try {
      const response = await instance({
        url: "survey",
        method: "GET"
      })
      const { data } = await response.data;
      setSurveyCard(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIndividualSurveyData = async () => {
    try {
      const response = await instance({
        url: `survey/${user.id}`,
        method: "GET"
      })
      const { data } = await response.data;      
      setSurveyIndividual(data);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    fetchAllSurveyData();
    fetchIndividualSurveyData();
  }, []);
  return (
    <div>
      <Header />
      <Template />
      <CardSection />
    </div>
  );
};

export default Home;
