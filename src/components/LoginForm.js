import { useEffect, useState } from "react";
import { CheckLogin, GetMoneyAmount, SetMoneyAmount } from "./HandleDB";
import { useAuth } from './AuthContext';

function LoginForm() {
  const { username, setUsername } = useAuth();
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState("");
  const [moneyAmount, setMoneyAmount] = useState(0);
  const [initialAmountOfMoney, setInitialAmountOfMoney] = useState(0);
  const { setShowOtherPages } = useAuth();
  let sum = Number(initialAmountOfMoney) + Number(moneyAmount);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleMoneyAmountChange = (event) => {
    setMoneyAmount(event.target.value);
  };
  const loginAction = async () => {
    setAlert(await CheckLogin(username, password));
  };
  const updateMoneyAmount = async () => {
    setAlert(await SetMoneyAmount(moneyAmount));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    await loginAction();
  };

  const handleMoneySubmit = async (event) => {
    event.preventDefault();
    await updateMoneyAmount();
  };

  useEffect(() => {
    const fetchMoneyAmount = async () => {
      if (alert === "login-success") {
        setShowOtherPages("true");
        setInitialAmountOfMoney(await GetMoneyAmount());
      }
    };
    fetchMoneyAmount();
  }, [alert, setShowOtherPages]);

  const alertBase =
    "w-full rounded-xl px-4 py-3 text-sm border mb-4";
  const alertDanger =
    alertBase + " bg-rose-50 border-rose-200 text-rose-800";
  const alertSuccess =
    alertBase + " bg-emerald-50 border-emerald-200 text-emerald-800";

  const primaryButton =
    "inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2";

  const inputClasses =
    "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500";

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-md mx-auto px-4 py-12" dir="rtl">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-6 py-8">
          {alert === "login-danger-username" && (
            <div className={alertDanger} role="alert">
              <h3 className="font-semibold mb-1">Danger</h3>
              <p>לא קיים שם משתמש כזה במערכת</p>
            </div>
          )}
          {alert === "login-danger-password" && (
            <div className={alertDanger} role="alert">
              <h3 className="font-semibold mb-1">Danger</h3>
              <p>סיסמה שגויה</p>
            </div>
          )}
          {alert === "login-success" && (
            <div className={alertSuccess} role="status" aria-live="polite">
              <h3 className="font-semibold mb-1">Well done!</h3>
              <p>ההתחברות עברה בהצלחה, שהות נעימה</p>
              <p>אם תרצה תוכל להוסיף כסף לחשבון הבנק שלך על ידי התוית שנפתחה למטה</p>
              <p>הכסף הקיים בחשבון הבנק שלך יופיע מתחת להודעה ובנוסף גם סכום הכסף המלא שיהיה בחשבונך לאחר ההוספה</p>
            </div>
          )}
          {alert === "updateMoneyAmount-success" && (
            <div className={alertSuccess} role="status" aria-live="polite">
              <h3 className="font-semibold mb-1">Well done!</h3>
              <p>הוספת הכסף לחשבון עברה בהצלחה, שהות נעימה.</p>
            </div>
          )}

          <h1 className="text-2xl font-semibold text-slate-900 text-center mb-6">
            התחברות לאתר
          </h1>

          {alert !== "login-success" && alert !== "updateMoneyAmount-success" && (
            <form onSubmit={handleLoginSubmit}>
              <label className="block mb-4">
                <span className="text-sm font-medium text-slate-800 mb-1 block">
                  שם משתמש:
                </span>
                <input
                  type="text"
                  name="username"
                  aria-describedby="usernameHelp"
                  autoComplete="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleUsernameChange}
                  className={inputClasses}
                />
                <small
                  id="usernameHelp"
                  className="mt-1 block text-xs text-slate-500"
                >
                  שם המשתמש צריך להיכתב עם אותיות באנגלית, מספרים או סימנים מיוחדים (ללא רווחים)
                </small>
              </label>

              <label className="block mb-4">
                <span className="text-sm font-medium text-slate-800 mb-1 block">
                  סיסמה:
                </span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={inputClasses}
                />
              </label>

              <button type="submit" className={primaryButton}>
                Submit
              </button>
            </form>
          )}

          {alert === "login-success" && (
            <div className="mt-6 text-right space-y-4">
              <p className="text-sm text-slate-800">
                סכום הכסף בחשבון כרגע {initialAmountOfMoney}.
              </p>
              <p className="text-sm text-slate-800">
                לאחר ההוספה הסכום יהיה: {sum}
              </p>

              <form onSubmit={handleMoneySubmit}>
                <label className="block">
                  <span className="text-sm font-medium text-slate-800 mb-1 block">
                    סכום הכסף להכניס לחשבון
                  </span>
                  <input
                    type="number"
                    name="moneyAmount"
                    inputMode="decimal"
                    placeholder="moneyAmount"
                    value={moneyAmount}
                    onChange={handleMoneyAmountChange}
                    className={inputClasses}
                  />
                </label>

                <button
                  type="submit"
                  className={primaryButton + " mt-3"}
                >
                  אישור ההוספה
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

/*
* <h1>{alert}</h1>
            <h1>{showOtherPages}</h1>
*
* */



