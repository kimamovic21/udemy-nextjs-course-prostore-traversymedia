const StripePayment = ({
  priceInCents,
  orderId,
  clientSecret,
}: {
  priceInCents: number;
  orderId: string;
  clientSecret: string;
}) => {
  return (
    <div>
      STRIPE FORM
    </div>
  );
};

export default StripePayment;