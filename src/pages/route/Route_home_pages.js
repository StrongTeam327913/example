
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Home} from "../Pages_home/Home";
import {Header} from "../header/Header";


const option={
    headerShown:true,
    headerTitle:(props => <Header {...props} />),
    // headerRight: null,
}

const optin_notheader={
    headerShown:false,
}


const Stack = createNativeStackNavigator();

export const Routr_home_pages=[
    <Stack.Screen name="home" component={Home} options={option}/>,

]
