import { getCart } from "@/lib/db/cart";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UserMenuButton from "./UserMenuButton";
import CartButton from "./cartButton";

async function cartSearchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <div className="bg-base-100">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image
              src="https://images.unsplash.com/photo-1516876437184-593fda40c7ce?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              height={40}
              width={40}
              alt="Logo"
            />
            EcomX
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={cartSearchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-8"
              />
            </div>
          </form>
          <CartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}
