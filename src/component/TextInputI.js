import React, { useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import {Colors} from "../assets/colors/Coloes";


 function TextInputI({bottom,value,width,height,placeholder,onChange,multiline,aligntext,type,top,defaultValue}:any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  // console.log('value',value)
   // console.log('onchange',onchange)





  return (
     //
      <View>
      <AnimatedInput value={value} bottom={bottom} defaultValue={defaultValue} top={top} onChange={onChange} placeholder={placeholder} multiline={multiline} width={width} aligntext={aligntext} height={height} type={type}/>
      </View>

  );


}

function AnimatedInput({ bottom,value, onChange, placeholder, multiline ,width,height,aligntext,type,top,defaultValue}:any) {
  const [inputHeight, setHeight]:any = useState(null);
  const [placeholderWidth, setWidth]:any = useState(null);
  const animation = useRef(new Animated.Value(0)).current;

  const onchange=(text:any)=>{
    onChange(text)
  }


  const translateY = animation.interpolate({
    inputRange: [0,0.5, 1],
    outputRange: [0, 0.5,-inputHeight / 3],
  });
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -placeholderWidth / 4],
  });
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });
  const onFocus = () => animate(1);
   const onBlur = () => !value && animate(0);
  const animate = (val:any) => {
    // console.log('val',val)
    Animated.spring(animation, {
      toValue: val,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View
      style={styles.inputContainer}
      onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
      {/*<View style={[{ height: inputHeight },styles.placeholderContainer ]}>*/}

        <Animated.Text
          style={[
            styles.placeholder,
            {top:top ,bottom:bottom, transform: [{ translateY }, { translateX }, { scale }] },
          ]}
          onTextLayout={e =>
            !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
          }>

          {placeholder}

        </Animated.Text>
      {/*</View>*/}


            <View>

      <TextInput
        style={[
          styles.input
           && {width:width, height: height, textAlignVertical: 'top' },
        ]}
        defaultValue={defaultValue}
        onFocus={onFocus}
         onBlur={onBlur}
        textAlign={aligntext}
        onChangeText={text => onchange(text)}
        multiline={multiline}
        scrollEnabled={true}
        numberOfLines={5}
        // autoFocus={true}
        // multiline={multiline}
          keyboardType={type}
      />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.bluelight,
    marginBottom: 25,
    flexDirection:'row-reverse',
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
  },
  placeholderContainer: {

    position: 'absolute',
    backgroundColor: 'red',
    justifyContent: 'center',

  },
  placeholder: {
    fontSize: 17,
    position: 'absolute',
    marginHorizontal: 5,
    paddingHorizontal: 5,
     top:10,
    backgroundColor: '#fff',
    color: Colors.black_txt,
  },
});
export {TextInputI}
