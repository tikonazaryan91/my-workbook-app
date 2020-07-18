import * as yup from "yup";
import database from "../../../configs/firebase";

yup.addMethod(yup.date, "dateUniqueRange", function (
  message = "Must be unique"
) {
  return this.test("dateUniqueRange", message, function (value) {
    return new Promise((resolve, reject) => {
      const employeeId = this.resolve(yup.ref("employeeId"));
      database
        .ref(`employee-workplaces/${employeeId}`)
        .once("value")
        .then((snap) => {
          const data = snap.val();

          const workplaces = data
            ? Object.keys(data).map((key) => ({
                startDate: new Date(data[key].startDate),
                endDate: new Date(data[key].endDate),
              }))
            : [];

          if (
            !workplaces.some((e) => value > e.startDate && value < e.endDate)
          ) {
            resolve(true);
          } else {
            reject(this.createError({ message }));
          }
        })
        .catch(() => {
          reject(this.createError({ message }));
        });
    });
  });
});

export default yup.object().shape({
  employeeId: yup.string(),
  startDate: yup
    .date()
    .dateUniqueRange(
      "Person can only work for one company during the same period"
    )
    .required("Must enter a Start Date"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date can't be before start date")
    .dateUniqueRange(
      "Person can only work for one company during the same period"
    )
    .required("Must enter a End Date"),
  company: yup.string().required("Must enter an company"),
  country: yup.string().required("Must enter a Country"),
});
