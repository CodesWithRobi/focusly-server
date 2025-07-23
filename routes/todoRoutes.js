const express = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  clearTodos,
} = require("../controllers/todoController");
const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.delete("/", clearTodos);

module.exports = router;
