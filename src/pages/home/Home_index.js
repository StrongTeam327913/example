import * as React from "react";
import {View, Text, TouchableOpacity, TextInput, StatusBar} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, connect, useSelector } from "react-redux";

import { useState } from "react";
import {Appcontext} from "../../Appcontext/Appcontext";
import {Routr_home_pages} from "../Routs/Route_home_pages";
import {Header} from "../header/Header";
import {Colors} from "../../assets/colors/Coloes";




const Stack = createNativeStackNavigator();
// const navigateRedux=connect()(NavigationContainer)
function Home_index() {

    const [key_position,setKey_position]=useState(0);
    const [height_view,setHeight_view]=useState(500);
    const [model_nothing,setModel_nothing]=useState(false);


    const data={
    }



    return (
        <Appcontext.Provider value={data}>
            <StatusBar backgroundColor={Colors.phirozLight}/>
            <Stack.Navigator
                screenOptions={{headerStyle:{backgroundColor:Colors.phirozLight}}
                }
            >
                {
                    Routr_home_pages.map(((value) => {
                            return value
                        }
                    ))
                }
            </Stack.Navigator>
        </Appcontext.Provider>
    );
}

export {Home_index};
