import React from 'react'
import Modal from '../Modal/Modal'
import useHookErrorHandler from './hook_error-handler'


const errorHandler = (WrappedComponent, axiosData) => {

    return (props) => {

        const [error, clearError] = useHookErrorHandler(axiosData)

        return (

            <>
                <Modal show={error} ModalClosed={clearError} >
                    {
                        error ? error.message : null
                    }
                </Modal>
                <WrappedComponent {...props} />
            </>
        )
    }
}

export default errorHandler
