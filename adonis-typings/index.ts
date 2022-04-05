declare module '@ioc:Adonis/Addons/BullMQ' {
  import Config from '@ioc:Adonis/Core/Config'
  import {
    ConnectionOptions as BullMQConfig,
    Processor,
    Worker as BullWorker,
    Queue as BullQueue,
    QueueEvents as BullQueueEvents,
    WorkerOptions,
    QueueOptions,
  } from 'bullmq'
  export class BullMQBaseClass {
    public connection: BullMQConfig
    constructor(config: typeof Config)
    public queue<T, R>(name: string, options?: QueueOptions): BullQueue<T, R, string>
    public worker<T, R, N extends string = string>(
      name: string,
      callback: string | Processor<T, R, N>,
      options?: WorkerOptions
    ): BullWorker<T, R, N>
    public events(name: string): BullQueueEvents
  }
  const BullMQClass: BullMQBaseClass
  export default BullMQClass
}
