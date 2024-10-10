const mongoose = require("mongoose");

const sessionNoteSchema = new mongoose.Schema(
  {
    counselor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    note: { type: String, required: true },
    attachments: { type: [String], default: [] },
  },
  { timestamps: true }
);

const SessionNote = mongoose.model("SessionNote", sessionNoteSchema);

module.exports = SessionNote;
