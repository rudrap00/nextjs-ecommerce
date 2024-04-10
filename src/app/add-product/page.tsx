import Button from "@/components/Button";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Ecommerce | Add Product",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          className="input-bordered input mb-3 w-full"
          type="text"
          placeholder="Name"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        ></textarea>
        <input
          required
          name="imageUrl"
          className="input-bordered input mb-3 w-full"
          type="url"
          placeholder="Image URL"
        />
        <input
          required
          name="price"
          className="input-bordered input mb-3 w-full"
          type="number"
          placeholder="Price"
        />

        <Button className="btn-block" type="submit">
          Add Product
        </Button>
      </form>
    </div>
  );
}
