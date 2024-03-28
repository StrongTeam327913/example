import { Signup } from "../Signup";
import { Splash } from "../Splash";
import {Chose_start} from "../Chose_start";

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Tab_navigation} from "../tab/Tabs";
import {Test} from "../Test";
import {Header} from "../header/Header";
import {HeaderSearch} from "../../component/FlastlistI";



const Stack = createNativeStackNavigator();
const option={
  headerShown:true,
  headerTitle:(props => <Header {...props} />),
}


export const Route=[
  <Stack.Screen name="signup" component={Signup} />,
  <Stack.Screen name="tab_navigation" component={Tab_navigation} />,
]
