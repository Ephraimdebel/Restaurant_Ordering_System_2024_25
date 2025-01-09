import { Injectable } from "@nestjs/common";
import { CheckoutDto } from "./dto/checkout_dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./payment.entity";
import { Repository } from "typeorm";

@Injectable()
export class PaymentService{
    constructor(
        @InjectRepository(Payment) 
        private paymentRepository: Repository<Payment>,
    ){}
    async checkout(checkoutDto: CheckoutDto) {
        const payment = this.paymentRepository.create(checkoutDto);
        return this.paymentRepository.save(payment);
    }
}