"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { X, Save } from "lucide-react"

const EditSweetModal = ({ sweet, onClose, onSweetUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "chocolate",
    price: "",
    quantity: "",
    description: "",
    image: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const categories = ["chocolate", "candy", "gummy", "lollipop", "cake", "cookie", "other"]

  useEffect(() => {
    if (sweet) {
      setFormData({
        name: sweet.name || "",
        category: sweet.category || "chocolate",
        price: sweet.price?.toString() || "",
        quantity: sweet.quantity?.toString() || "",
        description: sweet.description || "",
        image: sweet.image || "",
      })
    }
  }, [sweet])

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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.price || isNaN(formData.price) || Number.parseFloat(formData.price) < 0) {
      newErrors.price = "Valid price is required"
    }

    if (!formData.quantity || isNaN(formData.quantity) || Number.parseInt(formData.quantity) < 0) {
      newErrors.quantity = "Valid quantity is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      await axios.put(`/api/sweets/${sweet._id}`, {
        ...formData,
        price: Number.parseFloat(formData.price),
        quantity: Number.parseInt(formData.quantity),
      })

      toast.success("Sweet updated successfully!")
      onSweetUpdated()
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update sweet"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1e293b" }}>Edit Sweet</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#64748b",
              padding: "0.25rem",
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Sweet Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? "error" : ""}`}
                placeholder="Enter sweet name"
                disabled={loading}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
                disabled={loading}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label htmlFor="price" className="form-label">
                  Price ($) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`form-input ${errors.price ? "error" : ""}`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  disabled={loading}
                />
                {errors.price && <div className="error-message">{errors.price}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="quantity" className="form-label">
                  Quantity *
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`form-input ${errors.quantity ? "error" : ""}`}
                  placeholder="0"
                  min="0"
                  disabled={loading}
                />
                {errors.quantity && <div className="error-message">{errors.quantity}</div>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter sweet description (optional)"
                rows="3"
                disabled={loading}
                style={{ resize: "vertical" }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="image" className="form-label">
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-input"
                placeholder="https://example.com/image.jpg (optional)"
                disabled={loading}
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "2rem" }}>
              <button type="button" onClick={onClose} className="btn btn-outline" disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <div className="spinner" style={{ width: "1rem", height: "1rem" }}></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Update Sweet
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditSweetModal
