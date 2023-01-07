import { avatarClasses } from "@mui/material";

export const validateSignIn = async (data) => {

    return fetch("http://localhost:8001/login", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(data => { console.log(data); return data; })
};

export default validateSignIn;