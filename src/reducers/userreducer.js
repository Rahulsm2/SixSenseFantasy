const initialState = {
    userData:null,
    appConfigs:null,
    nodeUserData:null
}
const userreducer = (state=initialState, action) => {
    switch(action.type){
        case 'UPDATE_USERDATA':
            return{...state,userData:action.payload.userData}
            break;
        case 'UPDATE_NODE_USERDATA':
            return{...state,nodeUserData:action.payload.nodeUserData}
            break;
        case 'UPDATE_APP_CONFIGS':
            return{...state,appConfigs:action.payload.appConfigs}
            break;
        default:
            return state;
    }
}
export default userreducer;