export const validateSignIn = (data) => new Promise((onSuccess, onFailiure) => {

    // send data over to server and return the promise? bah

    setTimeout(() => onSuccess('giovanni', []), 1000);
});

export default validateSignIn;