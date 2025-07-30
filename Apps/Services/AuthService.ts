import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ApiPath from './ConstantApi';
import { setAlbumsList } from "../Redux/Slices/AuthSlice";
// Define types for the API
export interface SignInProps {
  email: string;
  password: string;
}

export interface AuthProps {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
  password: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface SignUpProps {
  name: string;
  email: string;
  password: string;
  id?:string;
}
// https://itunes.apple.com/search?term=jack+johnson
const baseUrl = "https://itunes.apple.com";
// Create the API slice
export const AuthService = createApi({
  reducerPath: "AuthService",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({

    getSarchAlbums: builder.query<any, string>({
      query: (term) => ({
        url: `${ApiPath.getSarchAlbums}?term=${term || "jack johnson"}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data }:any = await queryFulfilled; // Wait for the query to resolve
       
          if(data && data?.results && Array.isArray(data?.results)){
            console.log('data in RTK 1', JSON.stringify(data));
            dispatch(setAlbumsList(JSON.parse(JSON.stringify(data.results)))); // Dispatch setUser with the fetched user data
          }else{
            // console.log('data in RTK 2', JSON.stringify(data));
            // dispatch(setAlbumsList([])); // Dispatch setUser with the fetched user data
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      },
    }),
    
  }),
});

// Export hooks for the API
export const {
    useGetSarchAlbumsQuery,
    useLazyGetSarchAlbumsQuery
} = AuthService;