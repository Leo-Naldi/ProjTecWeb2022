
export const validateSignIn = (data) => {

    // TODO use .env

    //console.log({ email: data.get('email'), password: data.get('password') })

    return fetch("http://localhost:8001/login/user", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: data.get('email'), password: data.get('password') })
    })
};

export default validateSignIn;