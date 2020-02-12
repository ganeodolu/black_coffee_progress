import { API_NAME, ERROR_NAME } from './constant.js'

const apiHandler = async ({ apiState }) => {
    try {
        const res = await fetch(`${API_NAME.URI}state=${apiState}`,
        // {
        //     headers: {
        //         authorization: "token ${PERSONALCODE}"
        //     }
        // }
        )
        if (res.ok) {
            const data = await res.json()
            return data
        }
    } catch (error) {
        throw new Error(ERROR_NAME.NO_ANSWER)
    }
}

export { apiHandler }