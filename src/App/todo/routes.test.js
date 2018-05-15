import mongoose from 'mongoose';
import httpMocks from 'node-mocks-http';
import Todolist from '../../Schemas/TodolistSchema';
import controllers from './controllers';

describe('Test simulate game', async () => {
  let testId;

  beforeAll(() => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/TodolistTest');
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
  });

  it('add task', async (done) => {
    let request  = httpMocks.createRequest({
      method: 'POST',
      url: '/add/task',
      query: {
        title: 'Test1',
        content: 'add for unit test'
      }
    });
    let response = httpMocks.createResponse();
    await controllers.addTask(request, response);
    const data = JSON.parse(response._getData());
    testId = data._id;
    expect(response._getStatusCode()).toBe(200);
    expect(testId).not.toBeNull();
    done();
  });

  it('view all tasks', async (done) => {
    let request  = httpMocks.createRequest({
      method: 'GET',
      url: '/',
    });
    let response = httpMocks.createResponse();
    await controllers.getTasks(request, response);
    const data = response._getData();
    expect(response._getStatusCode()).toBe(200);
    done();
  });

  it('view task', async (done) => {
    let request  = httpMocks.createRequest({
      method: 'GET',
      url: '/task',
      query: {
        id: testId,
      }
    });
    let response = httpMocks.createResponse();
    await controllers.getTask(request, response);
    const data = response._getData();
    expect(response._getStatusCode()).toBe(200);
    done();
  });

  it('edit task', async (done) => {
    let request  = httpMocks.createRequest({
      method: 'POST',
      url: '/task',
      query: {
        id: testId,
        content: 'edit content'
      }
    });
    let response = httpMocks.createResponse();
    await controllers.editTask(request, response);
    const data = response._getData();
    expect(response._getStatusCode()).toBe(200);
    done();
  });

  it('set task status', async (done) => {
    let request  = httpMocks.createRequest({
      method: 'POST',
      url: '/task',
      query: {
        id: testId,
        status: 'done'
      }
    });
    let response = httpMocks.createResponse();
    await controllers.setTaskStatus(request, response);
    const data = response._getData();
    expect(response._getStatusCode()).toBe(200);
    expect(data).toBe('Update task status successfully');
    done();
  });

  it('delete task', async (done) => {
    let request  = httpMocks.createRequest({
      method: 'DELETE',
      url: '/delete/task',
      query: {
        id: testId
      }
    });
    let response = httpMocks.createResponse();
    await controllers.deleteTask(request, response);
    const data = response._getData();
    expect(response._getStatusCode()).toBe(200);
    expect(data).toBe('Delete task successfully');
    done();
  });

  afterAll((done) => {
    mongoose.disconnect();
  });
});
