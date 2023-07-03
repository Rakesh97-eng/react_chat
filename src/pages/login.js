import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
  const handlelogin = (e)=>{
    e.preventDefault();
    const email  = e.target[0].value;
    const password = e.target[1].value
    try{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate('/')
        })
    }
    catch(error){
      console.log(error);
    };
  }
  
  

  return (
    <>
      <span className="title"></span>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Chat</span>
          <span className="title">Register</span>
          <form onSubmit={handlelogin}>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button>sign in</button>
          </form>
         <Link style={{textDecoration:"none",color:" #8da4f1"}} to="/register">Click here to Register</Link>
        </div>
       
      </div>
    </>
  );
};

export default Login;
