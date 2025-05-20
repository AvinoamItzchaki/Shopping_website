import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import {AddRegistered} from "./HandleDB";
import {Alert} from "react-bootstrap";
import "./css/LoginForm.css"
import {useAuth} from "./AuthContext";


function RegistrationForm() {
    const {username, setUsername} = useAuth();
    const [password, setPassword] = useState('');
    const [moneyAmount, setMoneyAmount] = useState(0);
    const [alert, setAlert] = useState('');
    const {showOtherPages,setShowOtherPages} = useAuth();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleMoneyAmountChange = (event) => {
        setMoneyAmount(event.target.value)
    }
    const registrationAction = async (event) => {
        if (alert === "valid"){
            setAlert(await AddRegistered(username, password, moneyAmount));
        }
    }
    useEffect(() => {
        if (alert === "registration-success") {
            setShowOtherPages("true");
        }
    }, [alert, setShowOtherPages]);

    useEffect(() => {
        function validateUsername(username) {
            // בדיקה אם המחרוזת מתחילה באות באנגלית
            if (!/^[A-Za-z]/.test(username)) {
                return "registration-invalid-start-letter";
            }

            // בדיקה אם יש תווים שאינם אותיות, מספרים או סימנים מיוחדים (ללא רווחים)
            if (!/^[A-Za-z0-9!@#$%^&*()_\-+=\[\]{}|;:'\",.<>?/`~]*$/.test(username)) {
                return "registration-invalid-characters";
            }

            if (username.length < 5) {
                return "registration-too-short";
            }

            if (username === "RegisteredPeople" ||
                username === "PurchasedProductsHistory" ||
                username === "ProductsFeedback"
            ) {
                return "registration-disallowed-username";
            }

            return "valid";
        }
        setAlert(validateUsername(username));
    }, [username]);


    return (
        <div className="registration-form">
            <br/>
            {alert === "registration-warning-username" && (
                <Alert variant="warning" dismissible><Alert.Heading>Warning</Alert.Heading>
                    <p>
                        קיים כבר שם משתמש כזה במערכת, אנא שנה את שם המשתמש שלך לשם אחר
                    </p>
                </Alert>
            )}
            {alert === "registration-success" && (
                <Alert variant="success" dismissible><Alert.Heading>Well done!</Alert.Heading>
                    <p>
                        נרשמת לאתר, בהצלחה
                    </p>
                </Alert>
            )}
            {alert === "registration-too-short" && (
                <Alert variant="light" dismissible><Alert.Heading>Warning</Alert.Heading>
                    <p>
                        שם המשתמש צריך להכיל יותר מ4 תווים
                    </p>
                </Alert>
            )}
            {alert === "registration-invalid-characters" && (
                <Alert variant="info" dismissible><Alert.Heading>Warning</Alert.Heading>
                    <p>
                        הקלד בשם המשתמש רק אותיות באנגלית, מספרים או סימנים מיוחדים (ללא רווחים)
                    </p>
                </Alert>
            )}
            {alert === "registration-invalid-start-letter" && (
                <Alert variant="info" dismissible><Alert.Heading>Warning</Alert.Heading>
                    <p>
                        שם המשתמש צריך להתחיל עם אות באנגלית
                    </p>
                </Alert>
            )}
            {alert === "registration-disallowed-username" && (
                <Alert variant="light" dismissible><Alert.Heading>Warning</Alert.Heading>
                    <p>
                        נסה להקליד שם משתמש אחר
                    </p>
                </Alert>
            )}


            <h1 className="title">הרשמות לאתר למשתמשים חדשים</h1>
            <h3 className="right">
                שם משתמש יכול להיכתב רק עם אותיות באנגלית, מספרים וסימנים מיוחדים (ללא רווח).
            </h3>
            <h3 className="right">
                אסור שבשם המשתמש יהיו תווים אחרים.
            </h3>
            <h3 className="right">
                האות הראשונה בשם המשתמש צריכה להיות באנגלית
            </h3>
            <h3 className="right">
                בשם המשתמש חייב שיהיה מעל 4 תווים.
            </h3>


            <label htmlFor="username">
                <h3>
                    שם משתמש:
                </h3>
            </label>
            <br/>
            <input type="text" name="username" aria-describedby="usernameHelp"
                   placeholder="Enter username" value={username} onChange={handleUsernameChange}/>
            <br/><br/>
            <label htmlFor="password">
                <h3>
                    סיסמה:
                </h3>
            </label>
            <br/>
            <input type="password" name="password" placeholder="Password"
                   value={password} onChange={handlePasswordChange}/>
            <br/><br/>
            <label htmlFor="moneyAmount">
                <h3>כמות כסף התחלתית להכניס לחשבון:</h3>
            </label>
            <br/>
            <input type="number" name="moneyAmount" placeholder="moneyAmount"
                   value={moneyAmount} onChange={handleMoneyAmountChange}/>
            <br/><br/>
            <button type="submit" className="btn btn-primary"
                    onClick={registrationAction}>Submit
            </button>

            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
            <h></h>

        </div>
    )
}

export default RegistrationForm;

/*
<h1>{alert}</h1>
            <h1>{showOtherPages}</h1>
 */