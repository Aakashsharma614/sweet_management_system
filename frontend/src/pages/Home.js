"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import { Candy, ShoppingCart, Star, ArrowRight } from "lucide-react"

const Home = () => {
  const { isAuthenticated } = useAuth()
  const [featuredSweets, setFeaturedSweets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedSweets = async () => {
      try {
        const response = await axios.get("/api/sweets?limit=6")
        setFeaturedSweets(response.data.sweets)
      } catch (error) {
        console.error("Error fetching sweets:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedSweets()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <Candy size={64} style={{ marginBottom: "1rem" }} />
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                lineHeight: "1.2",
              }}
            >
              Welcome to Sweet Shop
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                marginBottom: "2rem",
                opacity: 0.9,
              }}
            >
              Discover the finest collection of sweets, candies, and treats. From classic chocolates to modern
              confections, we have something for every sweet tooth.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              {!isAuthenticated ? (
                <>
                  <Link to="/register" className="btn btn-primary" style={{ fontSize: "1.1rem" }}>
                    Get Started
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-outline"
                    style={{
                      fontSize: "1.1rem",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      color: "white",
                    }}
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link to="/dashboard" className="btn btn-primary" style={{ fontSize: "1.1rem" }}>
                  <ShoppingCart size={20} />
                  Start Shopping
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "4rem 0", backgroundColor: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#1e293b" }}>
              Why Choose Sweet Shop?
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#64748b", maxWidth: "600px", margin: "0 auto" }}>
              We're committed to bringing you the highest quality sweets with exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-3" style={{ gap: "2rem" }}>
            <div className="card" style={{ textAlign: "center" }}>
              <div className="card-body">
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    backgroundColor: "#3b82f6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                  }}
                >
                  <Star size={24} color="white" />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#1e293b" }}>
                  Premium Quality
                </h3>
                <p style={{ color: "#64748b" }}>
                  We source only the finest ingredients and work with trusted suppliers to ensure every sweet meets our
                  high standards.
                </p>
              </div>
            </div>

            <div className="card" style={{ textAlign: "center" }}>
              <div className="card-body">
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    backgroundColor: "#10b981",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                  }}
                >
                  <ShoppingCart size={24} color="white" />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#1e293b" }}>
                  Easy Shopping
                </h3>
                <p style={{ color: "#64748b" }}>
                  Browse our extensive catalog, search by category, and purchase your favorites with just a few clicks.
                </p>
              </div>
            </div>

            <div className="card" style={{ textAlign: "center" }}>
              <div className="card-body">
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    backgroundColor: "#f59e0b",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                  }}
                >
                  <Candy size={24} color="white" />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#1e293b" }}>
                  Wide Selection
                </h3>
                <p style={{ color: "#64748b" }}>
                  From classic chocolates to exotic gummies, our diverse collection has something to satisfy every
                  craving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sweets Section */}
      <section style={{ padding: "4rem 0", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#1e293b" }}>
              Featured Sweets
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#64748b" }}>Check out some of our most popular treats</p>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : featuredSweets.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {featuredSweets.map((sweet) => (
                <div key={sweet._id} className="card">
                  <div className="card-body">
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        backgroundColor: "#e2e8f0",
                        borderRadius: "0.5rem",
                        marginBottom: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {sweet.image ? (
                        <img
                          src={sweet.image || "/placeholder.svg"}
                          alt={sweet.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "0.5rem",
                          }}
                        />
                      ) : (
                        <Candy size={48} color="#94a3b8" />
                      )}
                    </div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#1e293b" }}>
                      {sweet.name}
                    </h3>
                    <p
                      style={{
                        color: "#64748b",
                        marginBottom: "0.5rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {sweet.category}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#3b82f6" }}>
                        ${sweet.price.toFixed(2)}
                      </span>
                      <span
                        style={{
                          color: sweet.quantity > 0 ? "#10b981" : "#ef4444",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                        }}
                      >
                        {sweet.quantity > 0 ? `${sweet.quantity} in stock` : "Out of stock"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
                No sweets available at the moment. Check back soon!
              </p>
            </div>
          )}

          {featuredSweets.length > 0 && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="btn btn-primary"
                style={{ fontSize: "1.1rem" }}
              >
                {isAuthenticated ? "View All Sweets" : "Join to Shop"}
                <ArrowRight size={20} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
