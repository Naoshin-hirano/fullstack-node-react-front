import React, { useState } from 'react';
import axios from "axios";

function ChangePassword() {
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");

  const changePassword = () => {
      axios.put("https://fullstack-api-node.herokuapp.com/auth/changepassword", {
        oldPassword: oldpassword,
        newPassword: newpassword
      },{
        headers: {
            "accessToken": localStorage.getItem("accessToken")
        }
      })
      .then((response) => {
          if (response.data.error) {
              alert(response.data.error);
          }
          console.log(response.data)
      });
  };
  return (
    <div>
      <h1>Change Your Password</h1>
      <input onChange={(e) => {setOldpassword(e.target.value)}} value={oldpassword} type="text" placeholder="Old Password..."/>
      <input onChange={(e) => {setNewpassword(e.target.value)}} value={newpassword} type="text" placeholder="New Password..."/>
      <button onClick={changePassword}>Save Changes</button>
    </div>
  )
}

export default ChangePassword
