import React, { useEffect, useState } from "react";

const useAppwrite = (func) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetch = async () => {
    setLoading(true);
    try {
      const getAll = await func();
      console.log("getAll", getAll);
      
      setData(getAll);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  const refetch = () => fetch();
  return { data, refetch, setLoading, loading };
};

export default useAppwrite;
