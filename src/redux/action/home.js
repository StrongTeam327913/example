import {HOME, } from "../type";


 const setHome = (info:any) => {
    return {type: HOME, payload: info };
};


export {setHome}
