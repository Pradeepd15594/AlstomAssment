import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image'; ``
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { AlbumModel, TrackModel } from '../../Types/Album';
import { useSelector, useDispatch } from 'react-redux';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { StackParamList } from "../../Navigation/screens";
import { StackNavigationProp } from '@react-navigation/stack';
import CustomHeader from '../../Components/CustomHeader';


interface AlbumDetailsProps {
  route: any;
  navigation: StackNavigationProp<StackParamList, "AlbumDetails">;
}

const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
const isLandscape = width > height;


const AlbumDetails = ({ route: { params }, navigation }:AlbumDetailsProps) => {
  const { album: initialAlbum, albumId } = params;
  const dispatch = useDispatch();
  //   // Redux state
  const { albumsList, selectedAlbum, isConnected, orientation } = useSelector((state: any) => state.AuthSlice);
  const formatDuration = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).getFullYear().toString();
  };

  const renderTrack = (track: TrackModel, index: number) => (
    <View key={track.trackId || index} style={styles.trackItem}>
      <Text style={styles.trackNumber}>{track.trackNumber || index + 1}</Text>
      <View style={styles.trackInfo}>
        <Text style={styles.trackName} numberOfLines={2}>
          {track.trackName}
        </Text>
        {track.trackTimeMillis > 0 && (
          <Text style={styles.trackDuration}>
            {formatDuration(track.trackTimeMillis)}
          </Text>
        )}
      </View>
    </View>
  );

  const renderLoadingOverlay = () => {
    // if (!isFetching) return null;

    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.loadingText}>Loading details...</Text>
      </View>
    );
  };

  const renderErrorMessage = () => {
    // if (!error || detailedAlbum) return null;

    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {!isConnected
            ? 'No internet connection. Showing basic album info.'
            : 'Failed to load album details.'
          }
        </Text>
      </View>
    );
  };

  const artworkSize = orientation === 'PORTRAIT'
    ? Math.min(height * 0.6, 300)
    : Math.min(width * 0.7, 280);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader navigation={navigation} title="Album Details" />
      {/* {renderLoadingOverlay()} */}
      {/* {renderErrorMessage()} */}

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[
          styles.header,
          orientation === 'landscape' && styles.headerLandscape
        ]}>
          <FastImage
            source={{
              uri: selectedAlbum.artworkUrl600 || selectedAlbum.artworkUrl100,
              priority: FastImage.priority.high,
            }}
            style={[styles.artwork, { width: artworkSize, height: artworkSize }]}
            resizeMode={FastImage.resizeMode.cover}
          />

          <View style={[
            styles.albumInfo,
            orientation === 'landscape' && styles.albumInfoLandscape
          ]}>
            <Text style={styles.albumTitle}>{selectedAlbum.collectionName}</Text>
            <Text style={styles.artistName}>{selectedAlbum.artistName}</Text>
            <Text style={styles.genre}>{selectedAlbum.primaryGenreName}</Text>
            <Text style={styles.releaseDate}>
              Released: {formatDate(selectedAlbum.releaseDate)}
            </Text>

            {selectedAlbum.trackCount > 0 ? (
              <Text style={styles.trackCount}>
                {selectedAlbum.trackCount} track{selectedAlbum.trackCount !== 1 ? 's' : ''}
              </Text>
            ) : null}

            {selectedAlbum.collectionPrice ? (
              <Text style={styles.price}>
                {selectedAlbum.currency} {selectedAlbum.collectionPrice}
              </Text>
            ) : null}
          </View>
        </View>

        {selectedAlbum.tracks && selectedAlbum.tracks.length > 0 ? (
          <View style={styles.tracksSection}>
            <Text style={styles.sectionTitle}>Tracks</Text>
            {selectedAlbum.tracks.map((track: TrackModel, index: number) => renderTrack(track, index))}
          </View>
        ) : null}

        {selectedAlbum.copyright ? (
          <View style={styles.copyrightSection}>
            <Text style={styles.copyright}>{selectedAlbum.copyright}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    right: 16,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#007AFF',
  },
  errorContainer: {
    backgroundColor: '#ffe6e6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  errorText: {
    color: '#d8000c',
    fontSize: 14,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  headerLandscape: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  artwork: {
    borderRadius: 12,
    marginBottom: 16,
  },
  albumInfo: {
    alignItems: 'center',
  },
  albumInfoLandscape: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 20,
    marginTop: 0,
  },
  albumTitle: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  artistName: {
    fontSize: isTablet ? 20 : 18,
    color: '#666',
    marginBottom: 4,
  },
  genre: {
    fontSize: isTablet ? 16 : 14,
    color: '#999',
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: isTablet ? 14 : 12,
    color: '#999',
    marginBottom: 4,
  },
  trackCount: {
    fontSize: isTablet ? 14 : 12,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  tracksSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: isTablet ? 22 : 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  trackItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  trackNumber: {
    fontSize: isTablet ? 16 : 14,
    color: '#999',
    width: 30,
    textAlign: 'center',
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackName: {
    fontSize: isTablet ? 16 : 14,
    color: '#333',
    flex: 1,
  },
  trackDuration: {
    fontSize: isTablet ? 14 : 12,
    color: '#999',
    marginLeft: 8,
  },
  copyrightSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  copyright: {
    fontSize: isTablet ? 12 : 10,
    color: '#999',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default AlbumDetails;