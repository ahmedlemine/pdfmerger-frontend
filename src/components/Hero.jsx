import React from 'react';

import CreateOrderForm from './CreateOrderForm'

function Hero({ hideHero, setHideHero, showAddForm, setShowAddForm }) {
    const handleShowAddForm = () => {
        setHideHero(v => !v)
        setShowAddForm(v => !v)
    }

    return (
        <>
        
        
        {!hideHero && 
        <div className="hero bg-base-200 min-h-300">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">PDF Merger</h1>
                    <p className="py-6">
                            Merge PDF files
                    </p>
                    <button onClick={handleShowAddForm} className="btn btn-primary">New Merge</button>
                </div>
            </div>
        </div>}
            {showAddForm && <CreateOrderForm />}
        </>
    )
}

export default Hero;