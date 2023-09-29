import React, { useContext } from 'react'
import { View, Text, Image } from 'react-native'
import { Feather } from "@expo/vector-icons"
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { AuthContext } from "../../contexts/AuthContext";

export default function CustonDrawer(props) {

    const {user, signOut} = useContext(AuthContext)

    return (
        <DrawerContentScrollView {...props}>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={{ width: 150, height: 85 }}
                    resizeMode='contain'
                />

                <Text style={{ fontSize: 18, marginTop: 14, color:'#FFF' }}>
                    Bem-vindo
                </Text>

                <Text style={{ fontSize: 17, fontWeight:'bold',  marginBottom: 14, paddingHorizontal: 20, color:'#CCC'}} numberOfLines={1} >
                    {user && user.name}
                </Text>
            </View>
            <DrawerItemList {...props} />

            <DrawerItem 
                {...props}
                icon={ () => <Feather name="log-out" size={28} color="#ff3f4b" /> } 
                label={ () => ( <Text style={{color: 'white', fontSize: 17 }}>Sair</Text>) }
                onPress={() => signOut()}
            />


        </DrawerContentScrollView>
    )
}