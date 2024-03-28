import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

 function ButtonI({onpres,text,url,data ,style}:any) {
    const [count, setCount] = useState(0);
    const animation = useRef(new Animated.Value(0)).current;
    const scale = animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0.9] });

    const onPressIn = () => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        setTimeout(() => {
            Animated.spring(animation, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }, 200);
    };
    return (
            <View style={{alignItems:'center',justifyContent:'center'}}>
            <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
    <TouchableOpacity
    style={[styles.btn,style]}
    activeOpacity={1}
    onPressIn={onPressIn}
    onPress={onpres}
    onPressOut={onPressOut}>
    <Text style={styles.btnText}>{text}</Text>
        </TouchableOpacity>
        </Animated.View>
        </View>
);
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'space-evenly' },
    button: {
        backgroundColor: '#132a5c',
        marginBottom: 20,
        borderRadius: 10,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    btnText: {
        color: '#fff',
        fontSize: 25,
    },
    count: {
        fontSize: 30,
    },
});
export {ButtonI}
