"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import { toast } from "react-toastify"
import { Candy, Plus, Minus, Trash2, Package, Search, Filter, X } from "lucide-react"
import SweetCard from "../components/Sweets/SweetCard"
import AddSweetModal from "../components/Sweets/AddSweetModal"
import EditSweetModal from "../components/Sweets/EditSweetModal"

const Dashboard = () => {
  const { user, isAdmin } = useAuth()
  const [sweets, setSweets] = useState([])
  const [filteredSweets, setFilteredSweets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingSweet, setEditingSweet] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [showFilters, setShowFilters] = useState(false)
  const [categories, setCategories] = useState([])
  const [stats, setStats] = useState({
    totalSweets: 0,
    lowStock: 0,
    outOfStock: 0,
  })

  useEffect(() => {
    fetchSweets()
    fetchCategories()
  }, [])

  useEffect(() => {
    filterSweets()
  }, [sweets, searchQuery, selectedCategory, priceRange])

  const fetchSweets = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/sweets")
      setSweets(response.data.sweets)
      calculateStats(response.data.sweets)
    } catch (error) {
      toast.error("Failed to fetch sweets")
      console.error("Error fetching sweets:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/sweets/categories/list")
      setCategories(response.data.categories)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const filterSweets = () => {
    let filtered = [...sweets]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (sweet) =>
          sweet.name.toLowerCase().includes(query) ||
          sweet.category.toLowerCase().includes(query) ||
          (sweet.description && sweet.description.toLowerCase().includes(query)),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((sweet) => sweet.category === selectedCategory)
    }

    if (priceRange.min !== "" || priceRange.max !== "") {
      filtered = filtered.filter((sweet) => {
        const price = sweet.price
        const min = priceRange.min === "" ? 0 : Number.parseFloat(priceRange.min)
        const max = priceRange.max === "" ? Number.POSITIVE_INFINITY : Number.parseFloat(priceRange.max)
        return price >= min && price <= max
      })
    }

    setFilteredSweets(filtered)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setPriceRange({ min: "", max: "" })
    setShowFilters(false)
  }

  const calculateStats = (sweetsData) => {
    const totalSweets = sweetsData.length
    const lowStock = sweetsData.filter((sweet) => sweet.quantity > 0 && sweet.quantity <= 5).length
    const outOfStock = sweetsData.filter((sweet) => sweet.quantity === 0).length

    setStats({ totalSweets, lowStock, outOfStock })
  }

  const handlePurchase = async (sweetId, quantity = 1) => {
    try {
      const response = await axios.post(`/api/sweets/${sweetId}/purchase`, { quantity })
      toast.success(response.data.message)
      fetchSweets()
    } catch (error) {
      const message = error.response?.data?.message || "Purchase failed"
      toast.error(message)
    }
  }

  const handleRestock = async (sweetId, quantity) => {
    try {
      const response = await axios.post(`/api/sweets/${sweetId}/restock`, { quantity })
      toast.success(response.data.message)
      fetchSweets()
    } catch (error) {
      const message = error.response?.data?.message || "Restock failed"
      toast.error(message)
    }
  }

  const handleDelete = async (sweetId) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return

    try {
      await axios.delete(`/api/sweets/${sweetId}`)
      toast.success("Sweet deleted successfully")
      fetchSweets()
    } catch (error) {
      const message = error.response?.data?.message || "Delete failed"
      toast.error(message)
    }
  }

  const handleAddSweet = () => {
    setShowAddModal(true)
  }

  const handleEditSweet = (sweet) => {
    setEditingSweet(sweet)
  }

  const onSweetAdded = () => {
    setShowAddModal(false)
    fetchSweets()
  }

  const onSweetUpdated = () => {
    setEditingSweet(null)
    fetchSweets()
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
            {isAdmin ? "Sweet Shop Management" : "Sweet Shop Dashboard"}
          </h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
            Welcome back, {user?.username}! {isAdmin ? "Manage your inventory below." : "Browse and purchase sweets."}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3" style={{ marginBottom: "2rem" }}>
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
              <p style={{ color: "#64748b" }}>Total Sweets</p>
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
                <Minus size={20} color="white" />
              </div>
              <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "0.25rem" }}>
                {stats.lowStock}
              </h3>
              <p style={{ color: "#64748b" }}>Low Stock</p>
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
                <Trash2 size={20} color="white" />
              </div>
              <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "0.25rem" }}>
                {stats.outOfStock}
              </h3>
              <p style={{ color: "#64748b" }}>Out of Stock</p>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <div className="card-body">
            {/* Search Bar */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: 1, minWidth: "250px" }}>
                <Search
                  size={18}
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search sweets by name, category, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn ${showFilters ? "btn-primary" : "btn-outline"}`}
              >
                <Filter size={18} />
                Filters
              </button>
              {(searchQuery || selectedCategory || priceRange.min || priceRange.max) && (
                <button onClick={clearFilters} className="btn btn-secondary">
                  <X size={18} />
                  Clear
                </button>
              )}
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8fafc",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div className="grid md:grid-cols-3" style={{ gap: "1rem" }}>
                  {/* Category Filter */}
                  <div>
                    <label className="form-label">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="form-select"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="form-label">Min Price ($)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                      className="form-input"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="form-label">Max Price ($)</label>
                    <input
                      type="number"
                      placeholder="100.00"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                      className="form-input"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Results Summary */}
            <div style={{ marginTop: "1rem", color: "#64748b", fontSize: "0.875rem" }}>
              Showing {filteredSweets.length} of {sweets.length} sweets
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory && ` in ${selectedCategory}`}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1e293b" }}>Available Sweets</h2>
          {isAdmin && (
            <button onClick={handleAddSweet} className="btn btn-primary">
              <Plus size={18} />
              Add New Sweet
            </button>
          )}
        </div>

        {/* Sweets Grid */}
        {filteredSweets.length === 0 ? (
          <div className="card">
            <div className="card-body" style={{ textAlign: "center", padding: "3rem" }}>
              <Candy size={64} color="#94a3b8" style={{ marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1e293b", marginBottom: "0.5rem" }}>
                {sweets.length === 0 ? "No Sweets Available" : "No Sweets Match Your Search"}
              </h3>
              <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
                {sweets.length === 0
                  ? isAdmin
                    ? "Start by adding some sweets to your inventory."
                    : "Check back later for new arrivals!"
                  : "Try adjusting your search criteria or clearing filters."}
              </p>
              {sweets.length === 0 && isAdmin ? (
                <button onClick={handleAddSweet} className="btn btn-primary">
                  <Plus size={18} />
                  Add Your First Sweet
                </button>
              ) : (
                filteredSweets.length === 0 && (
                  <button onClick={clearFilters} className="btn btn-outline">
                    <X size={18} />
                    Clear Filters
                  </button>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                isAdmin={isAdmin}
                onPurchase={handlePurchase}
                onRestock={handleRestock}
                onEdit={handleEditSweet}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Modals */}
        {showAddModal && <AddSweetModal onClose={() => setShowAddModal(false)} onSweetAdded={onSweetAdded} />}

        {editingSweet && (
          <EditSweetModal sweet={editingSweet} onClose={() => setEditingSweet(null)} onSweetUpdated={onSweetUpdated} />
        )}
      </div>
    </div>
  )
}

export default Dashboard
