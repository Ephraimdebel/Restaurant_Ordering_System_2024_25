import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChapaService } from './chapa.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly chapaService: ChapaService) {}

  // Initialize a payment
  @Post('initialize')
  async initializePayment(@Body() body: any) {
    const txRef = await this.chapaService.generateTxRef();

    const paymentData = {
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      phone_number: body.phone_number,
      currency: 'ETB',
      amount: body.amount,
      tx_ref: txRef,
      callback_url: 'https://ephraim-d.com',
      return_url: 'https://your-return-url.com',
      customization: {
        title: 'Payment Title',
        description: 'Payment Description',
      },
    };

    return await this.chapaService.initializePayment(paymentData);
  }

  // Verify a payment
  @Get('verify/:txRef')
  async verifyPayment(@Param('txRef') txRef: string) {
    return await this.chapaService.verifyPayment(txRef);
  }
}
