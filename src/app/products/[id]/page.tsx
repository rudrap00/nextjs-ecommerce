import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCart from "./AddToCart";
import { incrementProductQuantity } from "./actions";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    notFound();
  }

  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  const { name, description, imageUrl } = product;

  return {
    title: name + " | Ecommerce",
    description: description,
    openGraph: {
      images: [{ url: imageUrl }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  const { name, imageUrl, price, description } = product;

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image
        src={imageUrl}
        alt={name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{name}</h1>
        <PriceTag price={price} className="mt-4" />
        <p className="py-6">{description}</p>
        <AddToCart
          productId={id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
}
