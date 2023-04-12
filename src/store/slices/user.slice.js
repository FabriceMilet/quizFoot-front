import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

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
const userSlice = createSlice({
    name: "user",
    initialState: {
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        // .addCase(createUser.pending, (state) => {
        //   state.loading = true;
        // })
        // .addCase(createUser.fulfilled, (state, action) => {
        //   state.loading = false;
        //   state.isLogged = true;
        //   state.userConnected = action.payload
        //   state.succes = "Création de compte OK !";
        //   state.erreur = null;
        // })
        // .addCase(createUser.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.payload;
        //   state.succes = null;
        //   state.erreur = "Problème de création de compte"
        // })
    },
  });
  
  // on mettra ici les actions
  // export const { } = userSlice.actions;
  export default userSlice.reducer;
  