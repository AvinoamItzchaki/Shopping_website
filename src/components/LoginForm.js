import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from "react";
import {CheckLogin, GetMoneyAmount, SetMoneyAmount} from "./HandleDB";
import {Alert} from "react-bootstrap";
import { useAuth } from './AuthContext';
import "./css/LoginForm.css"


function LoginForm() {
    const { username, setUsername } = useAuth();
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState("");
    const [moneyAmount, setMoneyAmount] = useState(0);
    const [initialAmountOfMoney, setInitialAmountOfMoney] = useState(0);
    const {setShowOtherPages} = useAuth();
    let sum = Number(initialAmountOfMoney) + Number(moneyAmount);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleMoneyAmountChange = (event) => {
        setMoneyAmount(event.target.value)
    }
    const loginAction = async (event) => {
        setAlert(await CheckLogin(username, password));
    }
    const updateMoneyAmount = async (event) => {
        setAlert(await SetMoneyAmount(moneyAmount));
    }

    useEffect(() => {
        const fetchMoneyAmount = async () => {
            if (alert === "login-success") {
                setShowOtherPages("true");
                setInitialAmountOfMoney(await GetMoneyAmount());
            }
        };
        fetchMoneyAmount();
    }, [alert, setShowOtherPages]);


    return (
        <div className="login-form">
            <br/>
            {alert === "login-danger-username" && (
                <Alert variant="danger" dismissible onClose={() => setAlert("")}>
                    <Alert.Heading>Danger</Alert.Heading>
                    <p>
                        לא קיים שם משתמש כזה במערכת
                    </p>
                </Alert>
            )}
            {alert === "login-danger-password" && (
                <Alert variant="danger" dismissible onClose={() => setAlert("")}>
                    <Alert.Heading>Danger</Alert.Heading>
                    <p>
                        סיסמה שגויה
                    </p>
                </Alert>
            )}
            {alert === "login-success" && (
                <Alert variant="success" dismissible onClose={() => {setPassword("")}}>
                    <Alert.Heading>Well done!</Alert.Heading>
                    <p>
                        ההתחברות עברה בהצלחה, שהות נעימה
                    </p>
                    <p>
                        אם תרצה תוכל להוסיף כסף לחשבון הבנק שלך על ידי התוית שנפתחה למטה
                    </p>
                    <p>
                        הכסף הקיים בחשבון הבנק שלך יופיע מתחת להודעה ובנוסף גם סכום הכסף המלא שיהיה בחשבונך לאחר ההוספה
                    </p>
                </Alert>
            )}
            {alert === "updateMoneyAmount-success" && (
                <Alert variant="success" dismissible onClose={() => setAlert("")}>
                    <Alert.Heading>Well done!</Alert.Heading>
                    <p>
                        הוספת הכסף לחשבון עברה בהצלחה, שהות נעימה.
                    </p>
                </Alert>
            )}

            <h1>התחברות לאתר</h1>

            {alert !== "login-success" && alert !== "updateMoneyAmount-success" && (
                <>
                    <label htmlFor="username">
                        <h3>
                            שם משתמש:
                        </h3>
                    </label>
                    <br/>
                    <input type="text" name="username" aria-describedby="usernameHelp"
                           placeholder="Enter username" value={username} onChange={handleUsernameChange}/>
                    <br/>
                    <small id="usernameHelp" className="form-text text-muted">שם המשתמש צריך להיכתב עם אותיות באנגלית, מספרים או סימנים מיוחדים (ללא רווחים)</small>

                    <br/><br/>
                    <label htmlFor="password">
                        <h3>סיסמה:</h3>
                    </label>
                    <br/>
                    <input type="password" name="password" placeholder="Password"
                           value={password} onChange={handlePasswordChange}/>
                    <br/><br/>
                    <button type="submit" className="btn btn-primary"
                            onClick={loginAction}>Submit
                    </button>
                </>
            )}

            {alert === "login-success" && (
                <div className="right">
                    <h1>סכום הכסף בחשבון כרגע {initialAmountOfMoney}.</h1>
                    <h1>לאחר ההוספה הסכום יהיה: {sum}</h1>
                    <br/>
                    <label htmlFor="moneyAmount">
                        <h3>
                            סכום הכסף להכניס לחשבון
                        </h3>
                    </label>
                    <br/>
                    <input type="number" name="moneyAmount" placeholder="moneyAmount"
                           value={moneyAmount} onChange={handleMoneyAmountChange}/>
                    <br/>
                    <button type="submit" className="btn btn-primary"
                            onClick={updateMoneyAmount}>אישור ההוספה
                    </button>
                </div>
            )}


            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
            <h></h>
        </div>
    )
}

export default LoginForm;

/*
* <h1>{alert}</h1>
            <h1>{showOtherPages}</h1>
*
* */



