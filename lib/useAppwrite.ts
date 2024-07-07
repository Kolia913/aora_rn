import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      setData(response as any);
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return {
    data,
    isLoading,
    refetch,
  };
};
