const mongoose = require("mongoose")

const sweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      enum: ["chocolate", "candy", "gummy", "lollipop", "cake", "cookie", "other"],
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    image: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for search functionality
sweetSchema.index({ name: "text", category: "text", description: "text" })

module.exports = mongoose.model("Sweet", sweetSchema)
