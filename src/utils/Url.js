export const fetchData = async () => {
  try {
    const res = await fetch("/data.json");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};
