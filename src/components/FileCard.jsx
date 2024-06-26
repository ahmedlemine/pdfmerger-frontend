import React from 'react'
import { FaXmark } from 'react-icons/fa6';

function FileCard({file, deleteFile}) {
    return (
        <div key={file.id} className="card w-96 bg-base-100 shadow-xl m-3 " style={{display: 'inline-block'}}>
            <div className="card-body">
                <div className="card-actions justify-end">

                    <button onClick={() => deleteFile(file.id)} className="btn btn-square btn-sm text-sm">
                        <FaXmark />
                    </button>
                </div>
                <div className="w-20">
                    <img alt="PDF file icon" src="/src/assets/pdf.png" width='20px' height='20px' />

                </div>
                <span className='text-sm justify-self-end'>{file.original_name || 'untitled pdf'}</span>
            </div>
        </div>
    )
}


export default FileCard;