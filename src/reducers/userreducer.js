const initialState = {
    userData:null,
}
const userreducer = (state=initialState, action) => {
    switch(action.type){
        case 'UPDATE_USERDATA':
            return{...state,userData:action.payload.userData}
            break;
        default:
            return state;
    }
}
export default userreducer;