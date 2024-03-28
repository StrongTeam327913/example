import { Signup } from "../Signup";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Tab_navigation} from "../tab/Tabs";
import {Header} from "../header/Header";


const Stack = createNativeStackNavigator();
const option={
  headerShown:true,
  headerTitle:(props => <Header {...props} />),
}


export const Route=[
  <Stack.Screen name="signup" component={Signup} />,
  <Stack.Screen name="tab_navigation" component={Tab_navigation} />,
]
