import Link from 'next/link';
import { useSession } from 'next-auth/react'
import classes from './main-navigation.module.css';

function MainNavigation() {
   const { data: session, status } = useSession();
   console.log("loading",status);
   console.log("session",session);
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
         {/* if we don't have session then only show login link and also if we are not authenticated then show */}
         {!session  && status !== 'authenticated' && (
            <li>
               <Link href='/auth'>Login</Link>
            </li>
          )}
          {/* show profile only if the user is authenticated */}
          {session && (<li>
            <Link href='/profile'>Profile</Link>
          </li>)}
          {/* if session is there than show logout */}
          {session && (
            <li>
               <button>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;