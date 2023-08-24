const Notes = require("../model/Notes");
const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

router.get("/fetchNotes", fetchUser, async (req, res) => {
  try {
    const user = req.user.id;
    // console.log(user);
    const notes = await Notes.find({ user: user });
    res.json(notes);
  } catch (err) {console.error(err.message);
    res.send(500).send("ERROR occured");}
});

router.post(
  "/addNotes",
  fetchUser,[
    body("title", "minimum 5 characters").isLength({ min: 3 }),
    body("description", "minimum 3 characters").isLength({ min: 5 })
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      const user = req.user.id;
      const { title, description, tag } = req.body;
      const notes = new Notes({ title, description, tag, user: user });
      const savedNotes = await notes.save();
      res.json(savedNotes);
    } catch (err) {console.error(err.message);
        res.send(500).send("ERROR occured");}
  }
);

router.put(
  "/updateNote/:id",
  fetchUser,
  body("title", "minimum 5 characters").isLength({ min: 3 }),
  body("description", "minimum 3 characters").isLength({ min: 5 }),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      const user = req.user.id;
      const { title, description, tag } = req.body;

      const newNotes ={}
      if(title)newNotes.title=title;
      if(description)newNotes.description = description
      if(tag)newNotes.tag=tag

      let notes = await Notes.findById(req.params.id)

      if(!notes) return res.status(404).send("not Found")

      if(user!==notes.user.toString()) return res.status(401).send('not Allowed')

       notes = await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true});
      res.json(notes);
    } catch (err) {console.error(err.message);
        res.status(500).send("ERROR occured");}
  }
);

router.delete(
  "/deleteNote/:id", fetchUser,async (req, res) => {

    try {
      const user = req.user.id;
    

      let notes = await Notes.findById(req.params.id)

      if(!notes) return res.status(404).send("not Found")

      if(user!==notes.user.toString()) return res.status(401).send('not Allowed')

       notes = await Notes.findByIdAndDelete(req.params.id);
      res.json({"success": 'Note has been deleted',notes:notes});
    } catch (err) {console.error(err.message);
        res.status(500).send("ERROR occured");}
  }
);
module.exports = router;
