import React from 'react';
import { Marker } from 'react-native-maps';
import { View } from 'react-native';
import MapView from 'react-native-maps';

const Maps =({position, searchResults, theme, onClick}) => {
    return ( 
        <View style={theme.mapContainer}>
            { position && position.longitude && position.latitude ? 
                <MapView
                    region={{
                        latitude: position.latitude,
                        longitude: position.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={theme.mapContainer}
                    showsUserLocation={true}
                >
                { searchResults ? 
                    searchResults.map((marker, index) => (
                        <Marker key={index}
                            coordinate={marker.latlng}
                            title={marker.name}
                            description={marker.address}
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