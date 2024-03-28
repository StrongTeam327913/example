import React, {useEffect, useRef, useState} from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text, ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import {Styles} from "../assets/styles/Styles";
import {All_text} from "../assets/All_text/All_text";
import {Colors} from "../assets/colors/Coloes";
import {useNavigation} from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "jalali-moment";
import {Fecht_request} from "../fech_url/FechI";
import {Url} from "../fech_url/url";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import normalize from "react-native-normalize";


const {width} = Dimensions.get('window');
const itemWidth = (width / 3) * 1.75;
const padding = (width - itemWidth) / 1.75;
const offset = itemWidth;

function SliderI({data, position, bolee}: any) {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [DATA, setDATA] = useState([])
    const [Value, setValue] = useState(false)

    // useEffect(() => {
    //     if (data!=undefined){
    //         setValue(true)
    //         setDATA(data)
    //         console.log('data',data)
    //     }else {
    //         setValue(false)
    //     }
    // }, [data])
    return (
        <ScrollView
            horizontal
            pagingEnabled
            decelerationRate="normal"
            contentContainerStyle={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            snapToInterval={offset}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                useNativeDriver: false,
            })}
        >
            {
                // Value==true ?null
                data.map((x: any, i: any) => (
                    <Item key={x.id} i={i} scrollX={scrollX} data={x} position={position}/>
                ))
                // :null
            }
        </ScrollView>
    );
}

function Item({i, scrollX, data, position}: any) {
    const {navigate} = useNavigation();
    const [auto_key, setAuti_key]: any = useState('')
    const [startColor, setStartColor] = useState(Colors.yellow)
    const [startColor_home, setStartColor_home] = useState(Colors.gray)

    useEffect(() => {
        AsyncStorage.getItem('auto_key').then(r =>
            setAuti_key(r)
        )
    }, [])


    const scale = scrollX.interpolate({
        inputRange: [-offset + i * offset, i * offset, offset + i * offset],
        outputRange: [0.70, 1, 0.70],
    });


    const onPress_profile = (id: Number, pos: String) => {
        const body = {advertise_id: id, auth_key: auto_key}
        // if (pos == 'myadvertising') {
        Fecht_request(Url.edit_advertise, {body}).then(r => {
            // console.log('edit_advertise',r)
            if (r.error == false && r.data != null) {
                navigate('read_item_profile', {id: id, position: pos, data: r.data,views:r.views})
            } else {
                ToastAndroid.showWithGravity(
                    All_text.againReapet1,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
        })
        // }
    }



    const ShowNeshan = (id: Number) => {
        const body = {advertise_id: id, auth_key: auto_key}
        // if (pos == 'myadvertising') {
        Fecht_request(Url.getOneAdvertise, {body}).then(r => {
            // console.log('edit_advertise',r)
            if (r.error == false && r.data != null) {
                navigate('read_item_profile', {id: id, position: 'neshan', data: r.data})
            } else {
                ToastAndroid.showWithGravity(
                    All_text.againReapet1,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
        })
        // }
    }



    const onPress = (id: Number) => {
        const body = {
            advertise_id: id,
            auth_key: auto_key
        }
        try {
            // console.log('Url.showAdver',Url.showAdver)
            Fecht_request(Url.showAdver, {body}).then(r => {
                if (r.error == false) {
                    navigate('read_item', {data: r.data})
                } else {
                    ToastAndroid.showWithGravity(
                        All_text.againReapet1,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
            })
        } catch (e) {
            ToastAndroid.showWithGravity(
                All_text.againReapet1,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }


    }

    const delet = () => {
    }
    const update = () => {
    }
    const delet_start = (id: any) => {
        if (startColor == Colors.yellow) {
            const body = {
                advertise_id: id,
                auth_key: auto_key
            }
            // console.log('body', body)

            Fecht_request(Url.deletFav, {body}).then(r => {
                // console.log('restart_home', r)
// Alert.alert(r)
                if (r.error == false) {
                    setStartColor(Colors.withe)
                    ToastAndroid.showWithGravity(
                        'از لیست مورد علافه ها حذف شد',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    );
                } else {
                    ToastAndroid.showWithGravity(
                        'از لیست مورد علافه ها حذف نشد',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    );
                }
            })
        }

    }


    if (position === 'teach') {
        const banner = data.banner;
        // console.log('banner',banner)
        let val = new Date(data.date_publish * 1000);
        let persianDate = moment(val).locale('fa').format('YYYY/M/D ');
        return <Animated.View style={[styles.item, {transform: [{scale}]}]}>
            <TouchableOpacity
                onPress={() => onPress(data.id)}
            >
                <View style={[, {flexDirection: 'column'}]}>
                    <View style={[styles.view_item, {}]}>
                        {
                            banner != "N/A" ?
                                <Image
                                    resizeMode={'cover'}
                                    resizeMethod={'resize'}
                                    // data.banner
                                    source={{uri: Url.showImage + data.banner}}
                                    style={[Styles.image_slider, {width:itemWidth - 2}]}/>
                                : <Icon name="image" size={100} color={Colors.basick_green}/>
                        }
                    </View>

                    {/*<View style={{position: 'absolute'}}>*/}
                    {/*    <TouchableOpacity*/}
                    {/*        style={{width: 100, height: 50}}*/}
                    {/*        onPress={() => start_home(data.id)}*/}
                    {/*    >*/}
                    {/*        <MaterialCommunityIcons name={'star'} size={35} color={startColor_home}/>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}

                    <View style={[, {flexDirection: 'row-reverse'}]}>
                        <View style={[, {flexDirection: 'column', marginRight: 3}]}>
                            <View style={[styles.view_title, {}]}>
                                {/*<Text style={[styles.txt_slider_statick]}>{All_text.name_lesson}</Text>*/}
                                <Text numberOfLines={3} style={[styles.txt_slider_dinamic, {
                                    fontFamily: 'iransans_bold',
                                    height:normalize(80) ,
                                    width: normalize(180)
                                }]}>
                                    {data.title}
                                </Text>
                            </View>


                            <View
                                style={[styles.view_txt_item, {marginTop: normalize(1), position: 'relative', top: 5}]}>
                                {/*<Text style={[styles.txt_slider_statick]}>{All_text.cost}</Text>*/}
                                <Text style={[styles.txt_slider_dinamic]}>{data.price}</Text>
                            </View>

                            <View style={[{justifyContent: 'flex-end',}]}>
                                {/*<Text style={[styles.txt_slider_statick]}>{All_text.data + ' : '}</Text>*/}
                                <Text style={[styles.txt_slider_dinamic, {textAlign: 'right'}]}>{persianDate}</Text>
                            </View>


                        </View>

                        {/*<View style={[, {flexDirection: 'column', marginRight:  normalize(10)}]}>*/}
                        {/*    /!*<View style={[styles.view_txt_item, {}]}>*!/*/}
                        {/*    /!*<Text style={[styles.txt_slider_statick]}>{All_text.explain + ' : '}</Text>*!/*/}
                        {/*    /!*<Text style={[styles.txt_slider_dinamic]}>{data.name_lesson}</Text>*!/*/}
                        {/*/!*</View>*!/*/}
                        {/*</View>*/}
                    </View>


                </View>
            </TouchableOpacity>


        </Animated.View>;
    }



    if (position === 'myadvertising') {
        let val = new Date(data.date_publish * 1000);
        let persianDate = moment(val).locale('fa').format('YYYY/M/D ');
        const status = data.status;
        const baner = data.banner;
        return (
            <Animated.View style={[styles.item, {flex: 1, transform: [{scale}]}]}>
                <TouchableOpacity
                    onPress={() => onPress_profile(data.id, 'myadvertising')}
                >
                    <View style={[, {flexDirection: 'column'}]}>
                        <View style={[styles.view_item, {}]}>

                            {
                                baner == 'N/A' ?
                                    <View style={{
                                        height: normalize(110),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon name="image" size={normalize(110)} color={Colors.basick_green}/>
                                    </View>
                                    :
                                    <Image
                                        resizeMode={'cover'}
                                        resizeMethod={'resize'}
                                        // data.banner
                                        source={{uri: Url.showImage + data.banner}}
                                        style={[Styles.image_slider, {width:itemWidth-1}]}/>
                            }


                        </View>

                        <View style={[, {flexDirection: 'row-reverse'}]}>
                            <View style={[, {flexDirection: 'column',}]}>
                                <View style={[styles.view_title, {}]}>
                                    {/*<Text style={[styles.txt_slider_statick]}>{All_text.name_lesson}</Text>*/}
                                    <Text numberOfLines={3} style={[styles.txt_slider_dinamic, {
                                        fontFamily: 'iransans_bold',
                                        width:180,
                                        height:normalize(53) ,
                                    }]}>
                                        {data.title}
                                    </Text>
                                </View>


                                <View
                                    style={[styles.view_txt_item, {marginTop: normalize(5), position: 'relative', top: 5}]}>
                                    {/*<Text style={[styles.txt_slider_statick]}>{All_text.cost}</Text>*/}
                                    <Text style={[styles.txt_slider_dinamic]}>{data.price}</Text>
                                </View>

                                <View style={[{justifyContent: 'flex-end',}]}>
                                    {/*<Text style={[styles.txt_slider_statick]}>{All_text.data + ' : '}</Text>*/}
                                    <Text style={[styles.txt_slider_dinamic, {textAlign: 'right'}]}>{persianDate}</Text>
                                </View>


                            </View>


                        </View>
                    </View>
                    <View style={{}}>
                        {
                            status == 10 ?
                                <View style={[styles.view_result, {backgroundColor: Colors.green,}]}>
                                    <Text style={Styles.text}>{All_text.seccsusful}</Text>
                                </View>
                                :
                                <View style={[styles.view_result, {backgroundColor: Colors.line,}]}>
                                    <Text style={Styles.text}>{All_text.checkout}</Text>
                                </View>
                        }
                    </View>


                </TouchableOpacity>
            </Animated.View>


        )

    }

    if (position === 'neshan') {
        const banner = data.ads.banner;
        let val = new Date(data.ads.date_publish * 1000);
        let persianDate = moment(val).locale('fa').format('YYYY/M/D ');


        return <Animated.View style={[styles.item, {transform: [{scale}]}]}>
            <TouchableOpacity
                onPress={() =>ShowNeshan(data.advertise_id,)}
            >
                <View style={[, {flexDirection: 'column'}]}>
                    <View style={[styles.view_item, {}]}>
                        {
                            banner != "N/A" ? <Image
                                    resizeMode={'cover'}
                                    resizeMethod={'resize'}
                                    // data.banner
                                    source={{uri: Url.showImage+banner}}
                                    style={[Styles.image_slider, {width:itemWidth - 2}]}/>
                                : <Icon name="image" size={normalize(110)} color={Colors.basick_green}/>
                        }
                    </View>

                    <View style={{position: 'absolute',}}>
                        <TouchableOpacity
                            onPress={() => delet_start(data.advertise_id)}
                        >
                            <MaterialCommunityIcons name={'star'} size={normalize(30)} color={startColor}/>
                        </TouchableOpacity>
                    </View>

                    {/*<View style={{position: 'absolute'}}>*/}
                    {/*    <TouchableOpacity*/}
                    {/*        style={{width: 100, height: 50}}*/}
                    {/*        onPress={() => start_home(data.id)}*/}
                    {/*    >*/}
                    {/*        <MaterialCommunityIcons name={'star'} size={35} color={startColor_home}/>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}

                    <View style={[, {flexDirection: 'row-reverse'}]}>

                        <View style={[, {flexDirection: 'column', marginRight: 3}]}>
                            <View style={[styles.view_title, {}]}>
                                {/*<Text style={[styles.txt_slider_statick]}>{All_text.name_lesson}</Text>*/}
                                <Text numberOfLines={2} style={[styles.txt_slider_dinamic, {
                                    fontFamily: 'iransans_bold',
                                    height:normalize(73,"height") ,
                                    width:normalize(180,"width")
                                }]}>
                                    {data.ads.title}
                                </Text>
                            </View>


                            <View
                                style={[styles.view_txt_item, {marginTop: normalize(5), position: 'relative', top: 5}]}>
                                {/*<Text style={[styles.txt_slider_statick]}>{All_text.cost}</Text>*/}
                                <Text style={[styles.txt_slider_dinamic]}>{data.ads.price}</Text>
                            </View>

                            <View style={[{justifyContent: 'flex-end',}]}>
                                {/*<Text style={[styles.txt_slider_statick]}>{All_text.data + ' : '}</Text>*/}
                                <Text style={[styles.txt_slider_dinamic, {textAlign: 'right'}]}>{persianDate}</Text>
                            </View>

                        </View>


                    </View>


                </View>
            </TouchableOpacity>


        </Animated.View>;

    }


}

const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: padding,
        alignItems: 'center',
    },
    item: {
        height:itemWidth+20,
        width:itemWidth,
        backgroundColor: Colors.gray_background,
        // flexDirection:'row',
        borderRadius: normalize(10),
        borderWidth: 1,
        borderColor: Colors.basick_green,

    },

    view_item: {
        alignItems: 'center',
        justifyContent: 'center',


    },

    view_txt_item: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        margin: 2,
    },

    txt_slider_statick: {
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: Colors.txt
    },
    txt_slider_dinamic: {
        fontSize: normalize(15),
        // fontWeight: 'bold',
        fontFamily: 'vazir-fd',
        color: Colors.txt
    },
    view_result: {

        flexDirection: 'row',
        height: normalize(27),
        borderBottomLeftRadius: normalize(10),
        borderBottomRightRadius: normalize(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    view_title: {
        flexDirection: 'row-reverse',
        // alignItems: 'center',
        margin: 2,
    }


});

export {SliderI}
