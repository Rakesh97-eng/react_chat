import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [error, setError] = useState(false);
  let navigate = useNavigate();
  const handleregister = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e?.target[3]?.value;
    try {
      const register = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, userName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
            console.log("error",error);
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(register.user, {
              displayName: userName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users",register.user.uid ), {
                uid:register.user.uid,
                displayName:userName,
                email:register.user.email,
                photoURL:downloadURL
               });
            await setDoc(doc(db,"userChats",register.user.uid),{

            })
            navigate('/')
          });
        }
      );


    } catch (err) {
    console.log(err);
      setError(true);
    }
  };

  return (
    <>
      <span className="title">Register</span>
      <div className="formContainer">
        <div className="formwrapper">
          <span className="logo">Chat</span>
          <span className="title">Register</span>

          <form onSubmit={handleregister}>
            <input type="text" placeholder="display name" />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input style={{ display: "none" }} id="file" type="file" />
            <label htmlFor="file">Add file</label>
            <button type="submit">sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
