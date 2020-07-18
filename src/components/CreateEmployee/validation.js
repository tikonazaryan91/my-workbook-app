import * as yup from "yup";
import database from "../../configs/firebase";

const isBirthdateGreaterThanEighteen = (date) => {
  const diff_ms = Date.now() - date.getTime();

  return Math.floor(diff_ms / (1000 * 60 * 60 * 24 * 365.25)) >= 18;
};

yup.addMethod(yup.date, "greaterThan18", function (
  message = "Age must be greater than 18 years old."
) {
  return this.test("greaterThan18", message, function (value) {
    return new Promise((resolve, reject) => {
      if (!isBirthdateGreaterThanEighteen(value)) {
        reject(this.createError({ message }));
      }
      resolve(true);
    });
  });
});

yup.addMethod(yup.string, "unique", function (message = "Must be unique") {
  return this.test("unique", message, function (value) {
    return new Promise((resolve, reject) => {
      const { path, createError } = this;

      database
        .ref(`employees`)
        .once("value")
        .then((snap) => {
          const data = snap.val();
          const employees = Object.keys(data).map((key) => ({
            ...data[key],
            id: key,
          }));

          if (!employees.some((e) => e[path] === value)) {
            resolve(true);
          } else {
            reject(createError({ message }));
          }
        })
        .catch(() => {
          reject(createError({ message }));
        });
    });
  });
});

export default yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Must be only letters")
    .required("Must enter an First Name"),
  lastName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Must be only letters")
    .required("Must enter an Last Name"),
  email: yup
    .string()
    // .email("Must enter valid Email")
    .required("Must enter an Email")
    .unique("Must be unique Email"),
  passport: yup
    .string()
    .required("Must enter an Passport")
    .unique("Must be unique Passport"),
  birthDate: yup.date().required("Must enter an Birth Date").greaterThan18(),
});
