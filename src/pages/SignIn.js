import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    ImageBackground,
    StatusBar
} from 'react-native';

import {
    TextInput,
} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { elevationShadowStyle } from '../components/commons';

import api from '../services/api';

export default function SignIn({navigation}){

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#6271c0",
        },
        primary: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF"
        },
        secundary: {
            flex: 0.5,
            padding: 32,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "#FFFFFF"
        },
        inputs: {
            // height: 64,
            width: 250,
            backgroundColor: "#fff",
            marginBottom: 16
        },
        text1: {
            fontSize: 56,
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#6271c0",
            textShadowColor: "#000000"
        },
        text2: {
            fontSize: 16,
            textTransform: "uppercase",
            fontWeight: "600",
            color: "#6271c0",
            textAlign: "center"
        },
        shadow: elevationShadowStyle(3),

    });

    const { container, primary, inputs, text1, text2, shadow, secundary} = styles;

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    async function SignInPost() {
        const post = await api.post('/signin', {
            email,
            password
        });

        if(post.data.error != null) {
            return null;
        } else {
            navigation.navigate("Main", {
                user: post.data.user
            });
        }
    }
    
    return(
        <>    
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
            <ImageBackground style={[container]} imageStyle={{opacity: 0.1}} source={require('../../assets/bg.jpg')}>
                <View style={secundary}>
                    <Text style={[text1, shadow]}>H-Care</Text>
                    <Text style={text2}>Os melhores Profissionais perto de você!</Text>
                </View>
                <View style={primary}>
                    <TextInput
                        mode="outlined"
                        label='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={inputs}
                        keyboardType="email-address"
                    />
                    <TextInput
                        mode="outlined"
                        label='Senha'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={inputs}
                        secureTextEntry={true}
                        textContentType="password"
                    />
                    <TouchableOpacity 
                        style={
                            { height: 40, backgroundColor: "#6271c0", 
                            justifyContent:"center", alignItems: "center", 
                            borderRadius: 12, width: 250, marginBottom: 8
                            }}
                            onPress={()=> SignInPost()}
                            >
                        <Text style={{fontWeight: "bold", color: "white"}}>CONECTAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Esqueci minha senha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 8}} onPress={()=> navigation.navigate("SignUp")}>
                        <Text>Criar Conta</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>
    );
}