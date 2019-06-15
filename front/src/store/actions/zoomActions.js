import axios from 'axios-api';

export const FETCH_MEETINGS_REQUEST = 'FETCH_MEETINGS_REQUEST';
export const FETCH_MEETINGS_SUCCESS = 'FETCH_MEETINGS_SUCCESS';
export const FETCH_MEETINGS_FAILURE = 'FETCH_MEETINGS_FAILURE';

export const FETCH_ACCOUNTS_REQUEST = 'FETCH_ACCOUNTS_REQUEST';
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
export const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE';

const fetchMeetingsRequest = () => ({type: FETCH_MEETINGS_REQUEST});
const fetchMeetingsSuccess = (zoomMeetings) => ({type: FETCH_MEETINGS_SUCCESS, zoomMeetings});
const fetchMeetingsFailure = (error) => ({type: FETCH_MEETINGS_FAILURE, error});

const fetchAccountsRequest = () => ({type: FETCH_ACCOUNTS_REQUEST});
const fetchAccountsSuccess = (accounts) => ({type: FETCH_ACCOUNTS_SUCCESS, accounts});
const fetchAccountsFailure = (error) => ({type: FETCH_ACCOUNTS_FAILURE, error});

export const fetchMeetings = () => {
  return dispatch => {
      dispatch(fetchMeetingsRequest());

      return axios.get('/zoom/meetings').then(
          response => {
              dispatch(fetchMeetingsSuccess(response.data))
          },
          error => dispatch(fetchMeetingsFailure(error))
      );
  }
};

export const fetchMeetingsById = (id) => {
    return dispatch => {
        dispatch(fetchMeetingsRequest());

        return axios.get('/zoom/meetings/' + id).then(
            response => {
                dispatch(fetchMeetingsSuccess(response.data))
            },
            error => dispatch(fetchMeetingsFailure(error))
        );
    }
};


export const fetchAccounts = () => {
    return dispatch => {
        dispatch(fetchAccountsRequest());

        return axios.get('/zoom/accounts').then(
            response => {
                dispatch(fetchAccountsSuccess(response.data))
            },
            error => dispatch(fetchAccountsFailure(error))
        );
    }
};