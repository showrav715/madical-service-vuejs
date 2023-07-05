
import axios from 'axios'

const myaxios = axios.create({
    baseURL: 'http://localhost/medical/api/'
})

export default myaxios