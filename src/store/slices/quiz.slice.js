import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// on va mettre ca dans un fichier .env mais il y a un bug à régler
//const apiUrl = process.env.REACT_APP_API_URL;

export const getQuizzes = createAsyncThunk(
    "quiz/getQuizzes",
    async (_, thunkAPI) => {
  
      // const token = localStorage.getItem('token')
      //console.log("verif-token", token)
    
      try {
        const response = await axios.get(
            'http://localhost:1337/api/quizzes'
           // `${apiUrl}/api/quizzes`
        // , {
        //   headers: {
        //     Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête de la requête
        //   }
        // }
        );
        return response.data.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.data);
      }
  
    }
  );

// exemple création de la fonction qui post les données du nouvel utilisateur
// export const userCheckToken = createAsyncThunk(
//   "user/userCheckToken",
//   async (_, thunkAPI) => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.get(`${apiUrl}/token`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête de la requête
//           }
//         });

//       return response.data
//     } catch (err) {
//       localStorage.removeItem('token');
//       alert("Veuillez vous reconnecter !")
//     }
//   }
// );

// export const createUser = createAsyncThunk(
//   "user/createUser",
//   async (userData, thunkAPI) => {
//     console.log("userData creatAccount", userData)
//     try {
//       const response = await axios.post(`${apiUrl}/user`, userData);
//       // J'enregistre en local toutes les données envoyés par le back tant que ma connection est approuvé.
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('id', response.data.user.id);
//       return response.data
//     } catch (err) {
//       console.log("erreur", err)
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );
const quizSlice = createSlice({
    name: "quiz",
    initialState: {
        loading: false,
        quizzes: []
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(getQuizzes.pending, (state) => {
          state.loading = true;
        })
        .addCase(getQuizzes.fulfilled, (state, action) => {
          state.loading = false;
          state.quizzes = action.payload
        })
        .addCase(getQuizzes.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
  });
  
  // on mettra ici les actions
  // export const { } = userSlice.actions;
  export default quizSlice.reducer;