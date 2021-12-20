import jsonPlaceholder from "../apis/jsonPlaceholder"

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
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    }
    );
}