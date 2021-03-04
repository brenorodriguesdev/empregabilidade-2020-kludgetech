import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import { elevationShadowStyle } from '../components/commons';
import { StatusBar } from 'react-native';

export default function Intro({navigation}){

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#6271c0aa",
        },
        primary: {
            flex: 1,
            padding: 32,
            justifyContent: "flex-end",
            alignItems: "center"
        },
        text1: {
            fontSize: 56,
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#FFF",
            textShadowColor: "#000000"
        },
        text2: {
            fontSize: 16,
            textTransform: "uppercase",
            fontWeight: "600",
            color: "#FFF",
            textAlign: "center"
        },
        secundary: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 8
        },
        btn: {
            backgroundColor: "#FFF",
            width: 200,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8
        },
        btnText: {
            fontWeight: "bold",
            color: "#00000088"
        },
        shadow: elevationShadowStyle(3),
    })

    const { container, btn, btnText, primary, secundary, text1, text2, shadow } = styles;
    
    return(
        <>    
            <StatusBar barStyle="dark-content" backgroundColor="#6271c0aa" />
            <ImageBackground style={[container]} imageStyle={{opacity: 0.1}} source={require('../../assets/bg.jpg')}>
                <View style={primary}>
                    <Text style={[text1, shadow]}>H-Care</Text>
                    <Text style={text2}>Os melhores Profissionais perto de você</Text>
                </View>
                <View style={secundary}>
                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={[btn, shadow, {backgroundColor: "#6272c0"}]}>
                        <Text style={[btnText, {color: "white"}]}>Fazer Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={btn}>
                        <Text style={btnText}>Criar Conta</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        </>
    );
}