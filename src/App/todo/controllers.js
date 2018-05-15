import mongoose from 'mongoose';
import Promise from 'bluebird';
Promise.promisifyAll(require('mongoose'));

const Todolist = mongoose.model('Todolist');

export default {
  async getTasks(req, res) {
    try {
      const result = await Todolist.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getTask(req, res) {
    const {id} = req.query;
    try {
      const result = await Todolist.find({
        _id: id
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addTask(req, res) {
    const {title, content} = req.query;
    try {
      const newTodo = new Todolist();
      newTodo.set({title, content});
      const result = await newTodo.save();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async editTask(req, res) {
    const {id, title, content} = req.query;
    const result = await Todolist.findById(id, function (err, doc) {
      if (err) {
        return res.status(500).json(err);
      }
      if (title) {
        doc.title = title; 
      }
      if (content) {
        doc.content = content;
      }
      doc.update = new Date;
      doc.save();
    });
    res.status(200).send('Edit successfully');
  },
  async setTaskStatus(req, res) {
    let {id, status} = req.query;
    try {
      const result = await Todolist.update({ _id: id}, {
        $set: {
          status
        }
      });
      res.status(200).send('Update task status successfully');
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteTask(req, res) {
    let {id} = req.query;
    try {
      const result = await Todolist.remove({_id: id});
      res.status(200).send('Delete task successfully');
    } catch (err) {
      res.status(500).json(err);
    }
  },
}
