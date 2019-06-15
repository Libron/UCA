import {
    FETCH_ACCOUNTS_FAILURE,
    FETCH_ACCOUNTS_REQUEST, FETCH_ACCOUNTS_SUCCESS,
    FETCH_MEETINGS_FAILURE,
    FETCH_MEETINGS_REQUEST,
    FETCH_MEETINGS_SUCCESS
} from "../actions/zoomActions";

const initialState = {
    zoomMeetings: [],
    accounts: [],
    loading: true,
    accountLoading: true,
    error: null
};

const zoomReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MEETINGS_REQUEST:
            return {...state, loading: true};
        case FETCH_MEETINGS_SUCCESS:
            return {...state, zoomMeetings: action.zoomMeetings, loading: false};
        case FETCH_MEETINGS_FAILURE:
            return {...state, error: action.error, loading: false};
        case FETCH_ACCOUNTS_REQUEST:
            return {...state, accountLoading: true};
        case FETCH_ACCOUNTS_SUCCESS:
            return {...state, accounts: action.accounts, accountLoading: false};
        case FETCH_ACCOUNTS_FAILURE:
            return {...state, error: action.error.message, accountLoading: false};
        default:
            return state;
    }
};

export default zoomReducer;
