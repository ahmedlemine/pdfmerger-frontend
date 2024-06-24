import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// import OrderSteps from './OrderSteps';

const FileForm = ({ order, uploadFile, uploadError }) => {
    // const [currentStep, setCurrentStep] = useState()
    const [pdf, setPdf] = useState()
    const [showForm, setShowForm] = useState(true)

    const handleChange = (e) => {
        setPdf(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPdf('')
        uploadFile(pdf, order.id)
        
        // console.log("current step==== ", currentStep)
        // setId(currentOrder.id)
        // console.log("ID: ", currentOrder.id)
        // updateStep(3)


    }




    return (
        <>
            {showForm && 
            <div className='flex items-center justify-center'>

            
            <div className="mt-10 bg-base-200 text-center w-4/5 border-2">
                <div className='mt-10'>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-4'>
                            <label>Add a file to the merge</label>
                        </div>
                        <div className='mt-4'>
                            <input type="hidden" name="order" />
                            <input type="file"
                                className="file-input file-input-bordered file-input-outline w-full max-w-xs"
                                placeholder="add a file to merger"
                                onChange={(e) => handleChange(e)}
                                name="filename" />
                        </div>
                        <div className='mt-4'>
                            <button type="submit"
                                className="btn btn-neutral btn-outline mb-5">Upload</button>

                        </div>
                        {uploadError &&
                            <div role="alert" className="alert alert-error mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{uploadError}</span>
                            </div>
                        }
                    </form>

                </div>
            </div>
            </div>
            }

        </>

    )
};
export default FileForm;

