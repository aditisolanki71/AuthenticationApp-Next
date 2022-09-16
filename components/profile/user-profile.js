import { useRouter } from "next/router";
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
// client side code
// import { 
//    //useSession, 
//    getSession} from 'next-auth/react'
// import { useState, useEffect } from "react";
function UserProfile() {
   const router = useRouter();
  
   // client side code
//   // Redirect away if NOT auth
//   const [isLoading,setIsLoading] = useState(true);
//   useEffect(() => {
//      getSession().then(session => {
//            if(!session) {
//                window.location.href = '/auth';
//            }
//            else {
//                setIsLoading(false);
//            }
//       });
//   },[])
// //   const { data: session, status } = useSession();
// //   if(status === 'authenticated') {
// //      return <p className={classes.profile}>Loading....</p>
// //   }
//    if(isLoading) {
//       return <p className={classes.profile}>Loading....</p>
//    }
async function handleChangePassword(passwordData) {
   const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
         'Content-Type': 'application/json'
      }
   });
   const data = await response.json();
   if(data) {
      //set some arouteruth state"
      router.replace("/");
   }
   console.log(data);
}
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={handleChangePassword}/>
    </section>
  );
}

export default UserProfile;