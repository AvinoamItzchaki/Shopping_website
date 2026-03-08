import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function NavBar() {
  const { username, setUsername, showOtherPages, setShowOtherPages } = useAuth();

  const logout = () => {
    setUsername("");
    setShowOtherPages("false");
  };

  const baseLinkClasses =
    "inline-flex items-center rounded-xl px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2";

  return (
    <nav className="bg-white border-b border-slate-200" aria-label="Primary">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex items-center gap-3 py-3">
          {showOtherPages === "true" && (
            <>
              <li>
                <Link className={baseLinkClasses} to="/shop">
                  Shop
                </Link>
              </li>
              <li>
                <Link className={baseLinkClasses} to="/cart">
                  Cart
                </Link>
              </li>
              <li>
                <Link className={baseLinkClasses} to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className={baseLinkClasses} to="/statistics">
                  Statistics
                </Link>
              </li>
              {username === "avinoam" && (
                <li>
                  <Link className={baseLinkClasses} to="/administrator">
                    Administrator Extension
                  </Link>
                </li>
              )}
              <li>
                <Link className={baseLinkClasses} to="/feedbacks">
                  Feedbacks
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center rounded-xl bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                >
                  Exit
                </button>
              </li>
            </>
          )}
          <li className="ml-auto">
            <Link className={baseLinkClasses} to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className={baseLinkClasses} to="/registration">
              Registration
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
