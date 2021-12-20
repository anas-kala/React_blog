import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from 'lodash';



export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPost());

    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // userIds.forEach(id => dispatch(fetchUser(id)));

    // an alternative for the above two commented-out lines of code is the following
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();       // value here means execute
}


// without having installed thunk, it would not be possible to return a function (THE OUTER FUNCTION, NOT THE ONE INSIDE IT) for the asynchronous code within this action
// an action should normally return a plain object, but with thunk we can return a function. we do that when we have asynchronous code.
// in other words, we do that when requesting an api from within the action.
export const fetchPost = () =>
    async dispatch => {
        const response = await jsonPlaceholder.get('/posts');

        dispatch(
            {
                type: 'FETCH_POSTS',
                payload: response.data
            }
        );
    }

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/user/${id}`);

    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
}



