import Config from '@ioc:Adonis/Core/Config'
import {
  ConnectionOptions,
  Processor,
  Worker as BullWorker,
  Queue as BullQueue,
  QueueEvents as BullQueueEvents,
  WorkerOptions,
  QueueOptions,
} from 'bullmq'
export class BullMQClass {
  public connection: ConnectionOptions
  constructor(public config: typeof Config) {
    this.connection = this.config.get('bullmq')
  }
  public queue<T, R>(name: string, options: QueueOptions = {}) {
    return new BullQueue<T, R>(name, { ...options, connection: this.connection })
  }
  public worker<T, R, N extends string = string>(
    name: string,
    callback: string | Processor<T, R, N>,
    options: WorkerOptions = {}
  ) {
    return new BullWorker<T, R, N>(name, callback, { ...options, connection: this.connection })
  }
  public events(name: string) {
    return new BullQueueEvents(name, { connection: this.connection })
  }
}
