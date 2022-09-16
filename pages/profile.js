import UserProfile from '../components/profile/user-profile';
import { getSession } from 'next-auth/react'
function ProfilePage() {
  //user profile component will only be render if the ppage renders
  //page render will only happen if we are authenticated user coz of serversideprops logic
  return <UserProfile />;
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        //only this time when not vali session
        permanent: false
      }
    }
  }
  return {
    props: { session },
  }
}
export default ProfilePage;