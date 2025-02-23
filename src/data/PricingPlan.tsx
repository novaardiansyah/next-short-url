const plans = [
  {
    name: "Free",
    price: "$0/mo",
    features: ["5 Short URLs/day", "5 QR Codes/day", "Unlimited Interaction", "Basic Analytics"],
    locked: ["Support Team 24h/7", "Custom Short URLs", "Custom QR Codes", "Priority Support"]
  },
  {
    name: "Premium",
    price: "$9/mo",
    features: ["15 Short URLs/day", "10 QR Codes/day", "Unlimited Interaction", "Limited Analytics", "Support Team 24h/7"],
    locked: ["Custom Short URLs", "Custom QR Codes", "Priority Support"]
  },
  {
    name: "Business",
    price: "$29/mo",
    features: ["30 Short URLs/day", "20 QR Codes/day", "Unlimited Interaction", "Limited Analytics", "Support Team 24h/7", "Custom Short URLs", "Custom QR Codes", "Priority Support"],
    locked: []
  },
];

export { plans };