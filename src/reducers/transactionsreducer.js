const initialState = {
    sTransactions:[],
    usTransactions:[],
    totalAmount:0,
    saffsList:[],
    selectedFilter:'all',
    filteredStaffsList:[],
    validationsTrasactions:[],
    totalvalidationsEntries:0
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
        case 'UPDATE_STFFS_LIST':
            return{...state,saffsList:action.payload.saffsList}
            break;
        case 'UPDATE_SELECTED_FILTER':
            return{...state,selectedFilter:action.payload.selectedFilter}
            break;
        case 'UPDATE_FILTERED_STAFF':
            return{...state,filteredStaffsList:action.payload.filteredStaffsList}
            break;
        case 'UPDATE_VALIDATED_TRANSACTIONS':
            return{...state,validationsTrasactions:action.payload.validationsTrasactions}
            break;
         case 'UPDATE_TOTAL_ENTRIES':
            return{...state,totalvalidationsEntries:action.payload.totalvalidationsEntries}
            break;
        default:
            return state;
    }
}
export default transactionsreducer;