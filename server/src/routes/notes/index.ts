import express from 'express';
import { getNotesController, addNoteController, addNoteItemController, getNoteItemsByNoteIdController, deleteNoteItemController, deleteNoteController, updateNoteItemStatusController } from '../../controllers/notes';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.get('/notes', auth, getNotesController);
router.post('/notes', auth, addNoteController);
router.post('/notes/item', auth, addNoteItemController);
router.get('/notes/items', auth, getNoteItemsByNoteIdController);
router.delete('/notes/item/:id', auth, deleteNoteItemController);
router.delete('/notes/:id', auth, deleteNoteController);
router.put('/notes/item/:id', auth, updateNoteItemStatusController);

export default router;