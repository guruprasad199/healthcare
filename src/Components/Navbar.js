import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const openNav = () => setNav(!nav);

  // ✅ Track Firebase Login State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      toast.error("Error logging out!");
      console.error(error);
    }
  };

  return (
    <div className={`navbar-section ${isScrolled ? "scrolled" : ""}`}>
      {/* --- Logo --- */}
      <h1 className="navbar-title">
        <Link to="/">
          Health <span className="navbar-sign">+</span>
        </Link>
      </h1>

      {/* --- Desktop Nav --- */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <a href="#services" className="navbar-links">
            Services
          </a>
        </li>
        <li>
          <a href="#about" className="navbar-links">
            About
          </a>
        </li>
        <li>
          <a href="#reviews" className="navbar-links">
            Reviews
          </a>
        </li>
        <li>
          <a href="#doctors" className="navbar-links">
            Doctors
          </a>
        </li>
      </ul>

      {/* --- Right Side Buttons --- */}
      <div className="navbar-right">
        {!user ? (
          <>
            {/* Desktop Buttons */}
            <button
              onClick={() => navigate("/login")}
              className="navbar-auth-btn login-btn"
            >
              <span className="btn-text">Login</span>
              <div className="btn-shine"></div>
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="navbar-auth-btn signup-btn"
            >
              <span className="btn-text">Signup</span>
              <div className="btn-pulse"></div>
            </button>
          </>
        ) : (
          <div className="navbar-user">
            <img
              src={
                user.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="User"
              className="user-avatar"
            />
            <button
              className="navbar-auth-btn logout-btn"
              onClick={handleLogout}
            >
              <span className="btn-text">Logout</span>
            </button>
          </div>
        )}
      </div>
      

      {/* --- Mobile Navbar --- */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="#services">
              Services
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#about">
              About
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#reviews">
              Reviews
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#doctors">
              Doctors
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#contact">
              Contact
            </a>
          </li>
          {!user ? (
            <>
              <li>
                <button
                  onClick={() => {
                    navigate("/login");
                    openNav();
                  }}
                  className="mobile-auth-btn mobile-login-btn"
                >
                  <span>Login</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/signup");
                    openNav();
                  }}
                  className="mobile-auth-btn mobile-signup-btn"
                >
                  <span>Signup</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} className="mobile-auth-btn mobile-logout-btn">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* --- Hamburger Icon --- */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;