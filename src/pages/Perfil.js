import React, { useState, useEffect} from 'react';

import { 
    View, 
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';

import api from '../services/api';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Chip } from 'react-native-paper';

export default function Perfil({navigation, route}) {

    const styles = StyleSheet.create({
        textName: {
            fontSize: 24,
            fontWeight: "700",
        },
        textLocal: {
            fontSize: 18,
            fontWeight: "600"
        },
        hateContainer: {
            flexDirection: "row",
            marginTop: 8,
            paddingTop: 8,
            justifyContent: "space-between"
        },
        textHate: {
            fontSize: 14,
            fontWeight: "700",
            textTransform: "uppercase"
        },
        feedbacks: {
            alignItems: "center"
        },
        textFeedbacks: {
            fontSize: 22
        },
        chips: {
            marginRight: 8,
            marginBottom: 8
        }
    });

    const { 
        textName,
        textLocal,
        hateContainer,
        textHate,
        feedbacks,
        textFeedbacks,
        chips
    } = styles;



    const { user, myUser } = route.params;

    async function Contactar() {
        const contato = await api.post('/contact', {
            userSend: myUser,
            userReceive:user,
            text: "Olá, tudo bem?"
        })

        console.log(contato.data);
    }

    return(
        <>
                <ImageBackground source={{uri: `https://apihcare.herokuapp.com/api/upload/${user.CPF}.jpg`}} style={{flex: 1}}>
                    <View style={{
                        flex: 1,
                        position: "absolute",
                        top: 32,
                        left: 16,
                    }}>
                        <TouchableOpacity style={{flex: 1, width: 30, height: 30}} onPress={()=> navigation.goBack()}>
                            <Icon name="arrow-left" size={24} color="#FFFFFFAA"/>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            <ScrollView style={{flex: 1}}>
                <View style={[{flex: 1, flexDirection: "column", padding: 32}]}>
                    <Text style={textName}>{user.name}</Text>
                    {/* <Text style={textLocal}>{`${user.adress}, ${user.city}, ${user.district}`}</Text>  */}
                    <Text style={textLocal}>{`${user.profession}`}</Text> 
                    <View style={hateContainer}>
                        <View style={feedbacks}>
                            <Text style={textHate}>Atendidos</Text>
                            <Text style={textFeedbacks}>83</Text>
                        </View>
                        <TouchableOpacity>
                            <View style={feedbacks}>
                                <Text style={textHate}>Comentários</Text>
                                <Text style={textFeedbacks}>78</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={feedbacks}>
                                <Text style={textHate}>Avaliação</Text>
                                <Text style={textFeedbacks}>5/5</Text>
                            </View>
                        </TouchableOpacity>
                    </View>   

                        <View style={{marginTop: 16}}>
                            <Text style={{fontSize: 16, fontWeight: "700", opacity: 0.6, marginVertical: 16}}>Especialidades</Text>
                            <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                                <Chip onPress={() => console.log('Clicou')} style={chips}>{user.specialty}</Chip>
                            </View>
                        </View>

                        <View style={{marginTop: 16}}>
                            <Text numberOfLines={4}>{user.biography}</Text>
                        </View>

                        <TouchableOpacity 
                        style={{height: 40, backgroundColor: "#0d8ed4", borderRadius: 150, justifyContent: "center", alignItems: "center", marginTop: 16}}
                        onPress={()=> {
                            Contactar();
                            navigation.navigate("Messages",{user: route.params.user});
                        }}>
                            <Text style={{color: "white", fontWeight: "700"}}>Contactar</Text>
                        </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}