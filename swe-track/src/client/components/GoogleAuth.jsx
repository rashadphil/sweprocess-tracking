import { GoogleLogin } from 'react-google-login'
import { AuthProvider } from './authContext'

export default function GoogleAuth() {
  // const clientId : string = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const clientId =
    '383092057644-fpjevv3amnkr1gkn8g4nlgp57tsjmetq.apps.googleusercontent.com'
  const handleLogin = AuthProvider().props.value.handleLogin
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Log in with Google"
      onSuccess={handleLogin}
      onFailure={handleLogin}
      cookiePolicy={'single_host_origin'}
    />
  )
}
