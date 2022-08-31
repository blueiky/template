
export interface GlobalState {
    userInfo?: Record<string, any>;
}


const initialState: GlobalState = {

}


export default function store(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}
