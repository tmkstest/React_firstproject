import { useContext } from "react"
import { quizContext } from "../App"
import { useNavigate } from "react-router-dom";

function User() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(quizContext);

    function start() {
        if (user) {
            navigate("/questions")
        } else {
            alert("Please enter valid input");
        }
    }
    return (
        <div>
            <input type="text" placeholder='Enter userName' onChange={(e) => setUser(e.target.value)} />
            <button onClick={start}>Start Quiz</button>
        </div>
    )
}

export default User