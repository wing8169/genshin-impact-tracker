export const getHoursDiff = (t) => {
  return Math.round(
    Math.abs(new Date().getTime() - new Date(t).getTime()) / 3600000
  );
};

export const addHours = (t, h) => {
  return t.getTime() + h * 60 * 60 * 1000;
};
