interface ApiPathType {
    /**Album Management */
    getSarchAlbums: string;
    
    /**Auth Management */
    refreshToken: string;
 
}
  
const ApiPath: ApiPathType = {
    /**Album Management */
    getSarchAlbums: `search` as const,

    refreshToken: `refreshToken` as const,
};
  
export default ApiPath;