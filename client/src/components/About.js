import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'

const About = () => {
  const nav = useNavigate();
  const callAbout = async () =>{
    try {
      const res = await fetch('/about' ,{
        method: 'GET',
        Headers:{
          Accept : "appllication/json",
          "Content-Type" : "application/json"
        },
        Credentials : "include"

      })
      const data = res.json()
      console.log(data);
      if(!res.status === 200 || !res){
        const error = new Error(res.error);
        throw error;
      }

    } catch (error) {
      console.log(error);
      nav('/login');
    }
  }

 useEffect( () =>{
   callAbout();
 } );

  return (
    <div>
      <h1>about</h1>
    </div>
  )
}

export default About
