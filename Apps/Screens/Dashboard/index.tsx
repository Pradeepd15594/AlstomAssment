import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  Dimensions,
  InteractionManager,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AlbumCard } from '../../Components/AlbumCard';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { AlbumModel } from '../../Types/Album';
import { useLazyGetSarchAlbumsQuery } from '../../Services/AuthService';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAlbum } from '../../Redux/Slices/AuthSlice';

interface DashboardProps {
  navigation: any;
}



const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
  const dispatch=useDispatch();
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const orientation=useSelector((state: any) => state.AuthSlice.orientation);
  const [loadAlbums, { data, isLoading, isFetching, error }] = useLazyGetSarchAlbumsQuery();
  const albumsList:AlbumModel[]=useSelector((state: any) => state.AuthSlice.albumsList);
  //   const [loading, setLoading] = useState(true);
  //   const [refreshing, setRefreshing] = useState(false);
  const [isOffline, setIsOffline] = useState(false);


  useEffect(() => { 
    console.log('useEffect');
   InteractionManager.runAfterInteractions(() => {
      loadAlbumsData();
      // Alert.alert('Albums', JSON.stringify(albums));
      console.log('useEffect');  console.log('useEffect');  console.log('useEffect');
    });

    const unsubscribe = NetInfo.addEventListener((state) => {
      //   setIsOffline(!state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onRefresh = () => {
    loadAlbumsData();
  };

  const navigateToAlbumDetails = (album: AlbumModel) => {
    console.log('album', album);
    dispatch(setSelectedAlbum(album));
    navigation.navigate('AlbumDetails', { album });
  };

  const renderAlbumCard = ({item}: {item: AlbumModel}) => (
    <View style={{ flex: 1, marginHorizontal: 10, paddingTop: 16 }} >
      <AlbumCard
        album={item}
        onPress={navigateToAlbumDetails}
        isTablet={isTablet}
      />
    </View>
  );


  const loadAlbumsData = async () => {
    try {
      // console.log('loadAlbumsData');
      const albumsData = await loadAlbums('jack johnson');
      // console.log(JSON.stringify(albumsData));

    } catch (error) {
      console.error('Load Albums Error:', error);
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      {isOffline && (
        <View style={styles.offlineIndicator}>
          <Text style={styles.offlineText}>Offline Mode - Showing cached data</Text>
        </View>
      )}
      <FlatList
        data={albumsList}
        key={isTablet ? 'tablet' : 'mobile'}
        renderItem={renderAlbumCard}
        keyExtractor={(item) => `${item.trackId}-${item.trackName}`}
        numColumns={isTablet ? 3 : 2}
        columnWrapperStyle={{justifyContent: 'space-between', alignItems: 'center', gap: 0 }} // ✅ spacing between columns
        // ItemSeparatorComponent={() => <View style={{ height:0 }} />}
        contentContainerStyle={styles.listContainer}
        // refreshControl={
        //   <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        // }
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:0
  },
  listContainer: {
    width:'100%'
  },
  offlineIndicator: {
    backgroundColor: '#ff9500',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  offlineText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});