import test from 'japa'
import { ConfigContract } from '@ioc:Adonis/Core/Config'
import { mock, when, instance } from 'ts-mockito'
import BullMQProvider from '../providers/BullMQProvider'
import { Config } from '@adonisjs/config'
import { AdonisApplication } from '../test-helpers/TestAdonisApp'
import { ContainerBindings } from '@ioc:Adonis/Core/Application'
import BullMQ from '@ioc:Adonis/Addons/BullMQ'

interface TestProps {
  name: string
}

async function createAdonisApp(mockedServices: Partial<ContainerBindings>) {
  const app = await new AdonisApplication([], []).loadApp()
  for (const [alias, mockedService] of Object.entries(mockedServices)) {
    app.iocContainer.bind(alias, () => mockedService)
  }

  return app
}
test.group('Swagger enabled', (group) => {
  let configMock: ConfigContract
  let app: AdonisApplication

  group.before(async () => {
    configMock = mock(Config)
    when(configMock.get('swagger.uiEnabled', true)).thenReturn(true)
    when(configMock.get('swagger.specEnabled', true)).thenReturn(true)

    app = await createAdonisApp({
      'Adonis/Core/Config': instance(configMock),
    })
  })

  group.after(async () => {
    await app.stopApp()
  })

  test('should instantiate provider with succeed job', async (assert) => {
    const bullMQProvider = new BullMQProvider(app.application)
    bullMQProvider.register()
    await bullMQProvider.boot()
    const bullMQ: typeof BullMQ = app.application.container.use('Adonis/Addons/BullMQ')
    let isJobSuccess = false
    bullMQ.worker<TestProps, TestProps>('testQueue', async (job) => {
      console.log(job.data)
      isJobSuccess = true
      return job
    })
    const queue = bullMQ.queue<TestProps, TestProps>('testQueue')
    await queue.add('testJob', { name: 'anyName' })

    await new Promise((res) => setTimeout(res, 1000))

    assert.equal(isJobSuccess, true)
  })
})
