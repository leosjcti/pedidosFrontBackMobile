import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Feather} from '@expo/vector-icons'

interface ItemProps {
    data: {
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
    };
    deleteItem: (item_id: string) => void;
}


export default function ListItem({data, deleteItem}: ItemProps) {

    function handleDeleteItem() {
        deleteItem(data.id)    
    }

    return (
        <View style={styles.container}>
            <Text style={styles.item}>{data.amount} - {data.name}</Text>

            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name="trash-2" color="#ff3f4b" size={25} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        backgroundColor: '#101026',
        marginBottom: 12,
        padding: 12,
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: '#8a8a8a'
    },
    item: {
        color: '#FFF'
    }

})