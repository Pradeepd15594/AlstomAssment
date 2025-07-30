import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { AlbumModel } from '../../Types/Album';
import { useSelector } from 'react-redux';
// import { usePrefetchAlbumDetailsMutation } from '../../Redux/Slices/AuthSlice';

interface AlbumCardProps {
  album: AlbumModel;
  onPress: (album: AlbumModel) => void;
  isTablet?: boolean;
}


// const orientation=useSelector((state: any) => state.AuthSlice.orientation);

export const AlbumCard: React.FC<AlbumCardProps> = ({ album, onPress }) => {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const styles = useStyles(width > 768);
//   const dispatch = ();
//   const [prefetchAlbumDetails] = usePrefetchAlbumDetailsMutation();

  const cardWidth = isTablet ? (width - 60) / 3 : (width - 40) / 2;

  const handlePress = () => {
    onPress(album);
  };

  const handleLongPress = () => {
    // Prefetch album details on long press
    // prefetchAlbumDetails(album.collectionId);
  };

  return (
    <TouchableOpacity
      style={[styles.container, { width: cardWidth, minHeight: 240 }]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      accessibilityLabel={`Album ${album.collectionName} by ${album.artistName}`}
    >
      <FastImage
        source={{
          uri: album.artworkUrl100,
          priority: FastImage.priority.normal,
        }}
        style={styles.artwork}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.info}>
        <Text style={styles.albumName} numberOfLines={2}>
          {album.collectionName}
        </Text>
        <Text style={styles.artistName} numberOfLines={1}>
          {album.artistName}
        </Text>
        <Text style={styles.genre} numberOfLines={1}>
          {album.primaryGenreName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const useStyles = (isTablet:boolean) => StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  artwork: {
    width: '100%',
    height: isTablet ? 180 : 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  info: {
    flex: 1,
  },
  albumName: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  artistName: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
    marginBottom: 2,
  },
  genre: {
    fontSize: isTablet ? 12 : 10,
    color: '#999',
  },
});