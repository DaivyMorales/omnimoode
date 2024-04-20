import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import { Cart, CartProduct, ProductCalculated } from "@/types/index";
import { PiTrashBold } from "react-icons/pi";
import { setCart, deleteCartProduct } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

interface MyProps {
  cartProduct: CartProduct;
  refetch: any;
  setPrices: React.Dispatch<React.SetStateAction<ProductCalculated[]>>;
}

export default function ProductCard({
  cartProduct,
  refetch,
  setPrices,
}: MyProps) {
  const price = cartProduct.product.price;

  const router = useRouter();

  const [quantity, setquantity] = useState(cartProduct.quantity);
  const [hoverDelete, setHoverDelete] = useState(false);
  const [finalValue, setFinalValue] = useState(price);
  const [allInputsEmpty, setAllInputsEmpty] = useState(false);

  const objectInfoProduct = {
    id: cartProduct.id,
    value: price,
  };

  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cartSlice.cart);

  const remove = async () => {
    await dispatch(deleteCartProduct(cartProduct.id) as any);

    dispatch(setCart(cart.filter((c: Cart) => c.id !== cartProduct.id)));
  };

  const updateCartProductQuantity = async (number: number) => {
    const response = await axios.put(
      `/api/cart/cartProduct/${cartProduct.id}`,
      {
        quantity: number,
      }
    );

    if (response.status === 200) {
      refetch();
    }
  };

  const calculateFinalPrice = price * quantity;

  return (
    <tr className=" w-full">
      <td className="w-1/5 ">
        <Image
          src={cartProduct.product.imageUrl}
          width={50}
          height={50}
          alt="Product Image"
          style={{ width: "auto", height: "auto" }}
          className="border-1 rounded-md cursor-pointer"
          onClick={() => router.push(`/product/${cartProduct.product.id}`)}
        />
      </td>
      <td className="w-2/5 ">
        <p className="text-sm font-medium">{cartProduct.product.name}</p>
        <p className="text-gray-600">
          {cartProduct.product.categoryId === 4
            ? "Hoddie"
            : cartProduct.product.categoryId === 5
            ? "Shirt"
            : "Pant"}{" "}
          <span className="text-gray-300">| </span>
          {cartProduct.size.name.toUpperCase()}{" "}
        </p>
      </td>

      <td className="w-1/5">
        <div className="border-1 rounded-md flex justify-between items-center px-1 -py-1">
          <button
            disabled={quantity < 1}
            className={`text-lg font-normal ${
              quantity === 1
                ? "text-gray-200 cursor-not-allowed"
                : "text-gray-500"
            }`}
            onClick={async () => {
              if (quantity > 1) {
                const subQuantity = quantity - 1;
                setquantity(subQuantity);
                updateCartProductQuantity(subQuantity);
                setFinalValue(finalValue - price);
                setPrices((prevPrices) =>
                  prevPrices.slice(0, prevPrices.length - 1)
                );
              }
            }}
          >
            -
          </button>
          <p className="w-6 text-center font-semibold text-xs text-gray-800 inputSizeCart">
            {quantity}
          </p>

          <button
            className="text-lg font-normal text-gray-500"
            onClick={async () => {
              const sumQuantity = quantity + 1;
              if (sumQuantity <= cartProduct.size.quantity) {
                setquantity(sumQuantity);
                updateCartProductQuantity(sumQuantity);
                setFinalValue(finalValue + price);
                setPrices((prevPrices) => [...prevPrices, objectInfoProduct]);
              }
            }}
          >
            +
          </button>
        </div>
      </td>
      <td className="px-2 w-full ">
        <p className="text-sm font-medium">
          ${calculateFinalPrice.toLocaleString()}
        </p>
      </td>
      <td className="w-full ">
        <div
          onMouseEnter={() => setHoverDelete(true)}
          onMouseLeave={() => setHoverDelete(false)}
          onClick={async () => remove()}
          className="flex justify-end cursor-pointer"
        >
          <PiTrashBold
            size={17}
            color={`${hoverDelete ? "#ef4444" : "#9ca3af"}`}
          />
        </div>
      </td>
    </tr>
  );
}
