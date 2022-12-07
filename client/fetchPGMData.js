export const fetchPGMData = async (currentFile) => {
  const response = await fetch(`http://localhost:3000/${currentFile}`);
  const responseJSON = await response.json();

  return responseJSON;
};
