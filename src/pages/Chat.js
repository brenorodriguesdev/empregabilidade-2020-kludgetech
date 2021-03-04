import React, { useState, useEffect } from 'react';

import {

    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    StyleSheet
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';


import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../services/api';

export default function Chat({ navigation, route }) {

    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);

    const styles = StyleSheet.create({
        inputs: {
            backgroundColor: "#cccccc55",
            height: 40,
            padding: 8
        },
        chip: {
            backgroundColor: "#c3c3c3aa",
            marginVertical: 2,
            padding: 8,
            borderRadius: 15,
            fontSize: 12,
            fontWeight: "600"
        }
    });

    const { inputs, chip } = styles;

    const { yourUser, user, chat } = route.params;

    useEffect(() => {

        async function loadConversas() {
            const msg = await api.post("/messages", {
                chat,
            });

            setMessages(msg.data);

        }
        loadConversas();

    }, []);




    async function sendMsg(msg) {

        const response = await api.post('/send', {
            text: message,
            userSend: yourUser,
            userReceive: user,
            chat,
        });

        setMessages([...messages, {
            text: message,
            userSend: yourUser,
            userReceive: user,
            chat,
            createAt: Date.now
        }]);

        setMessage('');
    }



    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'white'
        }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    marginBottom: 16,
                    paddingTop: 16
                }}>
                    {messages.map((conversa, key) => (

                        (conversa.userSend._id != yourUser._id) ?
                            <View key={key} style={{ alignItems: "flex-start", marginTop: 8, borderTopColor: "#d2d2d255", borderTopWidth: 0.3 }}>
                                <Text onPress={() => null} style={chip}>{conversa.userSend.name}:{conversa.text}</Text>
                                <Text onPress={() => null} style={{ paddingLeft: 12, fontSize: 12, color: "#d2d2d2aa" }}>{conversa.createAt}</Text>
                            </View>
                            :
                            <View key={key} style={{ alignItems: "flex-end", marginTop: 8, borderTopColor: "#d2d2d255", borderTopWidth: 0.3 }}>
                                <Text onPress={() => null} style={[chip, { backgroundColor: "#8ab0edaa" }]}>{conversa.userSend.name}:{conversa.text}</Text>
                                <Text onPress={() => null} style={{ paddingLeft: 12, fontSize: 12, color: "#d2d2d2aa" }}>{conversa.createAt}</Text>
                            </View>

                    ))}
                </View>
            </ScrollView>
            <View style={{ flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", padding: 4, borderColor: "#d2d2d255", borderWidth: 1 }}>
                <TextInput
                    value={message}
                    onChangeText={text => setMessage(text)}
                    style={[inputs, { flexWrap: "wrap", width: 300 }]}
                    placeholder="Digite sua mensagem"
                    keyboardType="default"
                    multiline={true}
                />
                <TouchableOpacity onPress={sendMsg} style={{ justifyContent: "space-between", alignItems: "center", backgroundColor: "#328da8", padding: 8, width: 40, height: 40, borderRadius: 20 }}>
                    <Icon name="arrow-right" color="white" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
}