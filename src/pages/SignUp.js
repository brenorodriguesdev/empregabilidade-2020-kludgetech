import React, { useState, useEffect } from 'react';

import api from '../services/api';

import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

import { 
    View, 
    Text, 
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    useColorScheme
} from 'react-native';

import {
    TextInput,
    RadioButton,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default function Intro({navigation, route}){

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#FFFFFF",
        },
        primary: {
            flex: 1,
            padding: 32,
            justifyContent: "flex-start",
        },
        text1: {
            fontSize: 34,
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#000000aa"
        },
        text2: {
            fontSize: 22,
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#000000aa"
        },
        secundary: {
            alignItems: "center",
            justifyContent:"center"
        },
        inputs: {
            // height: 64,
            width: 300,
            backgroundColor: "#FFF",
            marginBottom: 16,
        }

    })

    const { container, primary, secundary, text1, text2, inputs } = styles;
    
    const [name, setName ] = useState();
    const [cpf, setCpf ] = useState("");
    const [email, setEmail ] = useState("");
    const [dtNascimento, setDtNascimento ] = useState("");
    const [endereco, setEndereco ] = useState("");
    const [bairro, setBairro ] = useState("");
    const [cidade, setCidade ] = useState("");

    const [profissao, setProfissao] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [bio, setBio] = useState("");
    const [matriculaPro, setMatriculaPro] = useState("");

    const [ perfil, setPerfil ] = useState();

    const [ isPro, setPro ] = useState("Cliente");

    const [ senha, setSenha ] = useState();

    async function getPermissionAsync(){
        if (Constants.platform.android) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
            alert('Desculpe, não conseguimos ter acesso a sua camera.');
            }
        }
    };

    function getImage(caminho) {
        setPerfil(caminho);
    }

    async function pickerImage(){
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if(!result.cancelled) {
                getImage(result.uri);
            }
            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    const [ latitude, setLatitude] = useState();
    const [ longitude, setLongitude] = useState();

    useEffect(() => {
        getPermissionAsync();

        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
      
            if (granted) {
              const { coords } = await getCurrentPositionAsync({
                enableHighAccuracy: true,
              });
      
              const { latitude, longitude } = coords;
      
              setLatitude(latitude);
              setLongitude(longitude);
            }
          }
      
          loadInitialPosition();

          console.log(latitude);
          console.log(longitude);
    })

    async function ImageUpload() {
        var data = new FormData();
        
        data.append('img', { 
            uri: Platform.OS === "android" ? perfil : perfil.replace("file://", ""), name: `${cpf}.jpg`, type: 'image/jpg' });

        await api.post('/upload',data, {
            headers: {
            'Content-Type': 'multipart/form-data',
            }
        });
    }


    const [ colorvalid, setColorValid] = useState("#d2d2d2");

    function ValidationTexts(text, limit) {
        if(text.length < limit) {
            return setColorValid("#fc033999")
        } else {
            return setColorValid("green")
        }
    }
    

    async function SignUpPost() {
        const post = await api.post("/signup", {
            email,
            password: senha,
            user:  {
                name: name,
                CPF: cpf,
                birthDate: dtNascimento,
                
                adress: endereco,
                city: cidade,
                district: bairro,

                profession: profissao,
                specialty: especialidade,
                biography: bio,
                registration: matriculaPro,
                lat: latitude,
                lon: longitude,
                isPro}
        });

        if(post.data.error != null) {
            return null
        } else {
            navigation.navigate("SignIn");
        }
    }

    return(
        <>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <ScrollView style={[container]}>
            <View style={[primary]}>
                <View>
                    <Text style={text1}>Foto</Text>
                    <Text style={text2}>Perfil</Text>
                </View>
                <View style={{alignItems: "center"}}>
                    <View style={{
                        borderWidth: 5,
                        borderColor: "#d2d2d2",
                        width: 140,
                        height: 140,
                        borderRadius: 70,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <TouchableOpacity onPress={() => pickerImage()}>
                        {((perfil == null) 
                            ? 
                            <Icon name="camera" size={70} color="#d2d2d2" />
                            : 
                            <Image source={{ uri: perfil }} style={{ width: 130, height: 130, borderRadius: 100 }} />
                            ) }
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={secundary}>
                <View style={{marginBottom: 32}}>
                        <TextInput
                            mode="outlined"
                            label='NOME'
                            value={name}
                            onChangeText={text => {
                                setName(text);
                                ValidationTexts(text, 3);
                            }}
                            theme={{
                                colors: {
                                    primary: colorvalid,
                                }
                            }}
                            style={inputs}
                        />
                        {
                            (`${name}`.length < 3) ?
                            <Text style={{ fontSize: 12, color: "#fc033999", marginBottom: 16}}>"Nome" deve conter pelo menos 3 caracteres.</Text>
                            :
                            null
                        }

                        <TextInput
                            mode="outlined"
                            label='CPF'
                            value={cpf}
                            onChangeText={text => setCpf(text)}
                            style={inputs}
                            keyboardType="number-pad"
                        />
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
                            label='Data de Nascimento'
                            value={dtNascimento}
                            onChangeText={text => setDtNascimento(text)}
                            style={inputs}
                        />
                        <TextInput
                            mode="outlined"
                            label='Senha'
                            value={senha}
                            onChangeText={text => setSenha(text)}
                            style={inputs}
                            secureTextEntry={true}
                            textContentType="password"
                        />
                </View>
                <View style={{marginBottom: 32}}>
                        <TextInput
                            mode="outlined"
                            label='Endereço'
                            value={endereco}
                            onChangeText={text => setEndereco(text)}
                            style={inputs}
                        />
                        <TextInput
                            mode="outlined"
                            label='Bairro'
                            value={bairro}
                            onChangeText={text => setBairro(text)}
                            style={inputs}
                        />
                        <TextInput
                            mode="outlined"
                            label='Cidade'
                            value={cidade}
                            onChangeText={text => setCidade(text)}
                            style={inputs}
                        />
                </View>

                <View style={{width: 250, marginBottom: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <View style={{marginBottom: 16, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <RadioButton
                        value="Cliente"
                        status={isPro === 'Cliente' ? 'checked' : 'unchecked'}
                        onPress={() => { setPro('Cliente'); }}
                        /><Text>Cliente</Text>
                    </View>
                    <View style={{marginBottom: 16, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <RadioButton
                        value="Profissional"
                        status={isPro === 'Profissional' ? 'checked' : 'unchecked'}
                        onPress={() => { setPro('Profissional'); }}
                        /><Text>Profissional</Text>
                    </View>
                </View>


                {(isPro == "Profissional") ?
                    <View style={{marginBottom: 32}}>
                        <TextInput
                            mode="outlined"
                            label='Profissão'
                            value={profissao}
                            onChangeText={text => setProfissao(text)}
                            style={inputs}
                        />
                        <TextInput
                            mode="outlined"
                            label='Especialidade'
                            value={especialidade}
                            onChangeText={text => setEspecialidade(text)}
                            style={inputs}
                        />
                        <TextInput
                            mode="outlined"
                            label='Biografia'
                            value={bio}
                            onChangeText={text => setBio(text)}
                            style={inputs}
                        />
                        <TextInput
                            mode="outlined"
                            label='Matricula Profissional Oficial'
                            value={matriculaPro}
                            onChangeText={text => setMatriculaPro(text)}
                            style={inputs}
                        />
                    </View>
                    :
                    null
                }



                <TouchableOpacity style={{
                    flex: 1,
                    width: 250,
                    height: 40,
                    backgroundColor: "#d2d2d2d2",
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 64
                }} onPress={() => {
                    SignUpPost();
                    ImageUpload();
                }
                } disabled={false}>
                    <Text>CRIAR</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </>
    );
}