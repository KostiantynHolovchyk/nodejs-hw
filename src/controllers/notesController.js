import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { tag, search, page = 1, perPage = 10 } = req.query;
  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);
  const skip = (pageNumber - 1) * perPageNumber;
  let query = Note.find();
  if (tag) {
    query = query.where('tag').equals(tag);
  }
  if (search) {
    query = query.find({ $text: { $search: search } });
  }
  const [notes, totalNotes] = await Promise.all([
    query.clone().skip(skip).limit(perPageNumber),
    query.clone().countDocuments(),
  ]);
  const totalPages = Math.ceil(totalNotes / perPageNumber);
  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndDelete(noteId);
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndUpdate(noteId, req.body, {
    returnDocument: 'after',
  });
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};
