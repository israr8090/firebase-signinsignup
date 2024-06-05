import React, { useState } from 'react'
import { auth, db } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth/cordova';

//--importing components--
import Signup from './Signup';
import SigninWithGoogle from './SigninWithGoogle';

//--react-toastify--
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function SignIn() {
    //--for state management--
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //-- a function for perform signin--
    const handelSignIN = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);

            toast.success("User Login Successfully!!", {
                position: "top-center"
            })
            window.location.href= "/profile";


        } catch (error) {
            console.log(error.message)
            toast.error(error.message, {
                position: "bottom-center"
            })
        }
    }



    return (
        <>
            <div className='bg-gray-400 w-4/5 rounded-md p-5'>
                <ToastContainer />
                <div className='flex justify-between px-3 pt-2'>
                    <h1 className='font-bold border-b-2 border-green-800 text-green-800 text-xl'>User Login</h1>
                </div>

                {/* SignIN component part */}
                <div className='flex justify-around mt-5'>
                    <div className='w-3/6  bg-slate-500 rounded-md p-5 pt-10 mr-5 mb-5 mt-2'>
                        <form className="max-w-sm mx-auto" onSubmit={handelSignIN}>
                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300
                                 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                                 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@example.com" required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                <input type="password" id="password" className="bg-gray-50 border border-gray-300
                                 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                                 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="password" required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="float-right  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                        </form>
                        <hr className='mt-20'/>
                        {/* SignInWith Google component */}
                        <SigninWithGoogle/>
                    </div>


                    {/* Signup component part */}
                    <div className='w-4/6 bg-slate-100 p-3 rounded-md mb-4'>
                        <Signup />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn