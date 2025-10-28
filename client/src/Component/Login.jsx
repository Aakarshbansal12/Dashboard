import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { axiosInstance } from './Config'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate()

     const token = localStorage.getItem("token")
    
      const auth = async()=>{
        if(token){
          navigate("/dashboard")
        }
      }
    
      useEffect(()=>{
        auth()
      },[])

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.post('/loginUser', { email, password },
            )

            console.log(response,'/////////');
            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                navigate('/dashboard')
            } else {
                setError(response.data.message)
            }
        } catch (err) {
            console.error(err)
            setError('Something went wrong! Please try again.')
        }
    }


    return (
        <>

            <div
                className="page-header align-items-start min-vh-100"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')",
                }}
            >
                <span className="mask bg-gradient-dark opacity-6"></span>
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                                        <div className="row mt-3">
                                            <div className="col-2 text-center ms-auto">
                                                <button className="btn btn-link px-3">
                                                    <i className="fa fa-facebook text-white text-lg"></i>
                                                </button>
                                            </div>
                                            <div className="col-2 text-center px-1">
                                                <button className="btn btn-link px-3">
                                                    <i className="fa fa-github text-white text-lg"></i>
                                                </button>
                                            </div>
                                            <div className="col-2 text-center me-auto">
                                                <button className="btn btn-link px-3">
                                                    <i className="fa fa-google text-white text-lg"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">

                                    <form className="text-start"  onSubmit={handleLogin}>
                                        <div className="input-group input-group-outline my-3">
                                            
                                            <input
                                             placeholder='Email'
                                                type="email"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="input-group input-group-outline mb-3">
                                            
                                            <input
                                            placeholder='password'
                                                type="password"
                                                className="form-control"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form-check form-switch d-flex align-items-center mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="rememberMe"
                                                defaultChecked
                                            />
                                            <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-danger mb-2">{error && error}</div>

                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="btn bg-gradient-dark w-100 my-4 mb-2"
                                            >
                                                Sign in
                                            </button>
                                        </div>

                                        <p className="mt-4 text-sm text-center">
                                            Don't have an account?{' '}
                                            <Link to="/signUp" className="text-primary text-gradient font-weight-bold">
                                                Sign up
                                            </Link>
                                        </p>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login


