import React, { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import Header from "../../components/Header";

const Stack = createNativeStackNavigator();

export default function Dashboard() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [number, setNumber] = useState('');

    async function openOrder() {
        if (number === '') {
            return;
        }

        //Precisa fazer a requisicao e abrir a mesa e navegar para proxima tela.
        const response = await api.post('/order', {
            table: Number(number)
        })

        navigation.navigate('Order', {
            number: number,
            order_id: response.data.id
        })

        setNumber('')
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header />

            <KeyboardAvoidingView style={styles.form} behavior="padding" enabled>

                <Text style={styles.title}> Novo pedido </Text>

                <TextInput
                    placeholder="Numero da mesa"
                    placeholderTextColor="#f0f0f0"
                    style={styles.input}
                    keyboardType="numeric"
                    value={number}
                    onChangeText={setNumber}
                />

                <TouchableOpacity style={styles.button} onPress={openOrder}>
                    <Text style={styles.buttonText}>Abrir mesa</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#1d1d2e',
    },
    form: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 24,
    },
    input: {
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: "center",
        fontSize: 22,
        color: '#FFF'
    },
    button: {
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#101026'
    }
})