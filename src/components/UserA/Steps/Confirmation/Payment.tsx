//@ts-nocheck

import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";

const Payment: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null);

  const [paymentData] = useState([
    {
      type: "1 Full Payment",
      list: [],
      defaultTitle: "1 Full Payment"
    },
    {
      type: "2 Installment 50% + 50%",
      list: [
        "50% + 50%", // Default option moved to first position
        "10% + 90%",
        "20% + 80%",
        "30% + 70%",
        "40% + 60%",
        "60% + 40%",
        "70% + 30%",
        "80% + 20%",
        "90% + 10%",
      ],
      defaultTitle: "2 Installment 50% + 50%"
    },
    {
      type: "3 Installment 30% + 40% + 30%",
      list: [
        "30% + 40% + 30%", // Default option moved to first position
        "10% + 90% + 10%",
        "20% + 80% + 20%",
        "40% + 60% + 10%",
      ],
      defaultTitle: "3 Installment 30% + 40% + 30%"
    },
    {
      type: "4 Installment 25% x 4",
      list: [], // Removed unnecessary submenu items
    },
    {
      type: "5 Installment 20% x 5",
      list: [], // Removed unnecessary submenu items
    },
  ]);

  const [selectedPayementItems, setSelectedPayementItems] = useState(
    paymentData.map((item, index) => ({
      expanded: false,
      // Set default selections for 2 and 3 Installment options
      selectedSubItem: index === 1 ? "50% + 50%" : index === 2 ? "30% + 40% + 30%" : null,
    }))
  );

  const handleTogglePayementList = (index) => {
    // If clicking the same item that's already selected, deselect it
    if (selectedPayment === index) {
      setSelectedPayment(null);
    } else {
      // Select the new item and deselect others
      setSelectedPayment(index);
    }

    setSelectedPayementItems((prevSelectedItems) => {
      const newItems = prevSelectedItems.map((item, idx) => ({
        ...item,
        expanded: idx === index ? !item.expanded : false,
        selectedSubItem: idx === 0 ? (index === 0 ? "1 Full Payment" : null) : item.selectedSubItem
      }));

      const currentItem = newItems[index];
      
      if (index === 3 || index === 4) {
        currentItem.selectedSubItem = currentItem.selectedSubItem ? null : paymentData[index].type;
        return newItems;
      }

      if (currentItem.expanded) {
        currentItem.selectedSubItem = null;
        paymentData[index].type = paymentData[index].defaultTitle;
      } else {
        if (index === 1) {
          currentItem.selectedSubItem = "50% + 50%";
          paymentData[index].type = "2 Installment " + "50% + 50%";
        } else if (index === 2) {
          currentItem.selectedSubItem = "30% + 40% + 30%";
          paymentData[index].type = "3 Installment " + "30% + 40% + 30%";
        }
      }
      
      return newItems;
    });
  };

  const handleSelectPayementItem = (typeIndex, subItem) => {
    setSelectedPayementItems((prevSelectedItems) =>
      prevSelectedItems.map((item, idx) => {
        if (idx === typeIndex) {
          // Update the payment type title when selection changes
          if (typeIndex === 1) {
            paymentData[typeIndex].type = "2 Installment " + subItem;
          } else if (typeIndex === 2) {
            paymentData[typeIndex].type = "3 Installment " + subItem;
          }
          return { ...item, selectedSubItem: subItem, expanded: false };
        }
        return item;
      })
    );
  };

  // Remove this duplicate function
  // const handleTogglePayementList = (index) => {
  //   setSelectedPayementItems((prevSelectedItems) =>
  //     prevSelectedItems.map((item, idx) =>
  //       idx === index ? { ...item, expanded: !item.expanded } : item
  //     )
  //   );
  // };

  return (
    <div className="w-full flex flex-col gap-[2px]">
      {/* Remove this redundant div */}
      {/* <div className="w-full h-[60px] px-3 rounded-[8px] bg-[#222222] text-[20px] flex justify-start items-center text-[#cccccc] font-pingfang">Full Payment</div> */}
      <div className="w-full flex flex-col gap-[2px]">
        {paymentData.map((payment, index) => (
          <div key={index} className="w-full flex gap-[1px] flex-col">
            {/* Payment Type Header */}
            <div
              onClick={() => handleTogglePayementList(index)}
              className={`w-full border-[2px] flex justify-between items-center bg-[#222222] h-[60px] rounded-[8px] px-3 ${
                selectedPayementItems[index].selectedSubItem
                  ? "border-cyan-1"
                  : "border-transparent"
              }`}
            >
              <p
                className={`text-[#cccccc] select-none text-[20px] font-pingfang font-normal ${
                  selectedPayementItems[index].selectedSubItem
                    ? "text-white"
                    : ""
                }`}
              >
                {payment.type}
              </p>
              {selectedPayementItems[index].selectedSubItem && (
                <BsCheckCircleFill className="text-[21px] text-cyan-1" />
              )}
            </div>

            {/* Subitems List */}
            {selectedPayementItems[index].expanded && (
              <div className="flex flex-col gap-[1px]">
                {payment.list.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    onClick={() => handleSelectPayementItem(index, subItem)}
                    className={`w-full h-[40px] text-[16px] flex font-pingfang justify-between items-center px-3 rounded-[8px] cursor-pointer ${
                      selectedPayementItems[index].selectedSubItem === subItem
                        ? "bg-cyan-btn text-black-1"
                        : "bg-[#222222] text-[#cccccc]"
                    }`}
                  >
                    {subItem}
                    {selectedPayementItems[index].selectedSubItem ===
                      subItem && (
                      <BsCheckLg className="text-[20px] text-[#555555]" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
