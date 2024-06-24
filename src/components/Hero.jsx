import React from 'react';

import CreateOrderForm from './CreateOrderForm'

function Hero({ showAddForm, setShowAddForm }) {
    const handleShowAddForm = () => {
        console.log(showAddForm)
        setShowAddForm(!showAddForm)
    }

    return (
        <>
        
        
        
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">PDF Merger</h1>
                    <p className="py-6">
                            Merge PDF files
                    </p>
                    <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary">New Merge</button>
                </div>
            </div>
        </div>
            {showAddForm && <CreateOrderForm />}
        </>
    )
}

export default Hero;