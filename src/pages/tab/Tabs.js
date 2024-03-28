import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useEffect, useMemo, useState} from "react";
import {Colors} from "../../assets/colors/Coloes";
import Home_index from "../Pages_home/index";
import {Advertising_index} from "../pages_advertising/Advertising_index";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Styles} from "../../assets/styles/Styles";
import {Profile_index} from "../pages_profile/Profile_index";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import normalize from "react-native-normalize";


const BottomNav = createBottomTabNavigator();
const Tab = createBottomTabNavigator();

function Tab_navigation() {
    const [color_txtprofile, setColor_txtrofile] = useState<String>(Colors.Turquoise);
    const [home_color, setHome_color] = useState<String>(Colors.basick_blue);
    const [profile_color, setProfile_color] = useState<String>(Colors.basick_blue);
    const [advertising_color, setAdvertising_color] = useState<String>(Colors.basick_blue);

    const [data_focuse, setFocuse] = useState({
        homeFocuse: false,
        profileFocuse: false,
        advertisingFocuse: false,
    })


    useEffect(() => {
        setColor_txtrofile(Colors.gray)
    }, [])
    const home = () => {
        setHome_color(Colors.basick_blue)
        setProfile_color(Colors.gray)
        setAdvertising_color(Colors.gray)
    };

    const profile = () => {
        setHome_color(Colors.gray)
        setProfile_color(Colors.basick_blue)
        setAdvertising_color(Colors.gray)
    };


    const advertising = () => {
        setHome_color(Colors.gray)
        setProfile_color(Colors.gray)
        setAdvertising_color(Colors.basick_blue)
    };

    const insets = useSafeAreaInsets();
    return (
        <View style={{flex: 1}}>
            <BottomNav.Navigator
                initialRouteName={Home_index}
                tabBarOptions={{
                    activeTintColor: Colors.withe,
                    inactiveTintColor: Colors.withe,
                    showLabel: false,
                    tabStyle: {
                        borderRadius: 10,
                        backgroundColor: Colors.phirozLight,
                    }
                }}
                screenOptions={{
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: {
                        position: 'absolute',
                        right: normalize(20),
                        left: normalize(20),
                        bottom: normalize(10),
                        borderWidth: 1,

                        borderColor: Colors.bluelight,
                        alignSelf: 'center',
                        backgroundColor: Colors.phirozLight,
                        borderRadius:normalize(10),
                    }

                }}
            >

                <BottomNav.Screen name={'home_index'} component={Home_index} options={{

                    tabBarIcon: (focused) => {
                        // console.log('focused home', focused)
                        return (
                            <View style={[Styles.center, {}]}>
                                <Icon name="home" size={normalize(40)} color={home_color}/>
                                {/*<Text style={[Styles.text,{fontSize:10,color:Colors.withe}]}>{'صفحه اصلی'}</Text>*/}
                            </View>
                        )
                    }
                }}
                                  listeners={() => ({
                                      focus:e => { home()},
                                      tabPress: event => {
                                          home();
                                      }
                                  })}
                />


                <BottomNav.Screen name={'advertising_index'} component={Advertising_index} options={{
                    tabBarIcon: (props) => {
                        return (
                            <View style={[Styles.center, {}]}>
                                <Ionicons name="ios-add-circle-sharp" size={normalize(40)} color={advertising_color}/>
                                {/*<Text style={[Styles.text,{fontSize:10,color:Colors.withe}]}>{'صفحه اصلی'}</Text>*/}
                            </View>
                        )
                    }
                }}
                                  listeners={() => ({
                                      focus:e => {   advertising()},
                                      tabPress: event => {
                                          advertising();
                                      }
                                  })}
                />


                <BottomNav.Screen name={'profile_index'} component={Profile_index} options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={[Styles.center, {}]}>
                                <Icon name="user" size={normalize(40)} color={profile_color}/>
                                {/*<Text style={[Styles.text,{fontSize:13,color:color_txtprofile}]}>{'پروقایل'}</Text>*/}
                            </View>
                        )

                    }
                }}
                                  listeners={() => ({
                                      focus:e => {   profile()},
                                      tabPress: event => {
                                          profile();
                                      }
                                  })}
                />


            </BottomNav.Navigator>

        </View>
    );


}

const styles = StyleSheet.create({
    text: {
        fontSize:normalize(30),
    },
    view: {

        marginBottom: normalize(50),
        width: normalize(50), height: normalize(50),
        borderRadius:normalize(30),
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalize(5),
    },


})

export {Tab_navigation};
