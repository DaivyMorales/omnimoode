// import React from "react";

// function InformationSection() {
//   return (
//     <div>
//       <div className="flex flex-col  justify-center  items-center  w-full p-5 rounded-lg">
//         <div className="flex flex-col justify-start items-start gap-4 w-full">
//           <h3>Tus domicilios</h3>
//           {addresses?.length > 0 ? (
//             addresses?.map((address: Address) => (
//               <div
//                 key={address.id}
//                 onMouseEnter={() => setOnHoverAddress(true)}
//                 onMouseLeave={() => setOnHoverAddress(false)}
//                 className="relative flex justify-between items-center w-full gap-y-3 border-1 rounded-lg p-3  hover:border-black"
//               >
//                 {onHoverAddress && (
//                   <div
//                     onClick={() => dispach(setShowAddress(true))}
//                     className="-top-2 -right-2 absolute p-1 border-1 rounded-full bg-white border-black cursor-pointer"
//                   >
//                     <HiTrash />
//                   </div>
//                 )}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 w-96">
//                   <div>
//                     <label className="label-profile">Nombres</label>
//                     <p className="font-semibold">{address.names}</p>
//                   </div>
//                   <div>
//                     <label className="label-profile">Apellidos</label>
//                     <p className="font-semibold">{address.names}</p>
//                   </div>
//                   <div>
//                     <label className="label-profile">Dirección</label>
//                     <p className="font-semibold">{address.address}</p>
//                   </div>
//                   <div>
//                     <label className="label-profile">Estado</label>
//                     <p className="font-semibold">{address.state}</p>
//                   </div>
//                   <div>
//                     <label className="label-profile">Ciudad</label>
//                     <p className="font-semibold">{address.city}</p>
//                   </div>
//                   <div>
//                     <label className="label-profile">Telefono</label>
//                     <p className="font-semibold">{address.phone}</p>
//                   </div>
//                 </div>
//                 <button className=" text-[12px] bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md">
//                   Editar
//                 </button>
//               </div>
//             ))
//           ) : (
//             <div>
//               <h3 className="text-[13px] text-gray-400">
//                 No tienes ningún domicilio aún
//               </h3>
//             </div>
//           )}

//           <div className="w-full  flex justify-end">
//             <button
//               onClick={() => {
//                 setOpenAddress(true);
//               }}
//               type="submit"
//               className="font-medium bg-black p-2 text-white px-[12px] text-[14px] rounded-md hover:bg-gray-900"
//             >
//               Añadir
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* CARDS */}
//       <div className="flex flex-col  justify-center  items-center  w-full p-5 rounded-lg">
//         <div className="flex flex-col justify-start items-start gap-4 w-full">
//           <h3>Tus tarjetas</h3>
//           {cards?.length > 0 ? (
//             cards?.map((card: Card) => (
//               <div
//                 key={card.id}
//                 onMouseEnter={() => setOnHoverCard(card.id)}
//                 onMouseLeave={() => setOnHoverCard(0)}
//                 className="relative flex justify-between items-center  w-full gap-y-3 border-1 rounded-lg p-3 hover:border-black"
//               >
//                 {onHoverCard === card.id && (
//                   <div
//                     onClick={() => {
//                       dispach(setShowCard(card.id));
//                     }}
//                     className="-top-2 -right-2 absolute p-1 border-1 rounded-full bg-white border-black cursor-pointer"
//                   >
//                     <HiTrash />
//                   </div>
//                 )}
//                 <div className="grid grid-cols-1 sm:grid-cols-2  w-96">
//                   <div>
//                     <label className="label-profile">Número de tarjeta</label>
//                     <p className="font-semibold">
//                       {card.card_number
//                         .replace(/.(?=.{4})/g, "*")
//                         .replace(/\s/g, "")
//                         .replace(/(.{4})/g, "$1")}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="label-profile">Nombres</label>
//                     <p className="font-semibold">{card.names}</p>
//                   </div>
//                   <div>
//                     <label className="label-profile">Apellidos</label>
//                     <p className="font-semibold">{card.surnames}</p>
//                   </div>
//                   <div>
//                     <label className="label-profile">Cedula</label>
//                     <p className="font-semibold">
//                       {card.number_identification}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => {
//                     dispach(setShowCardFormEdit(card.id));
//                   }}
//                   className=" text-[12px] bg-white border-1 text-[#666666] px-[6px] py-[5px] rounded-md"
//                 >
//                   Editar
//                 </button>
//               </div>
//             ))
//           ) : (
//             <div>
//               <h3 className="text-[13px] text-gray-400">
//                 No tienes ningúna tarjeta aún
//               </h3>
//             </div>
//           )}
//           <div className="w-full  flex justify-end">
//             <button
//               onClick={() => {
//                 setOpenPayment(true);
//               }}
//               type="submit"
//               className="font-medium bg-black p-2 text-white px-[12px] text-[14px] rounded-md hover:bg-gray-900"
//             >
//               Añadir
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InformationSection;
