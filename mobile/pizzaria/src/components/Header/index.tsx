import React, { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

//Pega o tamanho da tela
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

export default function Header() {

    
    return (
        <View style={styles.container}>
            <Image 
            style={styles.image} 
            source={require('../../assets/logo.png')}
            resizeMode='contain' 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 100,
    
    } 
})