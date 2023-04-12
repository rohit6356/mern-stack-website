import React , {useState} from 'react'
import { useNavigate } from "react-router-dom";


const Registration = () => {
  // const history = useNavigate();
  const nav = useNavigate();
  const [user , setUser] = useState({
    name:"",email:"",phone:"",work:"",password:"",cpassword:""
  })

  let name , value;
const handleInput =(e)=>{
  console.log(e);
  name = e.target.name;
  value = e.target.value;

  setUser({...user , [name]:value});
}

const postData = async(e) =>{
  e.preventDefault();
const {name , email , phone , work , password , cpassword} = user;

const res = await fetch("/register" , {
  method : "POST",
  headers :{
    "Content-Type" : "application/json"
  },
  body : JSON.stringify({
    name , email , phone , work, password, cpassword
  })
})
// const data = await res.json();

if(res.status === 422 || !res){
  window.alert("invalid registration")
}
else{
  window.alert(" registration successfully")
 nav('/login')

}

}

  return (
    <>
    <section className="vh-100" style={{backgroundColor: "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body ">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mx-1 mx-md-4">Sign up</p>

                <form method="POST" className="mx-1 mx-md-4" >

                  <div className="d-flex flex-row align-items-center">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" name="name" id="name" className="form-control" value={user.name} onChange={handleInput} autoComplete='off'/>
                      <label className="form-label" htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  

                  <div className="d-flex flex-row align-items-center">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" name="email" id="email" className="form-control" value={user.email} onChange={handleInput} autoComplete='off'/>
                      <label className="form-label" htmlFor="email">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="number" name="phone" id="phone" className="form-control" value={user.phone} onChange={handleInput} autoComplete='off'/>
                      <label className="form-label" htmlFor="phone">phone</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" name="work" id="work" className="form-control" value={user.work} onChange={handleInput} autoComplete='off'/>
                      <label className="form-label" htmlFor="work">Your Work</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" name="password" id="password" className="form-control" value={user.password} onChange={handleInput} autoComplete='off'/>
                      <label className="form-label" htmlFor="password">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" name="cpassword" id="cpassword" className="form-control" value={user.cpassword} onChange={handleInput} autoComplete='off'/>
                      <label className="form-label" htmlFor="cpassword">Repeat your password</label>
                    </div>
                  </div>

                  <div className="form-check d-flex justify-content-center my-2">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-lg" onClick={postData}>Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample view"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section></>
  )
}

export default Registration
