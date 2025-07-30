import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ApiPath from "./../ConstantApi";
import { setAlbumsList } from "./../../Redux/Slices/AuthSlice";


 const RtkBaseQueryWithReauth = (baseUrl: string) => {
  // const navigate=useNavigate();
  return async (args: any, api: any, extraOptions: any) => {
    const baseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers, { getState }) => {
        const { AuthSlice: { accessToken } }: any = getState();
         headers.set("Content-Type", `application/json`);
        if (accessToken) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
      },
    });

    const { AuthSlice: { accessToken, accessTokenExpiry, refreshToken } }: any = api.getState();

    const currentTime = Date.now() / 1000; // Current time in seconds
    if (accessToken && accessTokenExpiry && accessTokenExpiry <= currentTime) {
      try {
        const refreshResult: any = await baseQuery(
          {
            url: ApiPath.refreshToken,
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult && refreshResult?.data?.accessToken) {
          const newAccessToken = refreshResult.data.accessToken;

        //   api.dispatch(
        //     setAccessToken({
        //       accessToken: newAccessToken,
        //       refreshToken,
        //     })
        //   );

          // Retry the original query with the new token
          const headers = new Headers(args.headers);
          headers.set("Authorization", `Bearer ${newAccessToken}`);
          args.headers = headers;

          return baseQuery(args, api, extraOptions);
        } else {
          console.log('Failed to refresh access token', 'Failed to refresh access token');
          
          throw new Error("Failed to refresh access token");
        }
      } catch (error) {
        console.error("Token refresh error:", error);
        // api.dispatch(logout());

        // try {
        //   localStorage.clear();
        //   sessionStorage.clear();
        // } catch (error) {
        //   console.error("Logout error:", error);
        // }
    
        // setTimeout(() => {
        //   // navigate("//login", { replace: true });
        // }, 1000);
        return { error: { status: 401, data: "Unauthorized" } };
      }
    }

    return baseQuery(args, api, extraOptions);
  };
};

export default RtkBaseQueryWithReauth;