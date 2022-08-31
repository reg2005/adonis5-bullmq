import { ConnectionOptions as BullMQConfig } from 'bullmq'
import Env from '@ioc:Adonis/Core/Env'
export default {
  host: Env.get('BULLMQ_REDIS_HOST', '127.0.0.1') as string,
  port: Env.get('BULLMQ_REDIS_PORT', 6379) as number,
  password: Env.get('BULLMQ_REDIS_PASSWORD', '') as string,
  db: 0,
  keyPrefix: '',
} as BullMQConfig
