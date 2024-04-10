export function formatPrice(price: Number) {
  return price.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}
