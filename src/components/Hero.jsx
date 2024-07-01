import { Link } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from '../Context';


const Hero = () => {
    const { isLoggedIn } = useContext(CurrentUserContext)



    return (
        <>
                <div className="hero min-h-screen">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">PDF Merger</h1>
                            <p className="py-6">
                                Merge PDF files securely!
                            </p>
                            {isLoggedIn ? (
                                <>
                                    <Link to='/create' className="btn btn-primary mr-2">New Merge</Link>
                                    <Link to='/orders' className="btn btn-primary btn-outline ml-2">My Merges</Link>
                                </>
                            ) : (
                                <Link to='/login' className="btn btn-primary">Login</Link>
                            )}
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Hero;