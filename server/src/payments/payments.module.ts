import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { ChapaService } from './chapa.service';

@Module({
  controllers: [PaymentController],
  providers: [ChapaService],
})
export class PaymentModule {}
