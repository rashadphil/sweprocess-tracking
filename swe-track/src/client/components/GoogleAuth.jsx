import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

const serverUrl = 'http://localhost:8080/'
export default function GoogleAuth({userData, setUserData}) {
  // const clientId : string = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const clientId =
    '383092057644-fpjevv3amnkr1gkn8g4nlgp57tsjmetq.apps.googleusercontent.com'

  const handleLogin = async googleData => {
    console.log('Handling Login')
    const res = await axios.post(serverUrl + 'api/google-login', {
      token: googleData.tokenId
    })
    const data = res.data
    setUserData(data)
    localStorage.setItem('userData', JSON.stringify(data))
  }
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
