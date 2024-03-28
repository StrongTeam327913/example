import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput, TouchableOpacity,
    View
} from 'react-native';
import {TextInputI} from "../component/TextInputI";
import {ButtonI} from "../component/ButtonI";
import {FechI, Fetch_response} from "../fech_url/FechI";
import {Styles} from "../assets/styles/Styles";
import {All_text} from "../assets/All_text/All_text";
import {Colors} from "../assets/colors/Coloes";
import {Appcontext} from "../Appcontext/Appcontext";
import {Chose_start} from "./Chose_start";
import ImagePicker from "react-native-image-crop-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import normalize from "react-native-normalize";
import {Url} from "../fech_url/url";

function Signup() {
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');

    const onpress = () => {
// FechI()

    }
    const [back_sign,setBack_sign]=useState(Colors.line)
    const [back_login,setBack_login]=useState('')

    const [color_sign,setcolor_sign]=useState(Colors.blue_gray)
    const [color_login,setcolor_login]=useState('')
    const [image, setImage] = useState('');
    const [BanerImage, setBanerImage] = useState(null);


    const width = Dimensions.get('screen').width;
    // const height = Dimensions.get('screen').height;

    const result_width =normalize( 300,"width") ;
    // const result_height = height - 200;

const {key_signup}=useContext(Appcontext)
    const {position1}=useContext(Appcontext)


    const {height_value}=useContext(Appcontext)
    const {height}=useContext(Appcontext)

useEffect(()=>{
    Fetch_response(Url.baner).then(r=>{
        setBanerImage(r.image)
    })
},[])

    const onpress_signup= () => {
        key_signup(0)
        height_value(normalize(500))
        setBack_sign(Colors.line)
        setBack_login(Colors.withe)
        setcolor_sign(Colors.blue_gray)
        setcolor_login(Colors.gray)
    }


    const onpress_login= () => {
        key_signup(1)
        height_value(normalize(200))
        setBack_login(Colors.line)
        setBack_sign(Colors.withe)

        setcolor_sign(Colors.gray)
        setcolor_login(Colors.blue_gray)
    }


    const press_image=()=>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImage(image.path)
            console.log(image.path)
        });
    }

    return (
        // <StatusBar backgroundColor={"#081eb1"}>
        <View style={[Styles.view_below_start, {flexDirection: 'column'}]}>

            <View style={{}}>
                <ImageBackground
                    source={{uri:Url.BanerImage+BanerImage}} style={[Styles.image_background,{justifyContent:'center'}]}>
                </ImageBackground>


            </View>



            <View style={style.container}>
                <View style={[style.view_center, {
                    height: height,
                    width: result_width,
                    elevation:5,
                    borderColor:Colors.bluelight,
                    borderWidth:1.5
                    // marginBottom:500

                }]}>
                    <View style={style.view_login_signup}>
                        <View style={{flexDirection:'column',alignItems:'center'}}>
                                <Text onPress={onpress_signup} style={[Styles.text,{color:color_sign}]}>{All_text.signup}</Text>
                                <View style={[{  backgroundColor:back_sign},style.viewLine]}/>
                         </View>

                        <View style={{flexDirection:'column',alignItems:'center'}}>
                            <Text onPress={onpress_login} style={[Styles.text,{color:color_login}]}>{All_text.login}</Text>
                            <View style={[{  backgroundColor:back_login},style.viewLine]}/>
                        </View>
                    </View>

                    {/*<View style={Styles.center}>*/}
                    {/*            <Chose_start/>*/}
                    {/*</View>*/}

                </View>



            </View>


        </View>

        // </StatusBar>

    );
}


const style = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: "center",
    },
    view_center: {
        borderRadius: 10,
        position: 'absolute',
        backgroundColor: '#fff',
       // top:-250,
        // bottom:-100
        // marginTop:20,
        // flex:1,
        // alignSelf:'center'
    },

    view_login_signup:{
      flexDirection:'row',
      justifyContent:'space-evenly',
margin:normalize(20),
    },
    viewLine:{
        height:1,
        width:normalize(70),
    },
    view_select_image:{
      position:'relative',
        bottom:normalize(100),alignSelf:'center',marginBottom:normalize(30)
    }

})


export {Signup}
