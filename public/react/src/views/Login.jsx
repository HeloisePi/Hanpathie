import { Link } from "react-router-dom"

export default function Login(){
    const onSubmit = (event) => {
        event.preventDefault()
    }
    return(
        <div>
           <div className="form">
            <form onSubmit={onSubmit}>
                <h1>Login</h1>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="password"/>
                <button>Login</button>

                <p>
                    Not Registered? <Link to="/signup">Registered</Link>
                </p>

            </form>
           </div>
        </div>
    )
}

