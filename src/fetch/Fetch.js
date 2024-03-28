import {ToastAndroid} from "react-native";


const Fetch_response = (url: any) => {
    try {
        return fetch(url)
            .then((response) => response.json())
            .then((json) => {
                return json
            })
            .catch((error) => console.error(error))
            // .finally((r) => console.log(r));
    } catch (e) {
        ToastAndroid.showWithGravity(
            'خطایی درخ داده است لطفا بعدا مجداا امتحان کنید',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    }
}


export {Fetch_response}
