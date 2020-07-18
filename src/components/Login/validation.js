import * as yup from "yup";

export default yup.object().shape({
  username: yup.string().required("Must enter User Name"),
  password: yup.string().required("Must enter Password"),
});
