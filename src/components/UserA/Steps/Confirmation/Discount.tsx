"use client";

import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import * as Icons from '../../../../Svg/Icons';


const Discount = () => {
  // Update state management
  const [selectedOption, setSelectedOption] = useState<'none' | 'discount' | 'spend'>("none");
  const [discounts, setDiscounts] = useState([{ spend: 200, discount: 90 }]);

  const [isDiscountOffersVisible, setIsDiscountOffersVisible] = useState(false);
  const [isSpendSaveVisible, setIsSpendSaveVisible] = useState(false);

  const [discountEditingField, setDiscountEditingField] = useState<
    null | "spend" | "discount"
  >(null);
  const [discountEditedValue, setDiscountEditedValue] = useState<{
    spend: string;
    discount: string;
  }>({
    spend: "",
    discount: "",
  });
  const [editingDiscountIndex, setEditingDiscountIndex] = useState<
    number | null
  >(null);

  // State for spend and save
  const [spendSaves, setSpendSaves] = useState([{ spend: 100, save: 20 }]);
  const [spendSaveEditingField, setSpendSaveEditingField] = useState<
    null | "spend" | "save"
  >(null);
  const [spendSaveEditedValue, setSpendSaveEditedValue] = useState<{
    spend: string;
    save: string;
  }>({
    spend: "",
    save: "",
  });
  const [editingSpendSaveIndex, setEditingSpendSaveIndex] = useState<
    number | null
  >(null);

  // Handlers for discount offers
  const handleDiscountStartEditing = (
    index: number,
    field: "spend" | "discount"
  ) => {
    setEditingDiscountIndex(index);
    setDiscountEditingField(field);
    setDiscountEditedValue({
      spend: discounts[index].spend.toString(),
      discount: discounts[index].discount.toString(),
    });
  };

  const handleDiscountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "spend" | "discount"
  ) => {
    setDiscountEditedValue({
      ...discountEditedValue,
      [field]: e.target.value,
    });
  };

  const handleDiscountBlur = () => {
    if (editingDiscountIndex !== null && discountEditingField) {
      const updatedDiscounts = [...discounts];
      updatedDiscounts[editingDiscountIndex] = {
        ...updatedDiscounts[editingDiscountIndex],
        [discountEditingField]: parseFloat(
          discountEditedValue[discountEditingField]
        ),
      };
      setDiscounts(updatedDiscounts);
    }
    setDiscountEditingField(null);
  };

  // Handlers for spend and save
  const handleSpendSaveStartEditing = (
    index: number,
    field: "spend" | "save"
  ) => {
    setEditingSpendSaveIndex(index);
    setSpendSaveEditingField(field);
    setSpendSaveEditedValue({
      spend: spendSaves[index].spend.toString(),
      save: spendSaves[index].save.toString(),
    });
  };

  const handleSpendSaveChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "spend" | "save"
  ) => {
    setSpendSaveEditedValue({
      ...spendSaveEditedValue,
      [field]: e.target.value,
    });
  };

  const handleSpendSaveBlur = () => {
    if (editingSpendSaveIndex !== null && spendSaveEditingField) {
      const updatedSpendSaves = [...spendSaves];
      updatedSpendSaves[editingSpendSaveIndex] = {
        ...updatedSpendSaves[editingSpendSaveIndex],
        [spendSaveEditingField]: parseFloat(
          spendSaveEditedValue[spendSaveEditingField]
        ),
      };
      setSpendSaves(updatedSpendSaves);
    }
    setSpendSaveEditingField(null);
  };

  const handleRemoveSpendSave = (index:number) => {
    setSpendSaves((prev) => prev.filter((_, i) => i !== index)); 
  };

  // Update click handlers
  const handleOptionClick = (option: 'none' | 'discount' | 'spend') => {
    if (selectedOption === option) {
      return; // Don't deselect when clicking the same option
    }
    setSelectedOption(option);
    
    // Reset visibility states when changing options
    setIsDiscountOffersVisible(option === 'discount');
    setIsSpendSaveVisible(option === 'spend');
  };

  return (
    <div className="w-full flex flex-col gap-[1px]">
      <button 
        onClick={() => handleOptionClick('none')}
        className={`w-full h-[60px] bg-[#222222] rounded-[8px] text-[#cccccc] text-[20px] font-pingfang flex justify-between items-center px-3 ${
          selectedOption === 'none' ? 'border-[2px] border-cyan-1' : 'border-[2px] border-transparent'
        }`}
      >
        <span className={`select-none ${selectedOption === 'none' ? 'text-white' : ''}`}>None</span>
        {selectedOption === 'none' && (
          <BsCheckCircleFill className="text-[21px] text-cyan-1" />
        )}
      </button>

      {/* Discount offers */}
      <div className="w-full flex flex-col gap-[1px]">
        <button
          onClick={() => handleOptionClick('discount')}
          className={`w-full h-[60px] bg-[#222222] rounded-[8px] text-[#cccccc] text-[20px] font-pingfang flex justify-between items-center px-3 ${
            selectedOption === 'discount' ? 'border-[2px] border-cyan-1' : 'border-[2px] border-transparent'
          }`}
        >
          <span className={`select-none ${selectedOption === 'discount' ? 'text-white' : ''}`}>Discount Offers</span>
          {selectedOption === 'discount' && (
            <BsCheckCircleFill className="text-[21px] text-cyan-1" />
          )}
        </button>
        {selectedOption === 'discount' && (
          <>
            {discounts.map((discount, index) => (
              <div
                key={index}
                className="w-full h-[40px] justify-center items-center grid grid-cols-2 px-3 gap-6 bg-cyan-1 rounded-[10px]"
              >
                <div className="flex justify-start items-center gap-8">
                  <p className="text-black-1 text-[16px] font-pingfang font-normal">
                    Spend
                  </p>
                  {editingDiscountIndex === index &&
                  discountEditingField === "spend" ? (
                    <input
                      type="number"
                      value={discountEditedValue.spend}
                      onChange={(e) => handleDiscountChange(e, "spend")}
                      onBlur={handleDiscountBlur}
                      className="text-black-1 bg-transparent focus:outline-none text-left border-none w-[60px] text-[16px] font-pingfang font-normal border rounded-[5px]"
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => handleDiscountStartEditing(index, "spend")}
                      className="text-black-1 text-[16px] font-pingfang font-normal cursor-pointer"
                    >
                      {discount.spend}
                    </span>
                  )}
                </div>
                <div className="flex justify-start items-center">
                  <p className="text-black-1 text-[16px] w-[60px] font-pingfang font-normal">
                    {editingDiscountIndex === index &&
                    discountEditingField === "discount" ? (
                      <input
                        type="number"
                        value={discountEditedValue.discount}
                        onChange={(e) => handleDiscountChange(e, "discount")}
                        onBlur={handleDiscountBlur}
                        className="text-black-1 focus:outline-none w-full text-left border-none bg-transparent text-[16px] font-pingfang font-normal border rounded-[5px]"
                        autoFocus
                      />
                    ) : (
                      <span
                        onClick={() =>
                          handleDiscountStartEditing(index, "discount")
                        }
                        className="text-black-1 text-[16px] font-pingfang w-full font-normal cursor-pointer"
                      >
                        {discount.discount}%
                      </span>
                    )}
                  </p>
                  <p className="text-black-1 text-[16px] font-pingfang font-normal">
                    OFF
                  </p>
                </div>
              </div>
            ))}
               <button
              onClick={() => setDiscounts([...discounts, { spend: 200, discount: 90 }])}
              className="w-full mt-1 gap-1 h-[40px] border-[1px] border-[#333333] hover:border-[#00c8c8] rounded-[8px] flex justify-start px-4 items-center group active:scale-[0.98] transition-all duration-200"
            >
              <AiOutlinePlus className="text-[21px] text-[#555555] group-hover:text-[#00c8c8] transition-colors" />
              <p className="text-[#555555] text-[12px] font-pingfang group-hover:text-[#00c8c8] transition-colors">
                Add Discount Offers
              </p>
            </button>
          </>
        )}
      </div>

      {/* Spend and save */}
      <div className="w-full flex flex-col gap-[1px]">
        <button
          onClick={() => handleOptionClick('spend')}
          className={`w-full h-[60px] bg-[#222222] rounded-[8px] text-[#cccccc] text-[20px] font-pingfang flex justify-between items-center px-3 ${
            selectedOption === 'spend' ? 'border-[2px] border-cyan-1' : 'border-[2px] border-transparent'
          }`}
        >
          <span className={`select-none ${selectedOption === 'spend' ? 'text-white' : ''}`}>Spend and Save</span>
          {selectedOption === 'spend' && (
            <BsCheckCircleFill className="text-[21px] text-cyan-1" />
          )}
        </button>
        {selectedOption === 'spend' && (
          <>
            {spendSaves.map((item, index) => (
              <div
                key={index}
                className="w-full h-[40px] relative  justify-center items-center grid grid-cols-2 px-3 gap-6 bg-cyan-1 rounded-[10px]"
              >
                <div className="flex justify-start items-center gap-8">
                  <p className="text-black-1 text-[16px] font-pingfang font-normal">
                    Spend
                  </p>
                  {editingSpendSaveIndex === index &&
                  spendSaveEditingField === "spend" ? (
                    <input
                      type="number"
                      value={spendSaveEditedValue.spend}
                      onChange={(e) => handleSpendSaveChange(e, "spend")}
                      onBlur={handleSpendSaveBlur}
                      className="text-black-1 bg-transparent focus:outline-none text-left border-none w-[60px] text-[16px] font-pingfang font-normal border rounded-[5px]"
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() =>
                        handleSpendSaveStartEditing(index, "spend")
                      }
                      className="text-black-1 text-[16px] font-pingfang font-normal cursor-pointer"
                    >
                      {item.spend}
                    </span>
                  )}
                </div>
                <div className="flex justify-start items-center gap-5">
                  <p className="text-black-1 text-[16px] font-pingfang font-normal">
                    and Save
                  </p>
                  {editingSpendSaveIndex === index &&
                  spendSaveEditingField === "save" ? (
                    <input
                      type="number"
                      value={spendSaveEditedValue.save}
                      onChange={(e) => handleSpendSaveChange(e, "save")}
                      onBlur={handleSpendSaveBlur}
                      className="text-black-1 bg-transparent focus:outline-none text-left border-none w-[60px] text-[16px] font-pingfang font-normal border rounded-[5px]"
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => handleSpendSaveStartEditing(index, "save")}
                      className="text-black-1 text-[16px] font-pingfang font-normal cursor-pointer"
                    >
                      {item.save}
                    </span>
                  )}
                </div>
                {/*  */}
                <button onClick={()=>handleRemoveSpendSave(index)} className="group absolute right-3">
                {index >= 2 && (
                  <Icons.CrossIcon
                    fill="fill-[#000000] group-hover:fill-[#ff1d1d]"
                    className="w-[20px] h-[20px]"
                  />
                )}
              </button>
              </div>
            ))}
          <button
              onClick={() => setSpendSaves([...spendSaves, { spend: 100, save: 20 }])}
              className="w-full mt-1 gap-1 h-[40px] border-[1px] border-[#333333] hover:border-[#00c8c8] rounded-[8px] flex justify-start px-4 items-center group active:scale-[0.98] transition-all duration-200"
            >
              <AiOutlinePlus className="text-[21px] text-[#555555] group-hover:text-[#00c8c8] transition-colors" />
              <p className="text-[#555555] text-[12px] font-pingfang group-hover:text-[#00c8c8] transition-colors">
                Add Spend and Save
              </p>
            </button>
          </>
        )}
        
      </div>
    </div>
  );
};

export default Discount;
