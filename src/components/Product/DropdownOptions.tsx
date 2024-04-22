import { useOpen } from "@/store/OpenStore";
import { useEffect, useRef } from "react";
import { TiTrash } from "react-icons/ti";
import { motion } from "framer-motion";
import { Product } from "@/types";
import axios from "axios";

export interface DropdownOptionsProps {
  product: Product;
}

function DropdownOptions({ product }: DropdownOptionsProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    setInventoryDropdownId,
    inventoryDropdownId,
    setOpenEditProduct,
    setDataEditProduct,
  } = useOpen();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setInventoryDropdownId(0);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inventoryDropdownId]);

  const { products, setProducts } = useOpen();

  const deleteProduct = async () => {
    // product.sizes.map((size) => {
    //   axios.delete(`/api/product/${size.id}`);
    // });
    await axios.delete(`/api/product/${product.id}`);

    const updatedProducts = products.filter((prd) => prd.id !== product.id);

    setProducts(updatedProducts);
  };

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.09 }}
      ref={dropdownRef}
      className="absolute flex  flex-col py-2 top-11 bg-white shadow-sm border-1 -left-16 rounded-lg"
    >
      <div
        onClick={() => {
          setOpenEditProduct(true);
          setInventoryDropdownId(0);
          setDataEditProduct(product);
          // console.log(product);
        }}
        className="px-4 border-b py-1 hover:bg-neutral-100 cursor-pointer"
      >
        <p className="font-bold text-[10px]">Editar</p>
      </div>
      <div
        onClick={() => {
          deleteProduct();
          setInventoryDropdownId(0);
        }}
        className="flex items-center justify-center gap-1    px-4 py-1 hover:bg-neutral-100 cursor-pointer hover:text-red-500"
      >
        <TiTrash size={10} />
        <p className="font-bold text-[10px]">Eliminar</p>
      </div>
    </motion.div>
  );
}

export default DropdownOptions;
