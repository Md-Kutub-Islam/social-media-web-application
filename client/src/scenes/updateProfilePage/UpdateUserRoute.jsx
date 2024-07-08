import React from 'react'
import UpdateProfilePage from './UpdateProfilePage'
import { useSelector } from "react-redux";
function UpdateUserRoute() {
    const {_id} = useSelector(state => state.user)
  // return <UpdateProfilePage userId={_id} />
}

export default UpdateUserRoute