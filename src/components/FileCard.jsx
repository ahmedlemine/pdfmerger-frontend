import React from 'react'
import { FaXmark } from 'react-icons/fa6';

function FileCard({file, deleteFile}) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl m-3 " style={{display: 'inline-block'}}>
            <div className="card-body">
                <div className="card-actions justify-end">

                    <button onClick={() => deleteFile(file.id)} className="btn btn-square btn-sm ">
                        <FaXmark />
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