import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppointmentForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [patientGender, setPatientGender] = useState("default");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [preferredMode, setPreferredMode] = useState("default");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!patientName.trim()) {
      errors.patientName = "Patient name is required";
    } else if (patientName.trim().length < 8) {
      errors.patientName = "Patient name must be at least 8 characters";
    }

    if (!patientNumber.trim()) {
      errors.patientNumber = "Patient phone number is required";
    } else if (patientNumber.trim().length !== 10) {
      errors.patientNumber = "Patient phone number must be of 10 digits";
    }

    if (patientGender === "default") {
      errors.patientGender = "Please select patient gender";
    }

    if (!appointmentTime) {
      errors.appointmentTime = "Appointment time is required";
    } else {
      const selectedTime = new Date(appointmentTime).getTime();
      const currentTime = new Date().getTime();
      if (selectedTime <= currentTime) {
        errors.appointmentTime = "Please select a future appointment time";
      }
    }

    if (preferredMode === "default") {
      errors.preferredMode = "Please select preferred mode";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Reset form
    setPatientName("");
    setPatientNumber("");
    setPatientGender("default");
    setAppointmentTime("");
    setPreferredMode("default");
    setFormErrors({});

    toast.success("Appointment Scheduled!", {
      position: toast.POSITION.TOP_CENTER,
      onOpen: () => setIsSubmitted(true),
      onClose: () => setIsSubmitted(false),
    });
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Poppins", sans-serif;
          background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .appointment-form-section {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 40px 50px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          width: 90%;
          max-width: 600px;
          animation: fadeIn 0.8s ease;
          margin: 40px auto;
        }

        .legal-siteTitle {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: #1565c0;
          margin-bottom: 25px;
        }

        .legal-siteTitle a {
          text-decoration: none;
          color: inherit;
        }

        .legal-siteSign {
          color: #43a047;
          font-size: 2.2rem;
        }

        .form-container {
          background: #ffffffd9;
          padding: 25px 30px;
          border-radius: 15px;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.07);
        }

        .form-title {
          text-align: center;
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: #2e7d32;
        }

        .form-content label {
          display: block;
          font-weight: 500;
          margin-bottom: 8px;
          color: #37474f;
        }

        .form-content input,
        .form-content select {
          width: 100%;
          padding: 12px 15px;
          border: 1.5px solid #cfd8dc;
          border-radius: 10px;
          font-size: 1rem;
          margin-bottom: 15px;
          transition: all 0.3s ease;
        }

        .form-content input:focus,
        .form-content select:focus {
          border-color: #43a047;
          box-shadow: 0 0 5px rgba(67, 160, 71, 0.4);
          outline: none;
        }

        .text-appointment-btn {
          width: 100%;
          background: linear-gradient(135deg, #43a047, #2e7d32);
          color: white;
          border: none;
          padding: 14px 0;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.3s;
        }

        .text-appointment-btn:hover {
          background: linear-gradient(135deg, #388e3c, #1b5e20);
          transform: translateY(-1px);
        }

        .error-message {
          color: #e53935;
          font-size: 0.9rem;
          margin-top: -8px;
          margin-bottom: 10px;
        }

        .success-message {
          text-align: center;
          color: #2e7d32;
          font-size: 0.95rem;
          margin-top: 15px;
          animation: fadeIn 0.6s ease;
        }

        .legal-footer {
          text-align: center;
          font-size: 0.85rem;
          color: #78909c;
          margin-top: 25px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 500px) {
          .appointment-form-section {
            padding: 25px 20px;
          }

          .form-container {
            padding: 20px;
          }

          .legal-siteTitle {
            font-size: 1.6rem;
          }
        }
      `}</style>

      <div className="appointment-form-section">
        <h1 className="legal-siteTitle">
          <Link to="/">
            Health <span className="legal-siteSign">+</span>
          </Link>
        </h1>

        <div className="form-container">
          <h2 className="form-title">
            <span>Book Appointment Online</span>
          </h2>

          <form className="form-content" onSubmit={handleSubmit}>
            <label>
              Patient Full Name:
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
              {formErrors.patientName && (
                <p className="error-message">{formErrors.patientName}</p>
              )}
            </label>

            <label>
              Patient Phone Number:
              <input
                type="text"
                value={patientNumber}
                onChange={(e) => setPatientNumber(e.target.value)}
                required
              />
              {formErrors.patientNumber && (
                <p className="error-message">{formErrors.patientNumber}</p>
              )}
            </label>

            <label>
              Patient Gender:
              <select
                value={patientGender}
                onChange={(e) => setPatientGender(e.target.value)}
                required
              >
                <option value="default">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="private">I will inform Doctor only</option>
              </select>
              {formErrors.patientGender && (
                <p className="error-message">{formErrors.patientGender}</p>
              )}
            </label>

            <label>
              Preferred Appointment Time:
              <input
                type="datetime-local"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
              />
              {formErrors.appointmentTime && (
                <p className="error-message">{formErrors.appointmentTime}</p>
              )}
            </label>

            <label>
              Preferred Mode:
              <select
                value={preferredMode}
                onChange={(e) => setPreferredMode(e.target.value)}
                required
              >
                <option value="default">Select</option>
                <option value="voice">Voice Call</option>
                <option value="video">Video Call</option>
              </select>
              {formErrors.preferredMode && (
                <p className="error-message">{formErrors.preferredMode}</p>
              )}
            </label>

            <button type="submit" className="text-appointment-btn">
              Confirm Appointment
            </button>

            <p
              className="success-message"
              style={{ display: isSubmitted ? "block" : "none" }}
            >
              Appointment details have been sent to the patient’s phone number
              via SMS.
            </p>
          </form>
        </div>

        <div className="legal-footer">
          <p>© 2013-2025 Health+. All rights reserved.</p>
        </div>

        <ToastContainer autoClose={5000} limit={1} closeButton={false} />
      </div>
    </>
  );
}

export default AppointmentForm;
