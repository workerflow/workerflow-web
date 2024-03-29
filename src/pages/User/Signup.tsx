import { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AiOutlineTwitter, AiOutlineGithub } from 'react-icons/ai';
// import { ToastContainer, toast } from 'react-toastify';

// import 'react-toastify/dist/ReactToastify.css';

import api from '../../api';

export default function Signup() {
  let [username, setUsername] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  let [email, setEmail] = useState<string>("");

  let [passwordStatus, setPasswordStatus] = useState<boolean>(true);
  let [usernameStatus, setUsernameStatus] = useState<boolean>(true);
  let [emailStatus, setEmailStatus] = useState<boolean>(true);

  useEffect(() => {
    if (password !== "") {
      setPasswordStatus(true);
    }
    if (username !== "") {
      setUsernameStatus(true);
    }
    if (email !== "") {
      setEmailStatus(true);
    }
  }, [password, email, username]);

  return (
    <Fragment>
      <Helmet>
        <title>Workerflow - Signup</title>
      </Helmet>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mt-10">
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Signup your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input id="username" name="username" type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={username} onChange={val => { setUsername(val.target.value) }} />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input id="email" name="email" type="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={email} onChange={val => { setEmail(val.target.value) }} />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input id="password" name="password" type="password" required className={passwordStatus ? "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" : "appearance-none block w-full px-3 py-2 border border-pink-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"} value={password} onChange={val => { setPassword(val.target.value) }} />
                </div>
              </div>

              <div>
                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={
                  () => {
                    if (username === "") {
                      // toast.error("Username cannot left blank");
                      setUsernameStatus(false);
                    } else if (email === "") {
                      // toast.error("Email cannot left blank");
                      setEmailStatus(false);
                    } else if (password === "") {
                      // toast.error("Password cannot left blank");
                      setPasswordStatus(false);
                    } else {
                      api.post("/users/action/signup", {
                        username: username,
                        password: password,
                        email: email,
                      }).then(response => {
                        if (response.status === 201) {
                          let data = response.data.data;
                          window.localStorage.setItem("token", data.token);
                        }
                      }).catch(err => {
                        // toast.error(`some unknown error: ${err}`);
                        console.log(err);
                      })
                    }
                  }
                }>
                  Signup
                </button>
              </div>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <div>
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Sign in with Twitter</span>
                    <AiOutlineTwitter className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Sign in with GitHub</span>
                    <AiOutlineGithub className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
