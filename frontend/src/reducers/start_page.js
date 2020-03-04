const initialState = {
    user: null,
    stage: "start page",
};


export default function startStageInfo (state = initialState, action) {
    switch (action.type) {
        case "SET_STAGE":
            return {...state, stage: action.payload};
        case "SET_USER":
            return {...state, user: action.payload};
        default:
            return state
    }
};