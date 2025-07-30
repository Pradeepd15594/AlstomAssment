import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

interface Props {
  navigation: any;
  title: string;
}

const CustomHeader: React.FC<Props> = ({ navigation, title }) => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Assets/left-arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 24 }} />
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
    headerContainer: {
      height: 60,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      justifyContent: 'space-between',
    },
    headerTitle: {
      color: '#000',
      fontSize: 18,
      fontWeight: '600',
    },
    backIcon: {
      width: 18,
      height: 18,
      tintColor: '#000', // if you want to tint the PNG
      resizeMode: 'contain',
    },
    backButton: {
      width: 45,
      height: 45,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.06)',
    },
  });
  
