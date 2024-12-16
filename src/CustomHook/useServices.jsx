import { useEffect, useState } from "react";

const useServices = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:4000/services",{ credentials: "include" }
    )
      .then((res) => res.json())
      .then((data) => {
        setService(data);
      });
  }, []);

  return service;
};

export default useServices;
