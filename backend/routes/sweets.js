const express = require("express")
const { body, validationResult, query } = require("express-validator")
const Sweet = require("../models/Sweet")
const { auth, adminAuth } = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/sweets
// @desc    Get all sweets
// @access  Public
router.get("/", async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const sweets = await Sweet.find().populate("createdBy", "username").sort({ createdAt: -1 }).skip(skip).limit(limit)

    const total = await Sweet.countDocuments()

    res.json({
      sweets,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   GET /api/sweets/search
// @desc    Search sweets by name, category, or price range
// @access  Public
router.get(
  "/search",
  [
    query("q").optional().isString().withMessage("Search query must be a string"),
    query("category").optional().isString().withMessage("Category must be a string"),
    query("minPrice").optional().isNumeric().withMessage("Min price must be a number"),
    query("maxPrice").optional().isNumeric().withMessage("Max price must be a number"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { q, category, minPrice, maxPrice } = req.query
      const searchQuery = {}

      // Text search
      if (q) {
        searchQuery.$text = { $search: q }
      }

      // Category filter
      if (category) {
        searchQuery.category = category.toLowerCase()
      }

      // Price range filter
      if (minPrice || maxPrice) {
        searchQuery.price = {}
        if (minPrice) searchQuery.price.$gte = Number.parseFloat(minPrice)
        if (maxPrice) searchQuery.price.$lte = Number.parseFloat(maxPrice)
      }

      const sweets = await Sweet.find(searchQuery).populate("createdBy", "username").sort({ createdAt: -1 })

      res.json({ sweets, count: sweets.length })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// @route   GET /api/sweets/:id
// @desc    Get single sweet by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id).populate("createdBy", "username")

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" })
    }

    res.json(sweet)
  } catch (error) {
    console.error(error)
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Sweet not found" })
    }
    res.status(500).json({ message: "Server error" })
  }
})

// @route   POST /api/sweets
// @desc    Add a new sweet
// @access  Private
router.post(
  "/",
  [
    auth,
    body("name").notEmpty().withMessage("Name is required"),
    body("category")
      .isIn(["chocolate", "candy", "gummy", "lollipop", "cake", "cookie", "other"])
      .withMessage("Invalid category"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("quantity").isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { name, category, price, quantity, description, image } = req.body

      const sweet = new Sweet({
        name,
        category: category.toLowerCase(),
        price: Number.parseFloat(price),
        quantity: Number.parseInt(quantity),
        description,
        image,
        createdBy: req.user._id,
      })

      await sweet.save()
      await sweet.populate("createdBy", "username")

      res.status(201).json({
        message: "Sweet added successfully",
        sweet,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// @route   PUT /api/sweets/:id
// @desc    Update a sweet's details
// @access  Private
router.put(
  "/:id",
  [
    auth,
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("category")
      .optional()
      .isIn(["chocolate", "candy", "gummy", "lollipop", "cake", "cookie", "other"])
      .withMessage("Invalid category"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("quantity").optional().isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const sweet = await Sweet.findById(req.params.id)

      if (!sweet) {
        return res.status(404).json({ message: "Sweet not found" })
      }

      // Check if user is admin or the creator of the sweet
      if (req.user.role !== "admin" && sweet.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access denied" })
      }

      const { name, category, price, quantity, description, image } = req.body

      // Update fields
      if (name) sweet.name = name
      if (category) sweet.category = category.toLowerCase()
      if (price !== undefined) sweet.price = Number.parseFloat(price)
      if (quantity !== undefined) sweet.quantity = Number.parseInt(quantity)
      if (description !== undefined) sweet.description = description
      if (image !== undefined) sweet.image = image

      await sweet.save()
      await sweet.populate("createdBy", "username")

      res.json({
        message: "Sweet updated successfully",
        sweet,
      })
    } catch (error) {
      console.error(error)
      if (error.kind === "ObjectId") {
        return res.status(404).json({ message: "Sweet not found" })
      }
      res.status(500).json({ message: "Server error" })
    }
  },
)

// @route   DELETE /api/sweets/:id
// @desc    Delete a sweet (Admin only)
// @access  Private (Admin)
router.delete("/:id", [auth, adminAuth], async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id)

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" })
    }

    await Sweet.findByIdAndDelete(req.params.id)

    res.json({ message: "Sweet deleted successfully" })
  } catch (error) {
    console.error(error)
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Sweet not found" })
    }
    res.status(500).json({ message: "Server error" })
  }
})

// @route   POST /api/sweets/:id/purchase
// @desc    Purchase a sweet, decreasing its quantity
// @access  Private
router.post(
  "/:id/purchase",
  [auth, body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1")],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const sweet = await Sweet.findById(req.params.id)

      if (!sweet) {
        return res.status(404).json({ message: "Sweet not found" })
      }

      const purchaseQuantity = Number.parseInt(req.body.quantity)

      if (sweet.quantity < purchaseQuantity) {
        return res.status(400).json({
          message: `Insufficient stock. Only ${sweet.quantity} items available.`,
        })
      }

      sweet.quantity -= purchaseQuantity
      await sweet.save()

      res.json({
        message: `Successfully purchased ${purchaseQuantity} ${sweet.name}(s)`,
        sweet,
        purchasedQuantity: purchaseQuantity,
        remainingStock: sweet.quantity,
      })
    } catch (error) {
      console.error(error)
      if (error.kind === "ObjectId") {
        return res.status(404).json({ message: "Sweet not found" })
      }
      res.status(500).json({ message: "Server error" })
    }
  },
)

// @route   POST /api/sweets/:id/restock
// @desc    Restock a sweet, increasing its quantity (Admin only)
// @access  Private (Admin)
router.post(
  "/:id/restock",
  [auth, adminAuth, body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1")],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const sweet = await Sweet.findById(req.params.id)

      if (!sweet) {
        return res.status(404).json({ message: "Sweet not found" })
      }

      const restockQuantity = Number.parseInt(req.body.quantity)
      sweet.quantity += restockQuantity
      await sweet.save()

      res.json({
        message: `Successfully restocked ${restockQuantity} ${sweet.name}(s)`,
        sweet,
        restockedQuantity: restockQuantity,
        newStock: sweet.quantity,
      })
    } catch (error) {
      console.error(error)
      if (error.kind === "ObjectId") {
        return res.status(404).json({ message: "Sweet not found" })
      }
      res.status(500).json({ message: "Server error" })
    }
  },
)

// @route   GET /api/sweets/categories/list
// @desc    Get all available categories
// @access  Public
router.get("/categories/list", async (req, res) => {
  try {
    const categories = ["chocolate", "candy", "gummy", "lollipop", "cake", "cookie", "other"]
    res.json({ categories })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
