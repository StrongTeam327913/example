import {HOME} from "../type";

const initialState: any = {

}

export const Home_reducer = (State = initialState,action:any) => {
    const {type, payload} = action
    switch (type) {
        case HOME :
            return {
                payload
            }
        default:
            return State
    }
}
