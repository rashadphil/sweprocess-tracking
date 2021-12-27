import { GoogleLogin } from 'react-google-login'

export default function GoogleAuth() {
  // const clientId : string = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const clientId =
    '383092057644-fpjevv3amnkr1gkn8g4nlgp57tsjmetq.apps.googleusercontent.com'
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
const handleLogin = async googleData => {
  const res = await fetch('/api/v1/auth/google', {
    method: 'POST',
    body: JSON.stringify({
      token: googleData.tokenId
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  // store returned user somehow
}
