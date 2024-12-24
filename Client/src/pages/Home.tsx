import { UserContext } from "@/context/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/sign-in");
    }
  }, [isLoggedIn]);

  return <div>Home</div>;
};

export default Home;
