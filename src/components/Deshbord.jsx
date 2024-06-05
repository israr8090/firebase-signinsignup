import React, { useEffect, useState } from 'react'
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
//--avatar from react-avatar--
import Avatar from 'react-avatar';

function Deshbord() {

    const [userDetails, setUserDetails] = useState(null);

    //--featching user details from db--
    const fetchUserDetails = async () => {
        auth.onAuthStateChanged(async (user) => {

            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
                console.log(docSnap.data())
            } else {
                console.log("user is not loggedin")
            }
        })
    };

    //--a fuction for handeling logout--
    const handelLogout = async () => {
        try {
            await auth.signOut();
            window.location.href = "/";
            toast.success("User Logged out Successfully!!", {
                position: "top-center"
            })

        } catch (error) {
            toast.error(error.message, {
                position: "bottom-center"
            })
        }
    }

    //--useeffect for rendering userdata and first render--
    useEffect(() => {
        fetchUserDetails();
    }, {});

    return (
        <>
            <div className='w-1/3 bg-slate-100 p-5 rounded-md'>
                <h1 className='text-lg font-bold text-orange-800'>Profile</h1>
                <div className='m-3 p-3 shadow-inner rounded-md bg-gray-300'>
                    {/* if user Details exits then executed */}
                    {userDetails ? (
                        <>
                            <div className='flex flex-col items-center justify-center'>
                                <div>
                                    {auth?.currentUser?.emailVerified ? <Avatar round size="75" src={userDetails.photo} />
                                        : <Avatar round size="75" name={userDetails.firstName} />}
                                </div>
                                <h1 className='font-bold text-lg mb-3'>Welcome {userDetails.firstName}</h1>
                                <div>
                                    <h3 className='mb-2'><b>Email: </b>{userDetails.email}</h3>
                                    <h3 className='mb-2'><b>Full Name: </b>{userDetails.firstName} {userDetails.lastName}</h3>
                                </div>
                                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                                  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
                                  dark:focus:ring-blue-800 float-right mt-5'
                                    onClick={handelLogout}
                                >Logout</button>
                            </div>
                        </>
                    ) : (<p>Loading...</p>)}

                </div>
            </div>
        </>
    )
}

export default Deshbord