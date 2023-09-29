import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import { Feather } from '@expo/vector-icons'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


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

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.alert}> Finalizar pedido? </Text>
            <Text style={styles.title}> Mesa {route.params?.number}</Text>

            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.buttonText}>Finalizar</Text>
                <Feather name="shopping-cart" size={20} color='#1d1d2e' />
            </TouchableOpacity>

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
        width: '65%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:"row"
    },
    buttonText: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: "bold",
        color: '#1d1d2e'
    }
})