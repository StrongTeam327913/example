import {Dimensions, StyleSheet} from "react-native";
import normalize from "react-native-normalize";
import {Colors} from "./Colors";

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Styles = StyleSheet.create({
    txt: {
        color: Colors.withe,
        fontSize: normalize(15)
    },

    btn: {
        backgroundColor: Colors.green,
        height: normalize(50),
        width: normalize(110),
        alignSelf: 'center',
        borderRadius: normalize(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: normalize(20),
        flexDirection: 'row',
    }

})


export {Styles}
