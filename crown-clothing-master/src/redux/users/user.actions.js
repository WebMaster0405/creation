export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
});

//function is called and payload is passed into function parameter
//type is already set matching with user.reducer switch.case.value...