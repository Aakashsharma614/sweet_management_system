"use client"

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    const result = await login(formData.email, formData.password)

    if (result.success) {
      navigate("/dashboard")
    }
    setLoading(false)
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="card" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-header" style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "0.5rem" }}>
            Welcome Back
          </h1>
          <p style={{ color: "#64748b" }}>Sign in to your sweet shop account</p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <Mail size={18} style={{ display: "inline", marginRight: "0.5rem" }} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? "error" : ""}`}
                placeholder="Enter your email"
                disabled={loading}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <Lock size={18} style={{ display: "inline", marginRight: "0.5rem" }} />
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? "error" : ""}`}
                  placeholder="Enter your password"
                  disabled={loading}
                  style={{ paddingRight: "3rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#64748b",
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: "100%", marginTop: "1rem" }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: "1rem", height: "1rem" }}></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <div className="card-footer" style={{ textAlign: "center" }}>
          <p style={{ color: "#64748b" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#3b82f6",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
