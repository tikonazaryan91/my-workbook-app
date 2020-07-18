const getDateParts = (date) => {
  const current = date instanceof Date ? date : new Date(date);

  let month = (current.getMonth() + 1).toString(),
    day = current.getDate().toString(),
    year = current.getFullYear().toString();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year];
};

export const formatDate = (date) => {
  if (!date) return null;

  const [day, month, year] = getDateParts(date);

  return `${day}-${month}-${year}`;
};

export const formatDateYYYYMMdd = (date) => {
  if (!date) return null;

  const [day, month, year] = getDateParts(date);

  return `${year}-${month}-${day}`;
};
