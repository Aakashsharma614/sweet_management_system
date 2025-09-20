"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Users, Package, TrendingUp, AlertTriangle, Candy } from "lucide-react"

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalSweets: 0,
    totalValue: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/sweets")
      const sweets = response.data.sweets

      // Calculate stats
      const totalSweets = sweets.length
      const totalValue = sweets.reduce((sum, sweet) => sum + sweet.price * sweet.quantity, 0)
      const lowStockItems = sweets.filter((sweet) => sweet.quantity > 0 && sweet.quantity <= 5).length
      const outOfStockItems = sweets.filter((sweet) => sweet.quantity === 0).length

      setStats({
        totalSweets,
        totalValue,
        lowStockItems,
        outOfStockItems,
      })

      // Mock recent activity (in a real app, this would come from an activity log)
      setRecentActivity([
        { id: 1, action: "Sweet added", item: "Chocolate Truffle", time: "2 hours ago" },
        { id: 2, action: "Stock updated", item: "Gummy Bears", time: "4 hours ago" },
        { id: 3, action: "Sweet purchased", item: "Lollipop", time: "6 hours ago" },
        { id: 4, action: "Sweet deleted", item: "Old Candy", time: "1 day ago" },
      ])
    } catch (error) {
      toast.error("Failed to fetch admin data")
      console.error("Error fetching admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div style={{ padding: "2rem 0", minHeight: "calc(100vh - 80px)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1e293b", marginBottom: "0.5rem" }}>
            Admin Dashboard
          </h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
            Monitor your sweet shop's performance and manage inventory.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4" style={{ marginBottom: "2rem" }}>
          <div className="card">
            <div className="card-body" style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  backgroundColor: "#3b82f6",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                <Package size={20} color="white" />
              </div>
              <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "0.25rem" }}>
                {stats.totalSweets}
              </h3>
              <p style={{ color: "#64748b" }}>Total Products</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  backgroundColor: "#10b981",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                <TrendingUp size={20} color="white" />
              </div>
              <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "0.25rem" }}>
                ${stats.totalValue.toFixed(2)}
              </h3>
              <p style={{ color: "#64748b" }}>Inventory Value</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  backgroundColor: "#f59e0b",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                <AlertTriangle size={20} color="white" />
              </div>
              <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "0.25rem" }}>
                {stats.lowStockItems}
              </h3>
              <p style={{ color: "#64748b" }}>Low Stock Items</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  backgroundColor: "#ef4444",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                <Package size={20} color="white" />
              </div>
              <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "0.25rem" }}>
                {stats.outOfStockItems}
              </h3>
              <p style={{ color: "#64748b" }}>Out of Stock</p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2" style={{ gap: "2rem" }}>
          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1e293b" }}>Quick Actions</h3>
            </div>
            <div className="card-body">
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="btn btn-primary"
                  style={{ justifyContent: "flex-start" }}
                >
                  <Candy size={18} />
                  Manage Inventory
                </button>
                <button
                  onClick={() => toast.info("User management coming soon!")}
                  className="btn btn-outline"
                  style={{ justifyContent: "flex-start" }}
                >
                  <Users size={18} />
                  View Users
                </button>
                <button
                  onClick={() => toast.info("Reports coming soon!")}
                  className="btn btn-outline"
                  style={{ justifyContent: "flex-start" }}
                >
                  <TrendingUp size={18} />
                  View Reports
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1e293b" }}>Recent Activity</h3>
            </div>
            <div className="card-body">
              {recentActivity.length === 0 ? (
                <p style={{ color: "#64748b", textAlign: "center", padding: "2rem" }}>No recent activity</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.75rem",
                        backgroundColor: "#f8fafc",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: "500", color: "#1e293b", marginBottom: "0.25rem" }}>
                          {activity.action}
                        </p>
                        <p style={{ color: "#64748b", fontSize: "0.875rem" }}>{activity.item}</p>
                      </div>
                      <span style={{ color: "#64748b", fontSize: "0.75rem" }}>{activity.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alerts */}
        {(stats.lowStockItems > 0 || stats.outOfStockItems > 0) && (
          <div className="card" style={{ marginTop: "2rem", borderLeft: "4px solid #f59e0b" }}>
            <div className="card-body">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <AlertTriangle size={24} color="#f59e0b" />
                <div>
                  <h4 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#1e293b", marginBottom: "0.25rem" }}>
                    Inventory Alerts
                  </h4>
                  <p style={{ color: "#64748b" }}>
                    {stats.lowStockItems > 0 && `${stats.lowStockItems} items are running low on stock. `}
                    {stats.outOfStockItems > 0 && `${stats.outOfStockItems} items are out of stock. `}
                    Consider restocking soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
