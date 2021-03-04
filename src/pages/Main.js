import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect, subscribeToNewUsers } from '../services/socket';

function Main({ navigation, route }) {
  const [users, setUsers] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');


  const [lat, setLatitude] = useState();
  const [lon, setLongitude] = useState();
  const [notifications, setNotifications] = useState();

  const { user } = route.params;

  const myUser = user;

  useEffect(() => {

    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setLongitude(longitude);
        setLatitude(latitude);

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })

        const response = await api.post('/notifications', {
          user
        });

        setNotifications(response.data);
      }
    }

    loadInitialPosition();
  }, []);

  async function loadUsers() {
    const response = await api.post('/getUsersByDistance', {
      "lat": lat,
      "lon": lon,
      "dist": 50
    });

    console.log(response.data);
    setUsers(response.data);
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
        style={styles.map}
      >
        {users.map(user => (
          <Marker
            key={user._id}
            coordinate={{
              longitude: user.lon,
              latitude: user.lat,
            }}
          >
            <Image
              style={styles.avatar}
              source={{ uri: `https://apihcare.herokuapp.com/api/upload/${user.CPF}.jpg` }}
            />
            <Callout onPress={() => {
              navigation.navigate('Perfil', {
                user,
                myUser
              });
            }}>
              <View style={styles.callout}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userBio}>{user.biography}</Text>
                <Text style={styles.userTechs}>{user.specialty}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar serviço..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={loadUsers} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },

  callout: {
    width: 260,
  },

  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  userBio: {
    color: '#666',
    marginTop: 5,
  },

  userTechs: {
    marginTop: 5,
  },

  searchForm: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#6271c0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
})

export default Main;