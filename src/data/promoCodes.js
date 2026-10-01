export const PROMO_CODES = [
  {
    code: 'READ10',
    type: 'percentage',
    value: 10,
    description: '10% off entire order',
    minSubtotal: 0,
  },
  {
    code: 'WELCOME20',
    type: 'percentage',
    value: 20,
    description: '20% off for new readers',
    minSubtotal: 30,
  },
  {
    code: 'FREESHIP',
    type: 'shipping',
    value: 0,
    description: 'Free standard shipping on any order',
    minSubtotal: 0,
  },
  {
    code: 'BOOKWORM15',
    type: 'fixed',
    value: 15,
    description: '$15 off orders over $60',
    minSubtotal: 60,
  },
];
