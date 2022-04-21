<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [adonis5-bullmq](#adonis5-bullmq)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Create your props interface and enums](#create-your-props-interface-and-enums)
    - [Create queue listener](#create-queue-listener)
    - [Emit job](#emit-job)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# adonis5-bullmq
> Tagline

[![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

BullMQ provider for Adonis5

## Installation

```bash
npm i adonis5-bullmq

```

```bash
node ace invoke adonis5-bullmq
```

## Usage
### Create your props interface and enums
```ts
// file: Contracts/QueueInterfaces.ts
export interface TestProps {
  name: string
}
export enum QueueNamesEnum {
  'TestJob' = 'TestJob'
}
```

### Create queue listener

```ts
// file commands/QueueListener.ts
import BullMQ from '@ioc:Adonis/Addons/BullMQ'
import {TestProps, QueueNamesEnum} from 'Contracts/QueueInterfaces'

export default class QueueListener extends BaseCommand {
  /**
   * Command Name is used to run the command
   */
  public static commandName = 'queue:listener'

  public static settings = {
    loadApp: true,
  }

  run(){
    BullMQ.worker<TestProps, TestProps>(QueueNamesEnum.TestJob, async (job) => {
      console.log(job.data)
      // handle your job
      åreturn job
  })
  }
}
```

### Emit job
```ts
// anyAppFile.ts
import BullMQ from '@ioc:Adonis/Addons/BullMQ'
import {TestProps, QueueNamesEnum} from 'Contracts/QueueInterfaces'

const queue = BullMQ.queue<TestProps, TestProps>(QueueNamesEnum.TestJob)
export default class IndexController {
  async send(){
    await queue.add('mytestJob', { name: 'anyName' })
  }
}
```


[npm-image]: https://img.shields.io/npm/v/adonis5-bullmq.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonis5-bullmq "npm"

[license-image]: https://img.shields.io/npm/l/adonis5-bullmq?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"
