import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { Alert, Box, Stack, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";

import ExerciseCard from "./ExerciseCard";
import Loader from "./Loader";

const Exercises = ({
  setExercises,
  exercises,
  bodyPart,
  search,
  isExerciseSearched,
  setIsExerciseSearched,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const exercisesPerPage = 6;

  const indexOfLastExercise = currentPage * exercisesPerPage;

  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  useEffect(() => {
    console.log("1st useeffect");

    if (search.length === 0 && exercises.length !== 0) {
      setIsPageLoading(false);
    }
  }, [exercises]);

  useEffect(() => {
    if (search.length !== 0 && exercises.length === 0) {
      setNoResultsFound(true);
    } else {
      setNoResultsFound(false);
    }
  }, [isExerciseSearched]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }

      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart]);

  useEffect(() => {
    console.log("searched", exercises);
  }, [exercises]);

  const paginate = (e, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  // if (!exercises.length) {
  //   return <Loader />;
  // }

  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {isPageLoading ? (
          <Loader />
        ) : noResultsFound ? (
          <Alert severity="info">
            <strong>No results found 🤷‍♂️</strong>
          </Alert>
        ) : (
          currentExercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))
        )}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
