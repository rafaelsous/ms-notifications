import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['polished-newt-9470-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'cG9saXNoZWQtbmV3dC05NDcwJGlyZCQDwnlKSDnN95nrsw7XlpwEl0Yh0FIdun0',
          password:
            'e-oZPl6i0diSoafNMC3KYhQKNMkICMU23qfUUJ_zOvGicni9AMQTv6FGVH0CDMYV3i_1lg==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
