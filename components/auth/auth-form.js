import { useState, useRef } from 'react';
import classes from './auth-form.module.css';
import { signIn } from "next-auth/react"
import { useRouter } from "next/router";
// import * as client from "next-auth/client"
async function createUser(email,password) {
   const response = await fetch(`/api/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({email,password}),
      headers: {
         'Content-Type': 'application/json'
      }
   });
   const data = await response.json();
   if(!response,ok) {
      throw new Error(data.message  || "Something went wrong!!!")
   }
   return data;
}

function AuthForm() {
   const [isLogin, setIsLogin] = useState(true);
   const router = useRouter();
   const emailInputRef = useRef();
   const passwordInputRef = useRef();
   function switchAuthModeHandler() {
      setIsLogin((prevState) => !prevState);
   }

   async function handleSubmit(e) {
      const enteredEmail = emailInputRef.current.value;
      const eneteredPassword = passwordInputRef.current.value;
      //add validation 
      e.preventDefault();
      if(isLogin) {
         //log user in
         //automatic send red using built in signin function
         //provider, config obj
         const result = await signIn('credentials', { 
            redirect: false,
            email: enteredEmail,
            password: eneteredPassword
          });
          console.log("res",result);
          if(!result.error) {
             //set some auth state"
             router.replace("/profile");
          }
      }
      else {
         try {
            const result = await createUser(enteredEmail,eneteredPassword);
            console.log("Result is",result);
         } catch(e) {
            console.log("Error",e);
         }
      }  
   }

   return (
      <section className={classes.auth}>
         <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
         <form onSubmit={handleSubmit}>
         <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required ref={emailInputRef}/>
         </div>
         <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input type='password' id='password' required ref={passwordInputRef}/>
         </div>
         <div className={classes.actions}>
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
            <button
               type='button'
               className={classes.toggle}
               onClick={switchAuthModeHandler}
            >
               {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
         </div>
         </form>
      </section>
   );
}

export default AuthForm;