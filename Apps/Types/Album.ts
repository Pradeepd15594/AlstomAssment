export interface InitialStatePropsModel {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    image: string;
    password: string;
    email: string;
    mobile: string;
    empId: string;
    roleId: string;
    accessToken: string;
    refreshToken: string;
    roleName: string;
    albumsList:AlbumModel[];
    selectedAlbum:AlbumModel;
    isConnected:boolean;
    orientation:OrientationType
}

export type OrientationType = "PORTRAIT" | "LANDSCAPE";

export interface AlbumModel {
    wrapperType:             string;
    kind:                    string;
    collectionId:            number;
    trackId:                 number;
    artistName:              string;
    collectionName:          string;
    trackName:               string;
    collectionCensoredName:  string;
    trackCensoredName:       string;
    collectionArtistId:      number;
    collectionArtistViewUrl: string;
    collectionViewUrl:       string;
    trackViewUrl:            string;
    previewUrl:              string;
    artworkUrl30:            string;
    artworkUrl60:            string;
    artworkUrl100:           string;
    collectionPrice:         number;
    trackPrice:              number;
    trackRentalPrice:        number;
    collectionHdPrice:       number;
    trackHdPrice:            number;
    trackHdRentalPrice:      number;
    releaseDate:             Date;
    collectionExplicitness:  string;
    trackExplicitness:       string;
    discCount:               number;
    discNumber:              number;
    trackCount:              number;
    trackNumber:             number;
    trackTimeMillis:         number;
    country:                 string;
    currency:                string;
    primaryGenreName:        string;
    contentAdvisoryRating:   string;
    shortDescription:        string;
    longDescription:         string;
    hasITunesExtras:         boolean;
}

export interface TrackModel{
    trackId: number;
    trackName: string;
    trackNumber: number;
    trackTimeMillis: number;
}
