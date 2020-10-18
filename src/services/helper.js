export const getHoursDiff = (t) => {
  return Math.abs(new Date().getTime() - new Date(t).getTime()) / 3600000;
};
