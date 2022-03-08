import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SecondPage = (props) => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log("data", location.data); // result: '?query=abc'
    // console.log(location.state.detail); // result: 'some_value'
  });

  return <h1>Second Page</h1>;
};

export default SecondPage;
