import React, {useEffect, useRef, useState} from "react";
import {View, ImageBackground, StyleSheet, Image, Text} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from "react-native-vector-icons/AntDesign";
import {Colors} from "../assets/colors/Coloes";
import {Styles} from "../assets/styles/Styles";
import {All_text} from "../assets/All_text/All_text";

function DropdownI({lable,Arr_item,width,change,changeId,idUni}:any){
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

  const  onpress=()=>{
      change(value)

  }

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[style.label, isFocus && { color: 'blue' }]}>
                    {lable}
                </Text>
            );
        }
        return null;
    };


    const [text_select,setText_select]=useState(null);

    return (
        <View style={style.container}>
            {renderLabel()}
            <Text style={Styles.caption}>{All_text.caption_dropdown}</Text>

            <Dropdown
                style={[style.dropdown, isFocus && { borderColor: 'blue',width:width }]}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={Arr_item}
                search
                // maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? lable : '...'}
                searchPlaceholder="جستجو..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                     // console.log('item',item)
                    change(item.label)
                    changeId(item.value)
                    // console.log('item.value',item.value)
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={style.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />

        </View>

    );
}

const style=StyleSheet.create({


    container: {
        backgroundColor: 'white',
        // padding: 10,
        margin:10
    },
    dropdown: {
        height: 40,
        borderColor: Colors.bluelight,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        // left: 90,
        right:23,
        top: 8,
        zIndex: 50,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color:Colors.black_txt
    },
    selectedTextStyle: {
        fontSize: 16,
        color:Colors.black_txt
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})


export {DropdownI}

