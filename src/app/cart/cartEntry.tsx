"use client";

import { cartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface cartEntryProps {
  cartItem: cartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity,
}: cartEntryProps) {
  const [isPending, startTransition] = useTransition();
  const { id, name, price, imageUrl } = product;

  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i < 100; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={imageUrl}
          alt={name}
          width={200}
          height={200}
          className="rounded"
        />
        <div>
          <Link href={`/products/${id}`} className="font-bold">
            {name}
          </Link>
          <div>Price: {formatPrice(price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              defaultValue={quantity}
              className="select select-bordered w-full max-w-20"
              onChange={(e) => {
                const newQuantity = +e.target.value;
                startTransition(async () => {
                  await setProductQuantity(id, newQuantity);
                });
              }}
            >
              <option value={0}>Remove</option>
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-3">
            Total: {formatPrice(price * quantity)}
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
