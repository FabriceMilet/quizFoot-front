import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "./slices/quiz.slice";

export default configureStore({
    reducer:{
        // exemple
        // user: userSlice,
        quiz: quizSlice,
        // date: dateSlice,
        // task: taskSlice
    },
})