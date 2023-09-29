import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CategoryProps } from "../../pages/Order";



interface ModalPickerProps {
    options: CategoryProps[];
    handleCloseModal: () => void;
    selectedItem: (item: CategoryProps) => void;
}

//Pega o tamanho da tela
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

export default function ModalPicker({ options, handleCloseModal, selectedItem }:ModalPickerProps) {

    function onPressItem(item: CategoryProps) {
        selectedItem(item);
        handleCloseModal();
    }

    //Percorre os itens de categoria
    const option = options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={ () => onPressItem(item)}>
            <Text style={styles.item}>{item?.name}</Text>
        </TouchableOpacity>
    ))


    return (
        <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderColor: '#8a8a8a',
        borderRadius: 4
    },
    option: {
        alignItems: 'flex-start',
        borderTopWidth: 0.8,
        borderTopColor: '#8a8a8a'
    },
    item: {
        margin: 18,
        fontSize: 14,
        fontWeight: "bold",
        color:'#101026'
    }
 
})