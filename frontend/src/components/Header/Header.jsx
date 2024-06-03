import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setLogOut } from "../../redux/reducers/userAuthSlice"
import { resetProfile } from "../../redux/reducers/profileSlice"
import logo from "../../assets/Argent Bank Logo.webp"

export default function Header() {
    const token = useSelector(state => state.userAuth.token)
    const profile = useSelector((state) => state.profile)
    const dispatch = useDispatch()

    const handleSignOut = () => {
        dispatch(setLogOut())
        dispatch(resetProfile())
    }

    return (
        <header>
            <nav className="main-nav">
                <Link
                    className="main-nav-logo"
                    to="./">
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    <i className="fa fa-user-circle"></i>
                    {token ? (
                        <>
                            <Link
                                className="main-nav-item"
                                to="./user">
                                {profile.userName}
                            </Link>
                            <Link
                                className="main-nav-item"
                                to="./"
                                onClick={handleSignOut}>
                                <i className="fa fa-sign-out"></i>
                                Sign Out
                            </Link>
                        </>
                    ) : (
                        <Link
                            className="main-nav-item"
                            to="./sign-in/">
                            Sign In
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    )
}
