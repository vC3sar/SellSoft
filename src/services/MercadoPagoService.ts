import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

export class MercadoPagoService {
  private static client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' });

  static async createPreference(order: any, items: any[], returnUrl: string) {
    const preference = new Preference(this.client);
    
    return await preference.create({
      body: {
        items: items.map(item => ({
          id: item.variantId ? `${item.productId}-${item.variantId}` : item.productId,
          title: item.variantName ? `${item.name} - ${item.variantName}` : item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: process.env.NEXT_PUBLIC_CURRENCY || 'MXN',
        })),
        payer: {
          email: order.customerEmail,
          name: order.customerName,
        },
        back_urls: {
          success: `${returnUrl}/checkout/success?orderId=${order.id}`,
          pending: `${returnUrl}/checkout/pending?orderId=${order.id}`,
          failure: `${returnUrl}/checkout/failure?orderId=${order.id}`,
        },
        auto_return: returnUrl.includes("localhost") ? undefined : 'approved',
        external_reference: order.id,
      }
    });
  }

  static async getPayment(paymentId: string) {
    const payment = new Payment(this.client);
    return await payment.get({ id: paymentId });
  }

  static async checkPaymentByOrderId(orderId: string) {
    const payment = new Payment(this.client);
    const result = await payment.search({
      options: {
        external_reference: orderId
      }
    });
    
    // results is an array of payments for this external_reference
    const payments = result.results || [];
    const approvedPayment = payments.find((p: any) => p.status === "approved");
    
    return approvedPayment;
  }
}
