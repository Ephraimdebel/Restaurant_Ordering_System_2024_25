import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
@Injectable()
export class ChapaService {
  private readonly CHAPA_BASE_URL = 'https://api.chapa.co/v1';
  private readonly CHAPA_SECRET_KEY: string;
  constructor(private readonly configService: ConfigService) {
    console.log(this.configService.get<string>('CHAPA_SECRET_KEY'));

    this.CHAPA_SECRET_KEY = this.configService.get<string>('CHAPA_SECRET_KEY');
  }

  // Generate a unique transaction reference
  async generateTxRef(): Promise<string> {
    return `tx_${Math.random().toString(36).substring(2, 15)}`;
  }

  // Initialize a payment
  async initializePayment(paymentData: any): Promise<any> {
    try {
      const response = await axios.post(
        `${this.CHAPA_BASE_URL}/transaction/initialize`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${this.CHAPA_SECRET_KEY}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Chapa Initialization Error:', error.response?.data || error.message);
      throw new HttpException(
        'Failed to initialize payment',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Verify a payment
  async verifyPayment(txRef: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.CHAPA_BASE_URL}/transaction/verify/${txRef}`,
        {
          headers: {
            Authorization: `Bearer ${this.CHAPA_SECRET_KEY}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Chapa Verification Error:', error.response?.data || error.message);
      throw new HttpException(
        'Failed to verify payment',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
