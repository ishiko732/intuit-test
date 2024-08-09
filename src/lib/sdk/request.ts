// request.ts

export const request = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};
