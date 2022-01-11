import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

const serverUrl = 'http://localhost:8080/'
function GoogleButton({ renderProps }) {
  const { onClick, disabled } = renderProps
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full border border-transparent border-gray-200 flex justify-center shadow-sm my-3 py-2 px-0 text-md font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <div className="flex items-center font-[Roboto] font-medium">
        <img
          className="w-8 pr-2 object-scale-down"
          src="//logo.clearbit.com/google.com"
        />
        Continue with Google
      </div>
    </button>
  )
}
export default function GoogleAuth({ userData, setUserData }) {
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
    console.log(JSON.stringify(data))
    localStorage.setItem('userData', JSON.stringify(data))
    window.location.href = '/dashboard'
  }
  return (
    <GoogleLogin
      clientId={clientId}
      render={renderProps => <GoogleButton renderProps={renderProps} />}
      buttonText="Log in with Google"
      onSuccess={handleLogin}
      onFailure={err => console.log(err)}
      cookiePolicy={'single_host_origin'}
    />
  )
}
