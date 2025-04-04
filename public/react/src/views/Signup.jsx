import { useRef } from "react";
import { Link, Navigate, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    let errorMessage = null;
    const navigate = useNavigate();
    const { setUser, setToken } = useStateContext();
    useEffect(() => {
        if (token) {
            navigate('/games');
        }
    }, [token]);

    const onSubmit = (event) => {
        event.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value, 
        };

        console.log('Payload:', payload);
        
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                console.log('API Response:', data);
                setToken(data.token);
                localStorage.setItem('ACCESS_TOKEN', data.token);
                console.log('token:', data.token);
                setUser(data.user);
                navigate('/games');
                
            })
            .catch(err => {
                console.error('Full error object:', err);
                console.log('Error config:', err.config);
                
                if (err.response) {
                    console.log('Server response:', {
                        status: err.response.status,
                        data: err.response.data
                    });

                    if (err.response.status === 422) {
                        errorMessage = err.response.data.errors
                        
                        console.log('errorMessage:', errorMessage);
                    } else if (err.response.status === 500) {
                        alert('Erreur serveur : ' + err.response.data.error);
                    }
                } else {
                    console.log('No server response - Network error');
                    alert('Erreur réseau/Connexion refusée');
                }
            });

    };

    return (
        <div>
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1>Register</h1>
                    {/* {errorMessage && <div> 
                     {Object.keys(errors).map(key=>(
                        <p key={key}>{errors[key][0]}</p>
                    ))}    
                    </div>} //////////////Todo mais avec le fronted////////////////*/} 
                    <input ref={nameRef} type="text" placeholder="Full name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                    <button>Register</button>

                    <p>
                        Have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
