import React, {useEffect, useRef, useState} from "react";
import {View, ImageBackground, StyleSheet, Image} from "react-native";
import { Checkbox } from 'react-native-paper';


function CheckboxI({Onpress,value}){
        const [checked, setChecked] = React.useState(false);
        const onpress=()=>{
          if (value!=false){
              Onpress(false)
          }else {
              Onpress('checked')
          }
        }
        return (
            <Checkbox
                status={value ? 'checked' : 'unchecked'}
                onPress={() => {
                    onpress()
                }}
            />
        );
    };
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        height: 250,
        width: 250
    }
});

export {CheckboxI}

