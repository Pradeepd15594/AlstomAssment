import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";


/**
 * Define the navigation props
 */
type ScreenNavigationProps=CompositeNavigationProp<StackNavigationProp<StackParamList>>;
type AlbumDetailsProps = RouteProp<StackParamList, "AlbumDetails">;


/**
* @CONTAINS PAGE NAME & PARAMETERS that each Screen can take. 
*/

export type StackParamList={
    Dashboard:undefined;
    AlbumDetails:ParamsData;
}

interface ParamsData{
    params:any;
}