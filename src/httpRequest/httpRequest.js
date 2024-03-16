import axios from "axios";


export const postRequest = async (url, data) => {

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response;
    } catch (err) {
        console.log(err)
    }
}

export const getRequest = async (url) => {

    console.log('getrequest',url)
    try {
        const response = await axios.get(url)
        return response
    } catch (err) {
        console.log(err)
    }
}