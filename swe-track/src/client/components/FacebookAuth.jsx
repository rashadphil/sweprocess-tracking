import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios'

const serverUrl = 'http://localhost:8080/'
function FacebookButton({ renderProps }) {
  const { onClick, disabled } = renderProps
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full border border-transparent border-gray-200 bg-[#1877F2] flex justify-center shadow-sm my-3 py-2 px-0 text-md font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <div className="flex items-center font-[Helvetica] font-bold">
        <div className="pr-2">
          <i class="fab fa-facebook fa-lg"></i>
        </div>
        Continue with Facebook
      </div>
    </button>
  )
}
export default function FacebookAuth({ userData, setUserData }) {
  const appId = '501863094586131'

  const handleLogin = async facebookData => {
    console.log('Handling Login')
    // setUserData(data)
    // console.log(JSON.stringify(data))
    // localStorage.setItem('userData', JSON.stringify(data))
    // window.location.href = '/dashboard'
  }
  return (
    <FacebookLogin
      appId={appId}
      autoLoad={false}
      fields="name,email,picture"
      callback={response => console.log(response)}
      render={renderProps => <FacebookButton renderProps={renderProps} />}
    />
  )
}
