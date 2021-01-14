import  { useEffect, useState } from 'react'


export default httpClient => {
    const [error, setError] = useState(null)

    useEffect(() => {
        httpClient.interceptors.request.use(request => {
            setError(null)
            return request
        })
        httpClient.interceptors.response.use(response => response, error => {
            console.log(error);
            setError(error)
        })
    }, [httpClient.interceptors.request, httpClient.interceptors.response])

    const errorConfirmedHandler = () => {
        setError(null)
    }

    return [error, errorConfirmedHandler]
}