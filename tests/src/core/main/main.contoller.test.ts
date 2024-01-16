import { MainController } from '../../../../src/main/main.controller'

describe('HealthController', () => {
  let mainController: MainController

  beforeEach(() => {
    mainController = new MainController()
  })

  describe('run', () => {
    it('should return is main', () => {
      expect(mainController.run()).toEqual({ status: 'ok' })
    })
  })
})
