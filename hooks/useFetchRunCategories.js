import { useEffect, useState } from "react";
import axios from "@/config/axiosConfig"

export const useFetchRunCategories = () => {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/run/category/all');
        setCategories(response.data.categories);
        setSelectedCategory(response.data.categories[0]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { categories, loading, error, selectedCategory, setSelectedCategory };
};