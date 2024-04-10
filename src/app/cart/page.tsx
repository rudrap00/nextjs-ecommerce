import { getCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format/format";
import { setProductQuantity } from "./actions";
import CartEntry from "./cartEntry";

export const metadata = {
  title: "Cart | Ecommerce",
};

export default async function cartPage() {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          key={cartItem.id}
          cartItem={cartItem}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty.</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subTotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-40">Checkout</button>
      </div>
    </div>
  );
}
