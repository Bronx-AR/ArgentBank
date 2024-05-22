import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLogIn } from "../../redux/reducers/userAuthSlice"
import TextInput from "../../components/TextInput/TextInput"
import Button from "../../components/Button/Button"

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [checkBox, setCheckBox] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fetchLogIn = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            const token = data.body.token
            dispatch(setLogIn({ token }))
            navigate("/user")
        } catch (err) {
            console.log(err)
            setError("Email or Password invalid")
        }
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={fetchLogIn}>
                    <TextInput
                        className="input-wrapper"
                        label="Email"
                        id="email"
                        type="text"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)} />
                    <TextInput
                        className="input-wrapper"
                        label="Password"
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)} />
                    <TextInput
                        className="input-remember"
                        label="Remember me"
                        id="remember-me"
                        type="checkbox"
                        onChange={() => setCheckBox(!checkBox)} />
                    {error && <p className="error-message">{error}</p>}
                    <Button
                        className="sign-in-button"
                        type="submit">
                        Sign In
                    </Button>
                </form>
            </section>
        </main>
    )
}