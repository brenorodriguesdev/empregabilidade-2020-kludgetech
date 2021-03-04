import React, { useState, useEffect } from 'react';

import { ScrollView } from 'react-native';

import { MessageBox } from '../components/commons';

const baseUrl = "https://apihcare.herokuapp.com/api/upload/";

import api from '../services/api';

export default function Messages({ route }) {

    const [conversa, setConversa] = useState([]);

    const { user } = route.params;
    useEffect(() => {

        async function loadConversas() {
            const conversas = await api.post("/chats", {
                user: user._id,
            });

            setConversa(conversas.data);
        }
        loadConversas();
    }, []);


    return (
        <>
            <ScrollView>
                {conversa.map((conversa, key) => (
                    <MessageBox key={key} name={user._id == conversa.userReceive._id ? conversa.userSend.name : conversa.userReceive.name} chat={conversa._id} img={`${baseUrl}${user._id == conversa.userReceive._id ? conversa.userSend.CPF : conversa.userReceive.CPF}.jpg`} yourUser={user._id == conversa.userReceive._id ? conversa.userReceive : conversa.userSend} />
                ))}
            </ScrollView>
        </>
    );
}