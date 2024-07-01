import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from '../Context';

const NavBar = () => {

  const { isLoggedIn, user } = useContext(CurrentUserContext)


  return (
    <div className="navbar bg-base-100 mb-10">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Merger</Link>
      </div>
      <div className="flex-none">
        {isLoggedIn ? (
          <>
            <div className='mr-1'>
              <Link to='/orders' className="btn btn-sm btn-primary mr-1">My merges</Link>
              <Link to='/create' className="btn btn-sm btn-primary btn-outline ml-1">New</Link>
              <span className='mr-1 ml-2'>{user.name}</span>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt={user.name}
                    src="/src/assets/avatar.jpg" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><Link to="/create">New Merge</Link></li>
                <li><Link to="/orders">My Merges</Link></li>
                <li><Link to="/logout">Logout</Link></li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to='/signup' className="btn btn-sm btn-primary btn-outline mr-1">Sign Up</Link>
            <Link to='/login' className="btn btn-sm btn-primary ml-1">Login</Link>
          </>

        )

        }

      </div>
    </div>
  )
}

export default NavBar;