import axios from "axios"

const instance = axios.create({
    baseURL: 'https://burgerdatabase-4cbd2.firebaseio.com/'
})

export default instance;