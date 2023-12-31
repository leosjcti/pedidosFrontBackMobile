import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import { Feather } from '@expo/vector-icons'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../../components/Header";


type RouteDetailParams = {
    FinishOrder: {
        number: string | number;
        order_id: string
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function FinishOrder() {
    const route = useRoute<FinishOrderRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    async function handleFinish() {
        try {
            await api.put('/order/send', {
                order_id: route.params?.order_id
            })
            navigation.popToTop();

        } catch (error) {
            console.log("Erro ao finalizar order ", error)
        }
    }

    function handleBackToEdit() {
        navigation.navigate('Order', {
            order_id: route.params?.order_id,
            number: route.params?.number
        })
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header />


            <View style={styles.form}>
                <Text style={styles.alert}> Finalizar pedido? </Text>
                <Text style={styles.title}> Mesa {route.params?.number}</Text>

                <View style={styles.buttonContainer}>

                    <TouchableOpacity style={styles.buttonBack} onPress={handleBackToEdit}>
                        <Text style={styles.buttonTextBack}>Voltar</Text>
                        <Feather name="edit" size={20} color='#1d1d2e' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleFinish}>
                        <Text style={styles.buttonText}>Finalizar</Text>
                        <Feather name="shopping-cart" size={20} color='#1d1d2e' />
                    </TouchableOpacity>
                </View>
            </View>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        backgroundColor: '#1d1d2e'
    },
    form: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
    },
    alert: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 12,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ff3f4b',
        marginBottom: 12,
    },

    button: {
        width: '32%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row"
    },
    buttonText: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: "bold",
        color: '#1d1d2e'
    },

    buttonBack: {
        width: '32%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 4,
        marginVertical: 12,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row"
    },
    buttonTextBack: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: "bold",
        color: '#1d1d2e'
    },

    buttonContainer: {
        flexDirection: "row",
    }
})