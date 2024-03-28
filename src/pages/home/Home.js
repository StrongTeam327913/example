import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    Animated, Easing, Image, Button, BackHandler, Alert, ActivityIndicator, RefreshControl
} from "react-native";
import {All_text} from "../../assets/All_text/All_text";
import {Colors} from "../../assets/colors/Coloes";
import {Styles} from "../../assets/styles/Styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import {SliderI} from "../../component/SliderI";
import * as Animatable from "react-native-animatable";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Appcontext} from "../../Appcontext/Appcontext";
import {Tab_navigation} from "../tab/Tabs";
import {Fecht_request, Fetch_response} from "../../fech_url/FechI";
import {Url} from "../../fech_url/url";
import {useDispatch, useSelector} from "react-redux";
import {setHomeInfo} from "../../redux/actions";
import {HomeInfo} from "../../redux/reducers/HomeInfo_reducer";
import normalize from "react-native-normalize";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {ImageSlider} from "react-native-image-slider-banner";

function Home(props: any, {navigation}: any) {
    const [value, setValue] = useState(0)
    const [auto_key, setAuti_key] = useState('')
    const [bookInfo, setBookInfo] = useState([])
    const [projectInfo, setProjectInfo] = useState([])
    const [teachInfo, setTeachInfo] = useState([])
    const [isRefresh, setIsRefresh] = useState(false);
    const [result_image, setResult_image] = useState([])
    const [ImageHome, setImageHome] = useState([])
    const dispatch = useDispatch();
    const {navigate} = useNavigation();
    // const anim = useRef(new Animated.Value(0)).current
    const [animation, setAnimation]: any = useState({
        visible_book_sell: false,
        type_book_sell: '',

        visible_utoring: false,
        type_utoring: '',

        visible_projeckt: false,
        type_projeckt: '',

        visible_survey: false,
        type_survey: '',
    })

    const utoring = 'tutoring';
    const projeckt = 'projeckt';
    const survey = 'survey';
    const book_sell = 'book_sell';
    const types = 'bounceOutLeft'


    useEffect(() => {
        AsyncStorage.getItem('auto_key').then(r => {
            setAuti_key(r)
        })
        ImageHome.length = 0
        Fetch_response(Url.tablighatImageHome).then(r => {
            if (r.lenght != 0) {
                r.map(value => {
                    ImageHome.push({img:Url.BanerImage+value.image})
                })
            }
        })

    }, [])
    useEffect(() => {
        AsyncStorage.getItem('auto_key').then(r => {
                const body = {auth_key: r}
                Fecht_request(Url.infoHome_page, {body}).then(async (r) => {
                    if (r.error != true) {
                        await setBookInfo(r.books)
                        await setTeachInfo(r.teach)
                        await setProjectInfo(r.projects)
                    } else {
                        setTimeout(() => {
                            setValue(1)
                        }, 100)
                    }
                })
            }
        )
    }, [auto_key])
    useEffect(() => {
        props.navigation.addListener("beforeRemove", e => {
            e.preventDefault();
            BackHandler.exitApp();
        });
    }, [props.navigation]);


    const tutoring = async (type: any, screen: any, belong: any) => {
        const body = {
            auth_key: auto_key,
            belong: belong,
            page: 1
        }
        Fecht_request(Url.All_advertise, {body}).then(async (r) => {
            // console.log('r', r)
            if (r.error == false) {
                if (screen == utoring) {
                    await setAnimation({visible_utoring: true, type_utoring: type})
                    setTimeout(() => {
                        navigate(screen, {data: r.ads})
                        setAnimation({visible_utoring: false, type_utoring: type})
                    }, 1000)
                }
                if (screen === projeckt) {

                    await setAnimation({visible_projeckt: true, type_projeckt: type})
                    setTimeout(() => {
                        navigate(screen, {data: r.ads})
                        setAnimation({visible_projeckt: false, type_projeckt: type})
                    }, 1000)
                }
                if (screen == survey) {
                    await setAnimation({visible_survey: true, type_survey: type})
                    setTimeout(() => {
                        navigate(screen, {data: r.ads})
                        setAnimation({visible_survey: false, type_survey: type})
                    }, 1000)
                }
                if (screen == book_sell) {
                    await setAnimation({visible_book_sell: true, type_book_sell: type})
                    setTimeout(() => {
                        navigate(screen, {data: r.ads})
                        setAnimation({visible_book_sell: false, type_book_sell: type})
                    }, 1000)
                }


            }
        })
    }

    const prop_tutoring = animation.visible_utoring ? {animation: animation.type_utoring} : {}
    const prop_projeckt = animation.visible_projeckt ? {animation: animation.type_projeckt} : {}
    const prop_survey = animation.visible_survey ? {animation: animation.type_survey} : {}
    const prop_book_sell = animation.visible_book_sell ? {animation: animation.type_book_sell} : {}

    const height = Dimensions.get('window').height;
    const result_height = height - 300
    const width = Dimensions.get('window').width;


    const Onrefresh = () => {
        setIsRefresh(true)
        AsyncStorage.getItem('auto_key').then(r => {
                const body = {auth_key: r}
                Fecht_request(Url.infoHome_page, {body}).then(async (r) => {
                    if (r.error != true) {
                        // getInfo(r)
                        await setBookInfo(r.books)
                        await setTeachInfo(r.teach)
                        await setProjectInfo(r.projects)
                    } else {
                        setTimeout(() => {
                            setValue(1)
                        }, 20000)
                    }
                })
            }
        )
        setIsRefresh(false)
    }


    if (bookInfo.length === 0 && teachInfo.length === 0 && projectInfo.length === 0) {
        return (
            value === 0 ? <View style={[Styles.center, {flex: 1}]}>
                <ActivityIndicator size="large" color={Colors.phirozLight}/>
            </View> : <View style={[Styles.center, {flex: 1,}]}>
                <Text>{All_text.againReapet1}</Text>
                <Text>{All_text.againReapet2}</Text>
            </View>
        )
    } else {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isRefresh}
                        onRefresh={Onrefresh}
                    />
                }
                contentContainerStyle={{paddingBottom: normalize(100), backgroundColor: Colors.withe}}

            >
                <View style={[Styles.view, {paddingBottom: normalize(10)}]}>
                    {/* اسلایدراول*/}
                    <View>
                        <View style={[styles.container, {}]}>
                            <View style={[styles.view_title]}>
                                {/*<TouchableOpacity style={[styles.btn_top_slider,{}]}>*/}
                                <Text style={[styles.txt_tittle, {elevation: 1}]}>{All_text.Book_sales}</Text>
                                {/*</TouchableOpacity>*/}
                            </View>
                            <Animatable.View easing={'ease-in-out'} duration={1000}
                                             style={styles.view} {...prop_book_sell}>
                                <View key={types}>
                                    <TouchableOpacity
                                        onPress={() => tutoring(types, book_sell, 'book')}
                                        style={[styles.btn_top_slider, {}]}>
                                        <MaterialIcons name={'keyboard-arrow-left'} size={normalize(35)}
                                                       color={Colors.black_txt}/>
                                        <Text style={[styles.txt_top_btn, {}]}>{All_text.see_all}</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        </View>
                        <SliderI data={bookInfo} position={'teach'} bolee={true}/>
                    </View>

                    {
                        ImageHome.length != 0 ?
                            <View style={[{marginTop: normalize(20), marginBottom: normalize(10)}]}>
                                <ImageSlider
                                    data={ImageHome}
                                    // onItemChanged={(item) => console.log("item", item)}
                                    // closeIconColor="#fff"
                                    autoPlay={true}
                                    showIndicator={false}
                                    timer={10000}
                                    // headerCenterComponent={<Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>Header</Text>}
                                    //  headerStyle={{ backgroundColor: 'rgba(0,0,0, 0.6)',}}
                                    // onClick={(item, index) => {alert('hello'+index)}}
                                    caroselImageStyle={{height: normalize(250),}}
                                    // indicatorContainerStyle={{top: 50}}
                                />
                            </View>
                            : null
                    }


                    <View>
                        <View style={[styles.container, {}]}>
                            <View style={[styles.view_title]}>
                                {/*<TouchableOpacity style={[styles.btn_top_slider,{}]}>*/}
                                <Text style={[styles.txt_tittle, {elevation: 1}]}>{All_text.Tutoring}</Text>
                                {/*</TouchableOpacity>*/}
                            </View>


                            <Animatable.View easing={'ease-in-out'} duration={1000}
                                             style={styles.view} {...prop_tutoring}>
                                <View key={types}>
                                    <TouchableOpacity
                                        onPress={() => tutoring(types, utoring, 'teach')}
                                        style={[styles.btn_top_slider, {}]}>
                                        <MaterialIcons name={'keyboard-arrow-left'} size={normalize(35)}
                                                       color={Colors.black_txt}/>
                                        <Text style={[styles.txt_top_btn, {}]}>{All_text.see_all}</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        </View>
                        <SliderI data={teachInfo} position={'teach'}/>
                    </View>


                    <View style={[Styles.center,{alignSelf:'center',marginTop:normalize(30),width:width-50,height:normalize(80),borderTopRightRadius:normalize(20),borderBottomLeftRadius:normalize(20),borderWidth:1,borderColor:Colors.bluelight}]}>
                        <Text numberOfLines={3} style={[Styles.text,{textAlign:'center'}]}>اپلیکیشن کاغذ و تمامی پرسنل ان هیچ گونه مسئولیتی در قبال اگهی های کاربران در بخش های مختلف اپلیکیشن ندارند</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create(
    {
        container: {
            justifyContent: 'space-between',
                margin
        :
            normalize(10),
                flexDirection
        :
            'row-reverse',
                alignItems
        :
            'center'
        }
    ,


        view_header: {
            borderWidth: 1,
                justifyContent
        :
            'center',
                flexDirection
        :
            'column',

        }
    ,
        view_top_headerr: {
            flex: 1,
                margin
        :
            normalize(10),
                marginTop
        :
            normalize(10),
                flexDirection
        :
            'row-reverse',
                justifyContent
        :
            'space-between',
        }
    ,
        view_btn: {
            width: normalize(50),
                height
        :
            normalize(50),
                borderRadius
        :
            normalize(30),
                borderWidth
        :
            1,
                justifyContent
        :
            'center',
        }
    ,
        btn: {
            alignItems: 'center',
                justifyContent
        :
            'center',
                width
        :
            normalize(50),
                height
        :
            normalize(50),
                borderRadius
        :
            normalize(30),
                borderWidth
        :
            1,
        }
    ,
        view_txt_top_slider: {
            flexDirection: 'row-reverse',

        }
    ,
        btn_top_slider: {
            justifyContent: 'center',
                alignItems
        :
            'center',
                // borderWidth:1,
                borderRadius
        :
            5,
                height
        :
            normalize(50), width
        :
            normalize(80),
                marginTop
        :
            normalize(10),

        }
    ,
        view_animation_btn: {
            marginRight: 30,

        }
    ,

        view_margin: {
            //     margin:7,
            // width:100,
            // marginRight:30

        }
    ,
        txt_top_btn: {
            fontFamily: 'iransans_bold',
                right
        :
            normalize(-35), position
        :
            'absolute', marginTop
        :
            normalize(5),
                fontSize
        :
            normalize(14), color
        :
            Colors.black_txt

        }
    ,

        txt_tittle: {
            color: Colors.black_txt,
                // fontWeight: 'bold',
                fontFamily
        :
            'iransans_bold',
                fontSize
        :
            normalize(15),
        }
    ,
        view: {
            // height: 50,
            // margin: 20,
            // backgroundColor: 'red',
            alignItems: 'center',
                justifyContent
        :
            'center'
        }
    ,
        type: {
            color: '#fff',
                fontSize
        :
            normalize(17)
        }
    ,
        view_title: {
            borderBottomLeftRadius: normalize(15),
                borderTopRightRadius
        :
            normalize(15),
                alignItems
        :
            'center',
                justifyContent
        :
            'center',
                width
        :
            normalize(70),
                height
        :
            normalize(40),
                borderWidth
        :
            1,
                borderColor
        :
            Colors.bluelight
        }


    }
)
export
    {
        Home
    }

