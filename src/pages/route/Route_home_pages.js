
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Home} from "../Pages_home/Home";
import {Header} from "../header/Header";
import {Book_sell} from "../Pages_home/Book_sell";
import {Colors} from "../../assets/colors/Coloes";
import {Projeckt} from "../Pages_home/Project";
import {Tutoring} from "../Pages_home/Tutoring";
import {Survey} from "../Pages_home/Survey";
import {Make_bigimage, Read_item} from "../Pages_home/Read_item";



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
