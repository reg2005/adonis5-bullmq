declare module '@ioc:Adonis/Addons/BullMQ' {
  export { ConnectionOptions as BullMQConfig } from 'bullmq'
  import { BullMQClass } from 'src/BullMQ'
  const bullMQClass: BullMQClass
  export default bullMQClass
}
