const defineLastElementInLocation = (location: string) => {
  if (!location || location.trim() === "") return null;
  const splitLocation = location.split("/");
  return splitLocation[splitLocation.length - 1];
};

export default defineLastElementInLocation;
