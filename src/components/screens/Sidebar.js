import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../../App'
import {Loader} from '../../method/common'
import {Link} from 'react-router-dom'
import {suggessionUsers,followUser, unfollowUser} from '../../API-Calls/Data-provider'

const Sidebar = () => {
const {state, dispatch} = useContext(UserContext)
const [users, setUsers] = useState([])
const isAdministrator = '5edf5ddc0b47dc117f301ee5'

  const getSuggestUser = async () => {
    let userId = JSON.parse(localStorage.getItem("userInfo"));
    const data = await suggessionUsers();
    let filterdItem = data && data.filter((item) => item._id != userId._id);
    setUsers(filterdItem);
  };

  const follow = async (id) => {
    const data = await followUser(id);
    const user = await suggessionUsers();
    if (data) {
      setUsers(user);
    }
  };

  const unfollow = async (id) => {
    const data = await unfollowUser(id);
    const user = await suggessionUsers();
    if (data) {
      setUsers(user);
    }
  };

  useEffect(() => {
   getSuggestUser();
  }, []);

    return (
      <div className="sidebar">
        <div className="user-header d-flex align-items-center p-2">
          <img style={{width: "40px"}} src="https://scontent.fudr1-1.fna.fbcdn.net/v/t1.0-1/cp0/p40x40/89032796_2568881379999310_9071156969955393536_o.jpg?_nc_cat=100&_nc_sid=7206a8&_nc_ohc=1HgK80DWbWcAX_cW4aV&_nc_ht=scontent.fudr1-1.fna&oh=a9943d102e4ef3ac606dd30d9ba09087&oe=5F03D6C1" />
          <div>
            <h5 className="mb-0">{state && state.name}</h5>
            <p className="mb-0 text-13 text-black-50">{state && state.email}</p>
          </div>
        </div>
        <div className="user-suggestion mt-4">
          <h3 className=" text-15 text-black-50 mb-4">
            Recent Join people
          </h3>
          <ul className="p-0 m-0 list-unstyled">
            {users && users.length > 0 ?  users.map(user => {
              return(
            <li className="mb-3" key={user._id}>
              <div className="follow-suggestion d-flex">
                <div className="align-items-center d-flex  p-2 user-header w-100">
                  <img src="https://scontent.fudr1-1.fna.fbcdn.net/v/t1.0-1/cp0/p40x40/89032796_2568881379999310_9071156969955393536_o.jpg?_nc_cat=100&amp;_nc_sid=7206a8&amp;_nc_ohc=1HgK80DWbWcAX_cW4aV&amp;_nc_ht=scontent.fudr1-1.fna&amp;oh=a9943d102e4ef3ac606dd30d9ba09087&amp;oe=5F03D6C1" />
                   <Link className="text-body" to={`/user/${user._id}`}>
                  <div className="flex-grow-1 suggest-list">
                    <h5 className="mb-0">{user.name} {isAdministrator ==  user._id? <img className="official-icon" src="../../img/official.png"/> : ''}</h5> 
                    <p className="mb-0 text-13 text-black-50">
                   {user.email}
                    </p>
                  </div>
                    </Link>
                  <div>
                  <div className="follow-area">
                          {user && user.followers.includes(state && state._id) //if you have alredy followed
                        ? <button className="btn btn-primary follow-sm" onClick={(e)=> unfollow(user._id)}>Unfollow</button> 
                        : <button className="btn btn-primary follow-sm" onClick={(e) => follow(user._id)}> Follow</button>}
                      </div>
                  </div>
                </div>
              </div>
            </li>)}) : Loader.section_loading}
          </ul>
        </div>
      </div>
    );
}
export default Sidebar