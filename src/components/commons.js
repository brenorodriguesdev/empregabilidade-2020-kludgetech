
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import api from '../services/api';

export function MenssagesButton() {
    const navigation = useNavigation();
    const routes = useRoute();


    return (
        <>
            <TouchableOpacity style={{ position: "absolute", right: 16 }} onPress={() => navigation.navigate("Messages", { user: routes.params.user })}>
                <Icon name="comments" size={24} color="#d2d2d2" />
                <View style={{ position: "absolute", backgroundColor: "#F11444AA", bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6 }}></View>
            </TouchableOpacity>
        </>
    );
}

export function elevationShadowStyle(elevation) {
    return {
        elevation,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0.5 * elevation },
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * elevation
    };
}


export function MessageBox({ name, lastMessage, img, chat, yourUser }) {
    const navigation = useNavigation();
    const routes = useRoute();

    async function viewMessages() {
        const response = await api.put('/view', {
            chat,
            user: routes.params.user
        })

        console.log(response.data);
    }

    return (
        <TouchableOpacity style={{
            borderBottomColor: "#d2d2d2",
            borderBottomWidth: 1,
            padding: 4,
            backgroundColor: "#FFF"
        }}
            onPress={() => { navigation.navigate("Chat", { chat: { _id: chat }, yourUser, user: routes.params.user }); viewMessages(); }}
        >
            <View style={{
                flexDirection: "row",
                paddingHorizontal: 16,
                paddingVertical: 8
            }}>
                <Image
                    source={{ uri: img }}
                    style={{ width: 40, height: 40, borderRadius: 20, marginRight: 16 }}
                />
                <View style={{
                    flex: 1,
                }}>
                    <Text>{name}</Text>
                    <Text numberOfLines={1}>{lastMessage}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
