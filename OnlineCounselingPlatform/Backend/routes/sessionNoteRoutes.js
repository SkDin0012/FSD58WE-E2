const express = require('express');
const { createSessionNote, getSessionNotes } = require('../controllers/sessionNoteController');

const router = express.Router();

router.post('/', createSessionNote);
router.get('/', getSessionNotes);

module.exports = router;
