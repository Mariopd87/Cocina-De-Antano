import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function LoginButton(props) {
    const {handleShowLoginForm} = props;
    return (
        <div onClick={handleShowLoginForm}>
            <FontAwesomeIcon icon={faUser} />
        </div>
    );
}

export default LoginButton;