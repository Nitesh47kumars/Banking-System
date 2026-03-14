import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/authSlice';

const Dashboard = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!user){
      dispatch(getUser());
    }
  },[dispatch,user])
  return (
    <div>
      {loading? (
        <h1>Loading...</h1>
      ):(
        <h1>User</h1>
      )}
      <h1>asd</h1>
    </div>
  )
}

export default Dashboard
