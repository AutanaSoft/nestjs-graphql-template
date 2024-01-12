import { createMock } from '@golevelup/ts-jest';
import { Logger } from '@nestjs/common';

import { MainController } from '../../../../src/core/main/main.controller';

describe('HealthController', () => {
  let mainController: MainController;
  let logger: jest.Mocked<Logger>;

  beforeEach(() => {
    logger = createMock<Logger>();
    mainController = new MainController(logger);
  });

  describe('run', () => {
    it('should return is main', () => {
      expect(mainController.run()).toEqual({ status: 'ok' });
      expect(logger.log).toHaveBeenCalledTimes(1);
    });
  });
});
