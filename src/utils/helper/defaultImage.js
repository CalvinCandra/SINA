export const getDefaultImageAsFile = async (defaultImage) => {
  const response = await fetch(defaultImage);
  const blob = await response.blob();
  return new File([blob], "default.jpg", { type: blob.type });
};
