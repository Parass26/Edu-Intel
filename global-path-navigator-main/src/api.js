const BASE_URL = import.meta.env.VITE_API_URL;

export const recommendUniversities = async (data) => {
  const response = await fetch(`${BASE_URL}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const getAnalytics = async () => {
  const response = await fetch(`${BASE_URL}/analytics`);
  return response.json();
};

export const getStudents = async () => {
  const response = await fetch(`${BASE_URL}/students`);
  return response.json();
};

export const getUniversities = async () => {
  const response = await fetch(`${BASE_URL}/universities`);
  return response.json();
};

export const runScraper = async () => {
  const response = await fetch(`${BASE_URL}/scrape`);
  return response.json();
};
