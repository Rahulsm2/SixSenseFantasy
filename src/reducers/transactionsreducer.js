const initialState = {
    sTransactions:[],
    usTransactions:[],
    totalAmount:0
}
const transactionsreducer = (state=initialState, action) => {
    switch(action.type){
        case 'UPDATE_S_TRANSACTIONS':
            return{...state,sTransactions:action.payload.sTransactions}
            break;
        case 'UPDATE_US_TRANSACTIONS':
            return{...state,usTransactions:action.payload.usTransactions}
            break;
        case 'UPDATE_TOTAL_AMOUNT':
            return{...state,totalAmount:action.payload.totalAmount}
            break;
        default:
            return state;
    }
}
export default transactionsreducer;