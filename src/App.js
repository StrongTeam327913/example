import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useEffect, useMemo, useState} from "react";
import NetInfo from "@react-native-community/netinfo";
import {Route} from "./route/Rute";
import {StyleSheet, Text, View} from "react-native";
import {All_text} from "../assets/All_text";
import {Styles} from "../assets/Styles";
import {Colors} from "../assets/Colors";
import {store} from "../redux/store/store";
import {Provider} from "react-redux";

const Stack = createNativeStackNavigator();

function App() {
    const [network, setNetwork] = useState(false);
    useMemo(() => {
        NetInfo.addEventListener(state => {
            setNetwork(state.isConnected);
        });
    }, [network]);


    if (network === true) {
        return (
            <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    {
                        Route.map(((value) => {
                        return value
                            }
                        ))
                    }
                </Stack.Navigator>
            </NavigationContainer>
            </Provider>
        );
    } else {
        return (
            <View style={[style.container,{}]}>
                <Text style={[Styles.txt, {fontWeight: 'bold'}]}>{All_text.check}</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
  container:{
      alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: Colors.gray
  },
})


export default App;
