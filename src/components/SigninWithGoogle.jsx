import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { auth, db } from './firebase'
import { setDoc, doc } from 'firebase/firestore';

//--google icon from react-icons--
import { FcGoogle } from "react-icons/fc";

//--react-toastify--
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SigninWithGoogle() {

    //--A handel for Login with google popup--
    const handelGoogleSignin = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        const user = result.user;
        if(result.user){
            await setDoc(doc(db, "Users", user.uid),{
                email:user.email,
                firstName: user.displayName,
                lastName: '',
                photo: user.photoURL,
            });
            toast.success("User Login Successfully!!", {
                position: "top-center"
            });
            window.location.href= "/profile";
        } else{
            console.log("User is not logged in");
        }
       
    };

    return (
        <>
            <div>
            <ToastContainer />
                <div className='flex flex-col items-center'>
                    <h3 className='text-gray-300 my-1'>--or continue with--</h3>
                    <button type="button" className="flex items-center justify-center px-10 py-2.5 me-2 mb-2 text-sm font-medium 
                            text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-200 
                            hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 
                            dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                            dark:hover:bg-gray-700"
                            onClick={handelGoogleSignin}><FcGoogle className='text-2xl mr-2'/>login with google</button>
                </div>
            </div>
        </>
    )
}

export default SigninWithGoogle;