import { MainController } from '../../../../src/core/main/main.controller';

describe('HealthController', () => {
  let mainController: MainController;

  beforeEach(() => {
    mainController = new MainController();
  });

  describe('run', () => {
    it('should return is main', () => {
      expect(mainController.run()).toEqual({ status: 'ok' });
    });
  });
});
