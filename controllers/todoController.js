const Todo = require("../models/Todo.js");

exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const { text } = req.body;
  const newTodo = await Todo.create({ text });
  res.json(newTodo);
};

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

exports.clearTodos = async (req, res) => {
  await Todo.deleteMany([]);
  res.json({ message: "All Cleared" });
};
