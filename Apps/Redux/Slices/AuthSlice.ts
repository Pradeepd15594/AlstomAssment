import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import AuthService from "../../Services/AuthService";
import { InitialStatePropsModel, AlbumModel,OrientationType } from "../../Types/Album";
import { IntialData } from "./IntialData";

const initialStateModel: InitialStatePropsModel = {
    _id: "",
    username: "",
    firstName: "",
    lastName: "",
    image: "",
    password: "",
    email: "",
    mobile: "",
    empId: "",
    roleId: "",
    accessToken: "",
    refreshToken: "",
    albumsList: [],
    roleName: "",
    selectedAlbum: IntialData,
    isConnected: true,
    orientation:'LANDSCAPE'
}

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: initialStateModel,
    reducers: {
        setSelectedAlbum(state: InitialStatePropsModel, action: PayloadAction<AlbumModel>) {
            state.selectedAlbum = action.payload;
        },
        setAlbumsList(state: InitialStatePropsModel, action: PayloadAction<AlbumModel[]>) {
            state.albumsList = action.payload;
        },  
        setOrientation(state: InitialStatePropsModel, action: PayloadAction<OrientationType>) {
            state.orientation = action.payload;
        }
    }
});
export const { setSelectedAlbum, setAlbumsList, setOrientation } = AuthSlice.actions;
export default AuthSlice;