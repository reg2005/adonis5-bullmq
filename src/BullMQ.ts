import Config from '@ioc:Adonis/Core/Config'
import {
  ConnectionOptions,
  Processor,
  Worker as BullWorker,
  Queue as BullQueue,
  QueueEvents as BullQueueEvents,
} from 'bullmq'
export class BullMQClass {
  public connection: ConnectionOptions
  constructor(public config: typeof Config) {
    this.connection = this.config.get('bullmq')
  }
  public queue<T, R>(name: string) {
    return new BullQueue<T, R>(name, { connection: this.connection })
  }
  public worker<T, R, N extends string = string>(
    name: string,
    callback: string | Processor<T, R, N>
  ) {
    return new BullWorker<T, R, N>(name, callback, { connection: this.connection })
  }
  public events(name: string) {
    return new BullQueueEvents(name, { connection: this.connection })
  }
}
