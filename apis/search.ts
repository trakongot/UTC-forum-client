import axios from "axios";

// Lấy gợi ý tìm kiếm
export const getSearchSuggestions = async (query: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/search/suggestions`, {
        params: { query } 
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching search suggestions:", error);
    return []; 
  }
};

// Lấy threads theo từ khóa tìm kiếm
export const getSearchThreads = async (query: string, pageNumber = 1, pageSize = 20) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/search/searchThread`, {
      params: { query, pageNumber, pageSize },
    });
    console.log("Threads fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching threads by search:", error);
    return { threads: [], isNext: false }; 
  }
};
