import React from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const updateSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  stream: yup.string(),
  skills: yup.string(),
  achievement: yup.string(),
  bio: yup.string(),
  linkdin: yup.string(),
  twitter: yup.string(),
  // picture: yup.string(),
});

const initialValuesUpdate = {
  firstName: "",
  lastName: "",
  stream: "",
  skills: "",
  achievement: "",
  bio: "",
  linkdin: "",
  twitter: "",
  // picture: "",
};

function UpdateProfilePage() {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const update = async (values, onsubmitProps) => {
    const response = await fetch(`${process.env.BASEURL}/users/${id}/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
    await response.json();
    onsubmitProps.resetForm();
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <Formik
        onSubmit={update}
        initialValues={initialValuesUpdate}
        validationSchema={updateSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              justifyContent="center"
              gap="30px"
              width="60%"
              margin="auto"
              mt="5%"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Stream"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.stream}
                  name="stream"
                  error={Boolean(touched.stream) && Boolean(errors.stream)}
                  helperText={touched.stream && errors.stream}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Skills"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.skills}
                  name="skills"
                  error={Boolean(touched.skills) && Boolean(errors.skills)}
                  helperText={touched.skills && errors.skills}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Achievement"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.achievement}
                  name="achievement"
                  error={
                    Boolean(touched.achievement) && Boolean(errors.achievement)
                  }
                  helperText={touched.achievement && errors.achievement}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Twitter"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.twitter}
                  name="twitter"
                  error={Boolean(touched.twitter) && Boolean(errors.twitter)}
                  helperText={touched.twitter && errors.twitter}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="LinkdIn"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.linkdin}
                  name="linkdin"
                  error={Boolean(touched.linkdin) && Boolean(errors.linkdin)}
                  helperText={touched.linkdin && errors.linkdin}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Bio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bio}
                  name="bio"
                  error={Boolean(touched.bio) && Boolean(errors.bio)}
                  helperText={touched.bio && errors.bio}
                  sx={{ gridColumn: "span 4" }}
                />

                {/* BUTTONS */}
                <Button
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  Save
                </Button>
              </>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default UpdateProfilePage;
