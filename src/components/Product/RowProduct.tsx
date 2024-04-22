import { Product } from "@/types";
import Image from "next/image";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import DropdownOptions from "./DropdownOptions";
import { useOpen } from "@/store/OpenStore";
import { useRouter } from "next/router";

export interface RowProductProps {
  product: Product;
}

function RowProduct({ product }: RowProductProps) {
  const { setInventoryDropdownId, inventoryDropdownId } = useOpen();

  const router = useRouter();

  return (
    <tr className="border-b">
      <td className="w-50 px-4 py-3">
        <Image
          src={product.imageUrl}
          alt="Product Image"
          priority
          width={50}
          height={50}
          className="rounded-lg cursor-pointer"
          onClick={() => router.push(`/product/${product.id}`)}
        />
      </td>
      <td className="font-bold px-4 py-2">{product.name}</td>
      <td className="px-4 py-2">
        {product.categoryId === 4 ? (
          <div className="py-[2px] px-3  text-center rounded-[5px] font-medium bg-rose-200 text-rose-600">
            Hoddie
          </div>
        ) : product.categoryId === 5 ? (
          <div className="py-[2px] px-3  text-center rounded-[5px] font-medium bg-amber-200 text-amber-600">
            Shirt
          </div>
        ) : (
          <div className="py-[2px] px-3  text-center rounded-[5px] font-medium bg-cyan-200 text-cyan-600">
            Pant
          </div>
        )}
      </td>
      <td className="px-4 py-2">${product.price}</td>
      {/* {product.sizes.map((size) => (
        <td className="px-4 py-2" key={size.id}>
          <div className="text-[10px] font-bold p-1 border-1 rounded-[6px] flex justify-center w-[25px]">
            {size.quantity > 0 ? size.quantity : "0"}
          </div>
        </td>
      ))} */}

      <td className="px-4 py-2">
        <div className="text-[10px] font-bold p-1 border-1 rounded-[6px] flex justify-center w-[25px]">
          {product.sizes.find((size) => size.name === "xs")?.quantity || "0"}
        </div>
      </td>
      <td className="px-4 py-2">
        <div className="text-[10px] font-bold p-1 border-1 rounded-[6px] flex justify-center w-[25px]">
          {product.sizes.find((size) => size.name === "s")?.quantity || "0"}
        </div>
      </td>
      <td className="px-4 py-2">
        <div className="text-[10px] font-bold p-1 border-1 rounded-[6px] flex justify-center w-[25px]">
          {product.sizes.find((size) => size.name === "m")?.quantity || "0"}
        </div>
      </td>
      <td className="px-4 py-2">
        <div className="text-[10px] font-bold p-1 border-1 rounded-[6px] flex justify-center w-[25px]">
          {product.sizes.find((size) => size.name === "l")?.quantity || "0"}
        </div>
      </td>
      <td className="px-4 py-2">
        <div className="text-[10px] font-bold p-1 border-1 rounded-[6px] flex justify-center w-[25px]">
          {product.sizes.find((size) => size.name === "xl")?.quantity || "0"}
        </div>
      </td>
      <td className="px-4 py-2">
        <div className="text-[10px] font-bold p-1 border-1 rounded-[6px] flex justify-center w-[25px]">
          {product.sizes.find((size) => size.name === "xxl")?.quantity || "0"}
        </div>
      </td>
      <td className="relative px-2 py-2">
        <div
          onClick={() =>
            setInventoryDropdownId(
              inventoryDropdownId === product.id ? 0 : product.id
            )
          }
          className="cursor-pointer rounded-lg p-1 hover:bg-neutral-200 "
        >
          <PiDotsThreeOutlineFill />
        </div>
        {inventoryDropdownId === product.id && (
          <DropdownOptions product={product} />
        )}
      </td>
    </tr>
  );
}

export default RowProduct;
