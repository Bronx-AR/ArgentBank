import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setEditProfile } from "../../redux/reducers/profileSlice"
import TextInput from "../TextInput/TextInput"
import Button from "../Button/Button"

export default function EditButton() {
    const userFirstName = useSelector(state => state.userAuth.firstname)
    const userLastName = useSelector(state => state.userAuth.lastname)
    const token = useSelector(state => state.userAuth.token)
    const profile = useSelector((state) => state.profile)
    const [isActive, setIsActive] = useState(false)
    const [titleText, setTitleText] = useState('Welcome back')
    const [point, setPoint] = useState('!')
    const [isEditing, setIsEditing] = useState(false)
    const [newUserName, setNewUserName] = useState(profile.userName)
    const [firstname, setFirstName] = useState(userFirstName)
    const [lastname, setLastName] = useState(userLastName)
    const [error, setError] = useState("")

    const reverseClick = () => {
        setIsActive(current => !current);
        setTitleText('Welcome back');
        setFirstName(userFirstName);
        setLastName(userLastName);
        setPoint('!')
    }

    const dispatch = useDispatch()

    useEffect(() => {
    setNewUserName(profile.userName)
    }, [profile.userName])
    
    const editUserName = async (e) => {
        e.preventDefault()
        if (!newUserName) {
            setError("The field cannot be empty.")
        return
        }
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ userName: newUserName })
            })
            if (!response) {
                throw new Error("Échec de la mise à jour du nom d'utilisateur")
            }
            dispatch(setEditProfile(newUserName))
            setIsEditing(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {isEditing ? (
                <div>
                    <TextInput
                        label="Username"
                        id="username"
                        type="text"
                        autoComplete="username"
                        onChange={(e) => {
                            setNewUserName(e.target.value)
                            setError("")

                        }}
                        value={newUserName} />
                    {error && <p className="error-message">{error}</p>}
                    <br />
                    <TextInput
                        label="Firstname"
                        id="firstname"
                        type="text"
                        value={userFirstName}
                        onChange={(e) => e.preventDefault()} disabled />
                    <TextInput
                        label="Lastname"
                        id="lastname"
                        type="text"
                        value={userLastName}
                        onChange={(e) => e.preventDefault()} disabled />
                    <Button
                        className="edit-button"
                        onClick={editUserName}>
                        Save
                    </Button>
                    <Button
                        className="edit-button"
                        onClick={(e) => {
                            e.preventDefault()
                            dispatch(reverseClick)
                        }}>
                            Cancel
                        </Button>
                </div>
            ) : (
                <Button
                    className="edit-button"
                    onClick={() => setIsEditing(true)}>
                    Edit UserName
                </Button>
            )}
        </div>
    )
}