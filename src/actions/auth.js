import history from '../routers/history';
import serverPath from '../paths';

export const requestSignUp = (creds) => ({
  type: 'REQUEST_SIGNUP',
  isFetching: true,
  isAuthenticated: false,
  creds
})

export const receiveSignUp = (response) => ({
  type: 'SIGNUP_SUCCESS',
  isAuthenticated: true,
  isFetching: false,
  token: response.token
})

export const signUpError = (message) => ({
  type: 'SIGNUP_FAILURE',
  isFetching: false,
  isAuthenticated: false,
  message
})

export const requestLogin = (creds) => ({
  type: 'LOGIN_REQUEST',
  isFetching: true,
  isAuthenticated: false,
  creds
})

export const receiveLogin = (response) => ({
  type: 'LOGIN_SUCCESS',
  isFetching: false,
  isAuthenticated: true,
  token: response.token,
  user: response.user
})

export const loginError = (message) => ({
  type: 'LOGIN_FAILURE',
  isFetching: false,
  isAuthenticated: false,
  message
})

export const requestLogout = () => ({
  type: 'LOGOUT_REQUEST',
  isFetching: true,
  isAuthenticated: false
})

export const receiveLogout = () => ({
  type: 'LOGOUT_SUCCESS',
  isFetching: false,
  isAuthenticated: false
})

export function loginUser(creds) {
  console.log("requesting login...")
  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    dispatch(requestLogin(creds));

    return fetch(`${serverPath}/login`, config).then((res) => {
      if (res.status !== 200) {
        dispatch(loginError(res.statusText));
        return Promise.reject("Could not login");
      }
      return res.json();
    }).then((json) => {
        console.log(json);
        console.log("logged in!")
        localStorage.setItem('token', json.token);
        localStorage.setItem('userId', json.user.id)
        localStorage.setItem('username', json.user.username)
        localStorage.setItem('firstName', json.user.firstName)
        localStorage.setItem('lastName', json.user.lastName)
        localStorage.setItem('email', json.user.email)
        localStorage.setItem('avatarURL', json.user.avatarURL)
        dispatch(receiveLogin({token: json.token, user: json.user}));
        history.push(`/dashboard`); // forward to /username
    }).catch(err => console.log("Error: " + err));
  }
}

export function logoutUser() {
    // check that this happens
    // dispatch(requestLogout());
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('email');
      localStorage.removeItem('avatarURL');
      // dispatch(receiveLogout());

      history.push(`/`);

      // check this ...

}
