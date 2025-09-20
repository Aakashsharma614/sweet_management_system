"use client"

import { useState } from "react"
import { Candy, ShoppingCart, Edit, Trash2, Plus, Package } from "lucide-react"

const SweetCard = ({ sweet, isAdmin, onPurchase, onRestock, onEdit, onDelete }) => {
  const [purchaseQuantity, setPurchaseQuantity] = useState(1)
  const [restockQuantity, setRestockQuantity] = useState(10)
  const [showRestockInput, setShowRestockInput] = useState(false)

  const handlePurchase = () => {
    onPurchase(sweet._id, purchaseQuantity)
    setPurchaseQuantity(1)
  }

  const handleRestock = () => {
    onRestock(sweet._id, restockQuantity)
    setRestockQuantity(10)
    setShowRestockInput(false)
  }

  const getStockStatus = () => {
    if (sweet.quantity === 0) return { text: "Out of Stock", color: "#ef4444" }
    if (sweet.quantity <= 5) return { text: "Low Stock", color: "#f59e0b" }
    return { text: "In Stock", color: "#10b981" }
  }

  const stockStatus = getStockStatus()

  return (
    <div className="card">
      <div className="card-body">
        {/* Sweet Image */}
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: "#f1f5f9",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
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
              }}
            />
          ) : (
            <Candy size={48} color="#94a3b8" />
          )}
        </div>

        {/* Sweet Info */}
        <div style={{ marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1e293b", marginBottom: "0.5rem" }}>
            {sweet.name}
          </h3>
          <p style={{ color: "#64748b", textTransform: "capitalize", marginBottom: "0.5rem" }}>{sweet.category}</p>
          {sweet.description && (
            <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{sweet.description}</p>
          )}
        </div>

        {/* Price and Stock */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#3b82f6" }}>${sweet.price.toFixed(2)}</span>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: stockStatus.color, fontSize: "0.875rem", fontWeight: "500" }}>{stockStatus.text}</div>
            <div style={{ color: "#64748b", fontSize: "0.75rem" }}>{sweet.quantity} available</div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {/* Purchase Section */}
          {!isAdmin && sweet.quantity > 0 && (
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input
                type="number"
                min="1"
                max={sweet.quantity}
                value={purchaseQuantity}
                onChange={(e) => setPurchaseQuantity(Number.parseInt(e.target.value) || 1)}
                style={{
                  width: "60px",
                  padding: "0.5rem",
                  border: "2px solid #e2e8f0",
                  borderRadius: "0.25rem",
                  fontSize: "0.875rem",
                }}
              />
              <button onClick={handlePurchase} className="btn btn-success" style={{ flex: 1 }}>
                <ShoppingCart size={16} />
                Buy Now
              </button>
            </div>
          )}

          {/* Admin Actions */}
          {isAdmin && (
            <>
              {/* Restock Section */}
              <div>
                {!showRestockInput ? (
                  <button
                    onClick={() => setShowRestockInput(true)}
                    className="btn btn-secondary"
                    style={{ width: "100%" }}
                  >
                    <Package size={16} />
                    Restock
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <input
                      type="number"
                      min="1"
                      value={restockQuantity}
                      onChange={(e) => setRestockQuantity(Number.parseInt(e.target.value) || 1)}
                      style={{
                        width: "80px",
                        padding: "0.5rem",
                        border: "2px solid #e2e8f0",
                        borderRadius: "0.25rem",
                        fontSize: "0.875rem",
                      }}
                    />
                    <button onClick={handleRestock} className="btn btn-success" style={{ flex: 1 }}>
                      <Plus size={16} />
                      Add Stock
                    </button>
                    <button
                      onClick={() => setShowRestockInput(false)}
                      className="btn btn-outline"
                      style={{ padding: "0.5rem" }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              {/* Edit and Delete */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => onEdit(sweet)} className="btn btn-outline" style={{ flex: 1 }}>
                  <Edit size={16} />
                  Edit
                </button>
                <button onClick={() => onDelete(sweet._id)} className="btn btn-danger" style={{ flex: 1 }}>
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </>
          )}

          {/* Out of Stock Message */}
          {!isAdmin && sweet.quantity === 0 && (
            <div
              style={{
                padding: "0.75rem",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "0.5rem",
                textAlign: "center",
                color: "#dc2626",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Currently out of stock
            </div>
          )}
        </div>

        {/* Created By (for admin) */}
        {isAdmin && sweet.createdBy && (
          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e2e8f0" }}>
            <p style={{ color: "#64748b", fontSize: "0.75rem" }}>Added by: {sweet.createdBy.username || "Unknown"}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SweetCard
