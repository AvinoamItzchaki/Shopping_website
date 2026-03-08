import { useEffect, useState } from "react";
import { AddRegistered } from "./HandleDB";
import { useAuth } from "./AuthContext";

function RegistrationForm() {
  const { username, setUsername } = useAuth();
  const [password, setPassword] = useState('');
  const [moneyAmount, setMoneyAmount] = useState(0);
  const [alert, setAlert] = useState('');
  const { setShowOtherPages } = useAuth();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleMoneyAmountChange = (event) => {
    setMoneyAmount(event.target.value);
  };
  const registrationAction = async () => {
    if (alert === "valid") {
      setAlert(await AddRegistered(username, password, moneyAmount));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await registrationAction();
  };

  useEffect(() => {
    if (alert === "registration-success") {
      setShowOtherPages("true");
    }
  }, [alert, setShowOtherPages]);

  useEffect(() => {
    function validateUsername(usernameValue) {
      if (!/^[A-Za-z]/.test(usernameValue)) {
        return "registration-invalid-start-letter";
      }

      const allowedUsernameRegex = new RegExp(
        "^[A-Za-z0-9!@#$%^&*()_\\-+=\\[\\]{}|;:'\",.<>?/`~]*$"
      );
      if (!allowedUsernameRegex.test(usernameValue)) {
        return "registration-invalid-characters";
      }

      if (usernameValue.length < 5) {
        return "registration-too-short";
      }

      if (
        usernameValue === "RegisteredPeople" ||
        usernameValue === "PurchasedProductsHistory" ||
        usernameValue === "ProductsFeedback" ||
        usernameValue === "SiteProducts"
      ) {
        return "registration-disallowed-username";
      }

      return "valid";
    }

    setAlert(validateUsername(username));
  }, [username]);

  const alertBase =
    "w-full rounded-xl px-4 py-3 text-sm border mb-4";
  const alertWarning =
    alertBase + " bg-amber-50 border-amber-200 text-amber-900";
  const alertSuccess =
    alertBase + " bg-emerald-50 border-emerald-200 text-emerald-800";
  const alertInfo =
    alertBase + " bg-sky-50 border-sky-200 text-sky-900";
  const alertLight =
    alertBase + " bg-slate-50 border-slate-200 text-slate-800";

  const primaryButton =
    "inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2";
  const inputClasses =
    "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500";

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-md mx-auto px-4 py-12" dir="rtl">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-6 py-8">
          {alert === "registration-warning-username" && (
            <div className={alertWarning} role="alert">
              <h3 className="font-semibold mb-1">Warning</h3>
              <p>קיים כבר שם משתמש כזה במערכת, אנא שנה את שם המשתמש שלך לשם אחר</p>
            </div>
          )}
          {alert === "registration-success" && (
            <div className={alertSuccess} role="status" aria-live="polite">
              <h3 className="font-semibold mb-1">Well done!</h3>
              <p>נרשמת לאתר, בהצלחה</p>
            </div>
          )}
          {alert === "registration-too-short" && (
            <div className={alertLight} role="alert">
              <h3 className="font-semibold mb-1">Warning</h3>
              <p>שם המשתמש צריך להכיל יותר מ4 תווים</p>
            </div>
          )}
          {alert === "registration-invalid-characters" && (
            <div className={alertInfo} role="alert">
              <h3 className="font-semibold mb-1">Warning</h3>
              <p>הקלד בשם המשתמש רק אותיות באנגלית, מספרים או סימנים מיוחדים (ללא רווחים)</p>
            </div>
          )}
          {alert === "registration-invalid-start-letter" && (
            <div className={alertInfo} role="alert">
              <h3 className="font-semibold mb-1">Warning</h3>
              <p>שם המשתמש צריך להתחיל עם אות באנגלית</p>
            </div>
          )}
          {alert === "registration-disallowed-username" && (
            <div className={alertLight} role="alert">
              <h3 className="font-semibold mb-1">Warning</h3>
              <p>נסה להקליד שם משתמש אחר</p>
            </div>
          )}

          <h1 className="text-2xl font-semibold text-slate-900 text-center mb-6">
            הרשמות לאתר למשתמשים חדשים
          </h1>

          <div className="space-y-1 mb-4 text-sm text-slate-700">
            <p>שם משתמש יכול להיכתב רק עם אותיות באנגלית, מספרים וסימנים מיוחדים (ללא רווח).</p>
            <p>אסור שבשם המשתמש יהיו תווים אחרים.</p>
            <p>האות הראשונה בשם המשתמש צריכה להיות באנגלית.</p>
            <p>בשם המשתמש חייב שיהיה מעל 4 תווים.</p>
          </div>

          <form onSubmit={handleSubmit}>
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
                autoComplete="new-password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className={inputClasses}
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm font-medium text-slate-800 mb-1 block">
                כמות כסף התחלתית להכניס לחשבון:
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

            <button type="submit" className={primaryButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;