import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import FinishOrder from "../pages/FinishOrder";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustonDrawer from "../components/CustomDrawer";

export type StackParamsList = {
    Dashboard: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
    FinishOrder: {
        number: number | string;
        order_id: string;
    };
}

const AppDrawer = createDrawerNavigator<StackParamsList>();
const Stack = createNativeStackNavigator<StackParamsList>();

export default function AppRoutes() {
    return (

        <AppDrawer.Navigator
            drawerContent={(props) => <CustonDrawer {...props} />}
            screenOptions={{
                headerShown: false,

                drawerStyle: {
                    backgroundColor: '#1d1d2e',
                    paddingTop: 20,
                },

                drawerActiveBackgroundColor: '#ff3f4b',
                drawerActiveTintColor: '#FFF',

                drawerInactiveBackgroundColor: '#F0F2FF',
                drawerInactiveTintColor: '#121212'
                

            }}
        >
            <AppDrawer.Screen
                name='Dashboard'
                component={Dashboard}
            />

            <AppDrawer.Screen
                name='Order'
                component={Order}
                options={{
                    drawerItemStyle: { height: 0 }
                  }}
                
            />

            <AppDrawer.Screen
                name='FinishOrder'
                component={FinishOrder}
                options={{
                    drawerItemStyle: { height: 0 }
                  }}
            />
        </AppDrawer.Navigator>




        // <Stack.Navigator>
        //     <Stack.Screen
        //         name="Dashboard"
        //         component={Dashboard}
        //         options={{ headerShown: false }}
        //     />

        //     <Stack.Screen
        //         name="Order"
        //         component={Order}
        //         options={{ headerShown: false }}
        //     />

        //     <Stack.Screen
        //         name="FinishOrder"
        //         component={FinishOrder}
        //         options={{ 
        //             title: 'Finalizando', 
        //             headerStyle:{
        //                 backgroundColor:'#1d1d2e'
        //             },
        //             headerTintColor: '#FFF'
        //         }}
        //     />
        // </Stack.Navigator>
    )
}