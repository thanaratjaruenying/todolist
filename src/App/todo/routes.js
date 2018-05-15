import controllers from './controllers';

export function setup(router) {
  router.all('/', (req, res) => {
    controllers.getTasks(req, res);
  });

  router.get('/task', (req, res) => {
    controllers.getTask(req, res);
  });

  router.post('/add/task', (req, res) => {
    controllers.addTask(req, res);
  });

  router.post('/edit/task', async (req, res) => {
    controllers.editTask(req, res);
  });

  router.post('/set/task', async (req, res) => {
    controllers.setTaskStatus(req, res);
  });

  router.delete('/delete/task', async (req, res) => {
    controllers.deleteTask(req, res);
  });
}
