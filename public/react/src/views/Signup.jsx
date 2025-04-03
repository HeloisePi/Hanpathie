import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const { setUser, setToken } = useStateContext();

    const onSubmit = (event) => {
        event.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value, // ✅ Correction ici
        };

        console.log('Payload:', payload);
        
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                console.log('API Response:', data);
                setToken(data.token);
                setUser(data.user);
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
                        alert(JSON.stringify(err.response.data.errors));
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
