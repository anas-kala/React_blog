import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from 'lodash';

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

// the fetchUser function calls the memoized function of the lodash library, to stop making a call to user when the id is the same.
// with this approach you can fetch each user with some id only once. the downside here, is that you cannot fetch the user with an id that has already
// been used for fetching that user, consequently, if the user in the api changes for some reason, you will not be able to fetch it once more. In that case: simply
// write a normal action for fetching the user every time like specified at the bottom of this file.
export const fetchUser = (id) => dispatch => _fetchUser(id, dispatch);

// the memoized version of fetchUser
const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
})



// // for fetching the user with the same id every time, use the following action
// export const fetchUser = (id) => async dispatch => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({
//         type: 'FETCH_USER',
//         payload: response.data
//     }
//     );
// }