import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import PriceTag from "./PriceTag";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, description, price, imageUrl, createdAt } = product;
  const isNow =
    Date.now() - new Date(createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
  return (
    <Link
      href={"/products/" + id}
      className="card w-full bg-base-100 hover:shadow-xl transition-shadow"
    >
      <figure>
        <Image
          src={imageUrl}
          alt={name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name}
          {isNow && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <p>{description}</p>
        <PriceTag price={price} />
      </div>
    </Link>
  );
}
