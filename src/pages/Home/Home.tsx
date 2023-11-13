import { useEffect } from "react";
import CardSection from "../../components/CardSection/CardSection";
import Header from "../../components/Header/Header";
import Template from "../../components/Template/Template";
import { useSurveyCardStore } from "../../store/store";
import axios from "axios";

const Home = () => {
  const { setSurveyCard } = useSurveyCardStore();

  const fetchData = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/survey",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { data } = await response.data;
      console.log(data);

      setSurveyCard(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token") ?? "";
    fetchData(token);
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
