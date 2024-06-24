import React from 'react'

function FileCard({file, deleteFile}) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl m-3 " style={{display: 'inline-block'}}>
            <div className="card-body">
                <div className="card-actions justify-end">

                    <button onClick={() => deleteFile(file.id)} className="btn btn-square btn-sm ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 20 20" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="w-20">
                    <img alt="PDF file icon" src="/src/assets/pdf.png" width='25px' height='25px' />

                </div>
                <span className='justify-self-end'>{file.original_name || 'untitled pdf'}</span>
            </div>
        </div>
    )
}


export default FileCard;