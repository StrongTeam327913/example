import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {View, ImageBackground, Text, TouchableOpacity, StyleSheet, Dimensions, ToastAndroid} from "react-native";
import {All_text} from "../../assets/All_text/All_text";
import {Colors} from "../../assets/colors/Coloes";
import {Styles} from "../../assets/styles/Styles";
import Icon from "react-native-vector-icons/FontAwesome";
import {AnimatedTileScrolling, SliderI} from "../../component/SliderI";
import {useNavigation} from "@react-navigation/native";
import {Appcontext} from "../../Appcontext/Appcontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Fecht_request, Fetch_response} from "../../fech_url/FechI";
import {Url} from "../../fech_url/url";
import normalize from "react-native-normalize";


function Header() {
    const [value, setValue]: any = useState(false);
    const [color_book, setColor_book]: any = useState();
    const [color_survey, setColor_Survey]: any = useState();
    const [color_project, setColor_Project]: any = useState();
    const [color_tutoring, setColor_tutoring]: any = useState();
    const [auth_key, setAuth_key]: any = useState(':any')

    const {navigate} = useNavigation()
    useMemo(() => {
        setTimeout(() => {
            generateColor1()
            generateColor2()
            generateColor3()
            generateColor4()

        }, 3000)
    }, [color_tutoring])


    const generateColor1 = () => {
        // const randomColor = Math.floor(Math.random() * 256)
        //     .toString(16)
        //     .padStart(6, '0');
        let ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        setColor_book(ColorCode)
        return {
            color: `#${ColorCode}`
        };

    };


    const generateColor2 = () => {
        // const randomColor = Math.floor(Math.random() * 256)
        //     .toString(16)
        //     .padStart(6, '0');
        let ColorCode = 'rgb(' + (Math.floor(Math.random() * 254)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        setColor_Project(ColorCode)
        return {
            color: `#${ColorCode}`
        };
    };

    const generateColor3 = () => {
        // const randomColor = Math.floor(Math.random() * 256)
        //     .toString(16)
        //     .padStart(6, '0');
        let ColorCode = 'rgb(' + (Math.floor(Math.random() * 253)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        setColor_Survey(ColorCode)
        return {
            color: `#${ColorCode}`
        };
    };
    const generateColor4 = () => {
        // const randomColor = Math.floor(Math.random() * 256)
        //     .toString(16)
        //     .padStart(6, '0');
        let ColorCode = 'rgb(' + (Math.floor(Math.random() * 252)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        setColor_tutoring(ColorCode)
        return {
            color: `#${ColorCode}`
        };
    };


    const height = Dimensions.get('window').height;
    const result_height =normalize( height - 300)
    const width = Dimensions.get('screen').width;


    useEffect(() => {
        AsyncStorage.getItem('auto_key').then(r => {
            setAuth_key(r)
        })
    }, [])

    const Move_list = (props: any) => {
        const body = {
            auth_key: auth_key,
            belong: props.belong,
            page:1
        }
        Fecht_request(Url.All_advertise, {body}).then(r => {
            // console.log('Move_list', r)
            if (r.error==false){
                navigate(props.page,{data:r.ads,})
            }
        })
    }


    const survay=()=>{
        const body={page:1}
        try {
            Fecht_request(Url.get_teache,{body}).then(r => {
                // console.log('get_teache',r)
                if (r.error==false){
                    navigate('survey',{data:r.professor})
                }else {
                    ToastAndroid.showWithGravity(
                        All_text.againReapet1,
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    );
                }
            })
        }catch (e) {

        }

    }

    return (
        <View style={{justifyContent: 'space-between', flex: 1, marginRight:normalize(30) }}>


            <View style={[styles.view_top_headerr, {}]}>

                <View style={[Styles.center, {}]}>
                    <TouchableOpacity
                        // onPress={()=>navigate('book_sell')}
                        onPress={() => Move_list({belong: 'book',page:'book_sell'})}
                        style={[styles.btn, {}]}>
                        <Icon name="book" size={normalize(40)} color={color_book}/>
                    </TouchableOpacity>
                    <Text style={[Styles.text_header_home]}>{All_text.Book_sales}</Text>
                </View>

                {/*<View style={[Styles.center, {}]}>*/}
                {/*    <TouchableOpacity*/}
                {/*        // onPress={() => navigate('projeckt')}*/}
                {/*        onPress={() => Move_list({belong: 'project',page:'projeckt'})}*/}

                {/*        style={[styles.btn,]}>*/}
                {/*        <Icon name="handshake-o" size={normalize(30)} color={color_project}/>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <Text style={[Styles.text_header_home]}>{All_text.Project}</Text>*/}
                {/*</View>*/}

                <View style={[Styles.center, {}]}>
                    <TouchableOpacity
                        // onPress={() => navigate('tutoring')}
                        onPress={() => Move_list({belong: 'teach',page:'tutoring'})}
                        style={[styles.btn, {}]}>
                        <Icon name="graduation-cap" size={normalize(40)} color={color_tutoring}/>
                    </TouchableOpacity>
                    <Text style={[Styles.text_header_home]}>{All_text.Tutoring}</Text>
                </View>

                <View style={[Styles.center, {}]}>
                    <TouchableOpacity
                        onPress={survay}
                        style={[styles.btn,]}>
                        <Icon name="comments-o" size={normalize(40)} color={color_survey}/>
                    </TouchableOpacity>
                    <Text style={[Styles.text_header_home]}>{All_text.Survey}</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    view_header: {
        // borderWidth: 1,
        // justifyContent: 'center',
        // flexDirection: 'column',
        flex: 1,
    },
    view_top_headerr: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginLeft:10,
        // marginRight:10

    },
    view_btn: {
        width:normalize(50),
        height: normalize(50),
        borderRadius: normalize(30),
        borderWidth: 1,
        justifyContent: 'center',
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        width:  normalize(70),
        height:  normalize(70),
        borderRadius: normalize(50),
        borderWidth: 1.5,
        borderColor: Colors.bluelight,
        backgroundColor: Colors.withe
    },
    view_txt_top_slider: {
        flexDirection: 'row-reverse',

    },
    btn_top_slider: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        height:  normalize(50),width:  normalize(150),

    },

    view_margin: {
        margin:  normalize(7),
    }


})
export {Header}

