import Link from "next/link";
import { UserContext } from "../context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Avatar } from "antd";
const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const [current, setCurrent] = useState("");
  const router = useRouter();
  useEffect(() => {
    // to make sure we are on the client side as next js runs in the server side as well
    typeof window !== "undefined" && setCurrent(window.location.pathname);
    // process.browser && setCurrent(window.location.pathname);
  }, [typeof window !== "undefined" && window.location.pathname]);
  console.log(current);
  function logout() {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  }

  return (
    <nav
      style={{
        justifyContent: state && "space-between !important",
        backgroundColor: "#848484",
      }}
      className="nav py-2 justify-content-center align-items-center"
    >
      <Link
        href="/"
        className={`logo nav-link fs-6 text-light ${
          current == "/" && "active"
        }`}
      >
        <Avatar src="/images/favicon.png" /> CafeBook
      </Link>

      {state && (
        <div className="dropdown px-3">
          <button
            className=" dropdown-toggle btn btn-secondary"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {state && state.user && state.user.name}
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link
                href="/user/dashboard"
                className={`dropdown-items nav-link fs-6 ${
                  current == "/user/dashboard" && "active"
                }`}
              >
                dashboard
              </Link>
            </li>
            {state.user.role === "Admin" && (
              <li>
                <Link
                  href="/admin"
                  className={`dropdown-items nav-link fs-6 ${
                    current == "/admin" && "active"
                  }`}
                >
                  Admin
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/user/profile/update"
                className={`dropdown-items nav-link fs-6  ${
                  current == "/user/profile/update" && "active"
                }`}
              >
                Profile
              </Link>
            </li>
            <li>
              <a onClick={logout} className=" nav-link fs-6 pointer">
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}

      {!state && (
        <Link
          href="/login"
          className={`logo nav-link fs-6 text-light ${
            current == "/login" && "active"
          }`}
        >
          Login
        </Link>
      )}

      {!state && (
        <Link
          href="/register"
          className={`logo nav-link fs-6 text-light ${
            current == "/register" && "active"
          }`}
        >
          Register
        </Link>
      )}
    </nav>
  );
};

export default Nav;
// ROuting is easier in next js as link component require href and other thing remain as it is
// we need to import Link from "next/link"
