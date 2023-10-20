import React, { useState } from "react";
import { Box } from "@mui/material";
import Exercises from "../components/Exercises";
import SearchExercises from "../components/SearchExercises";
import HeroBanner from "../components/HeroBanner";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");
  const [search, setSearch] = useState("");
  const [isExerciseSearched, setIsExerciseSearched] = useState(false);

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
        exercises={exercises}
        search={search}
        setSearch={setSearch}
        isExerciseSearched={isExerciseSearched}
        setIsExerciseSearched={setIsExerciseSearched}
      />
      <Exercises
        setExercises={setExercises}
        exercises={exercises}
        bodyPart={bodyPart}
        search={search}
        isExerciseSearched={isExerciseSearched}
        setIsExerciseSearched={setIsExerciseSearched}
      />
    </Box>
  );
};

export default Home;
