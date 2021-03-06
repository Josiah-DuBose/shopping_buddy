import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

const Maps =({position, searchResults, theme, onPress}) => {
    return ( 
        <View style={theme.mapContainer}>
            { position && position.longitude && position.latitude ? 
                <MapView
                    region={{
                        latitude: position.latitude,
                        longitude: position.longitude,
                        latitudeDelta: 0.009,
                        longitudeDelta: 0.004,
                    }}
                    style={theme.mapContainer}
                    showsUserLocation={true}
                >
                { searchResults ? 
                    searchResults.map((marker, index) => (
                        <MapView.Marker key={index}
                            coordinate={marker.latlng}
                            title={marker.name}
                            description={marker.address}
                            onPress={onPress}
                        />
                    )) : null
                }
                </MapView>
                : null
            }
        </View>
    );
}

export { Maps };