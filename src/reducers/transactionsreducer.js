const initialState = {
    players: {},
    playersSelected: {}

}
const transactionsreducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_PLAYERS':
            return { ...state, players: action.payload.players }
            break;
        case 'UPDATE_SELECTED_PLAYERS':
            return { ...state, playersSelected: action.payload.playersSelected }
            break;
        default:
            return state;
    }
}
export default transactionsreducer;