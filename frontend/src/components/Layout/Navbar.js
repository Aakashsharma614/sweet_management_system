"use client"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Candy, User, LogOut, Settings, Home } from "lucide-react"

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav
      style={{
        background: "white",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "#3b82f6",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          <Candy size={32} />
          Sweet Shop
        </Link>

        {/* Navigation Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              textDecoration: "none",
              color: "#64748b",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f5f9")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            <Home size={18} />
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  textDecoration: "none",
                  color: "#64748b",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f5f9")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
              >
                <User size={18} />
                Dashboard
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    textDecoration: "none",
                    color: "#64748b",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f5f9")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                  <Settings size={18} />
                  Admin
                </Link>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginLeft: "1rem",
                  paddingLeft: "1rem",
                  borderLeft: "1px solid #e2e8f0",
                }}
              >
                <span style={{ color: "#64748b", fontSize: "0.875rem" }}>Welcome, {user?.username}</span>
                <button onClick={handleLogout} className="btn btn-outline" style={{ padding: "0.5rem 1rem" }}>
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
