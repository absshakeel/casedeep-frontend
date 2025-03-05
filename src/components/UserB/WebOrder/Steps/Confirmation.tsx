//@ts-nocheck

import React, { useState } from "react";
import * as Icons from "../../../../Svg/Icons";
import { AiOutlinePlus } from "react-icons/ai";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { useUserRedux } from "../../../../hooks/useUserRedux";
import { IoIosArrowBack } from "react-icons/io";

interface ListItem {
  id: string;
  title: string;
  value: string;
  subitems: string[];
}

const Confirmation: React.FC = () => {
  // data --------->
  const [listData, setListData] = useState<ListItem[]>([
    {
      id: "1",
      title: "Area",
      value: "90 sqm",
      subitems: ["Japanese style", "Scandinavian style", "Classical style"],
    },
    {
      id: "2",
      title: "Drawings",
      value: "Image",
      subitems: ["Open plan", "Separate rooms", "Mixed layout"],
    },
    {
      id: "3",
      title: "Decorating Style",
      value: "Scandinavian Style",
      subitems: ["Lorem Ipsum", "What is", "specimen book"],
    },
    {
      id: "4",
      title: "Construction Project",
      value: "Decision after further discussion",
      subitems: ["it", "come", "Contrary"],
    },
    {
      id: "5",
      title: "Budget",
      value: "$50-100",
      subitems: ["Open plan", "Separate rooms", "Mixed layout"],
    },
    {
      id: "6",
      title: "Reference",
      value: "Image/Audio/Video/3D/Link",
      subitems: ["There", "Internet", "sentence"],
    },
  ]);
  const { activeStep2, setActiveStep2 } = useUserRedux();

  // states -------->
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [selectedSubitems, setSelectedSubitems] = useState<
    Record<number, string>
  >({});
  const [user, setUser] = useState<string | null>(null);

  // funtions -------->
  const getSelectedSubitemsLength = () => {
    return Object.keys(selectedSubitems).length;
  };

  const handleItemClick = (id: string) => {
    setActiveItem((prevItem) => (prevItem === id ? null : id));
  };

  const handleSubitemSelect = (itemId: string, subitem: string) => {
    setSelectedSubitems((prev) => ({
      ...prev,
      [itemId]: subitem,
    }));
    setActiveItem(null);

    setListData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, value: subitem } : item
      )
    );
  };

  const handleDragEnd = (result: any) => {
    console.log("Drag ended ♥️🛍🧼", result);
    if (!result.destination) return;

    const items = Array.from(listData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setListData(items);
  };

  const handleBackClick = () => {
    if (activeItem === null) {
      setActiveStep2(-1);
    } else {
      setActiveItem(null);
    }
  };

  return (
    <React.Fragment>
      <div className="w-full col-span-2 flex flex-col">
        {/* header for small screen  */}
        <div className="w-full cmd:hidden pb-3 pt-2 flex justify-between items-center">
          <button
            onClick={handleBackClick}
            className="flex justify-center items-center gap-2"
          >
            <IoIosArrowBack className="text-[#555555] text-[24px]" />
            <p className="text-[#555555] text-[18px] font-pingfang">
              {activeItem === null ? "Confirmation" : ""}
            </p>
          </button>

          <img src="/trumb4.webp" className="w-[40px] h-[40px]" alt="" />
        </div>
        <div className="w-full col-span-2 max-w-[500px] csm2:max-w-full mx-auto cmd:grid-cols-2 grid gap-1 grid-cols-1">
          {/* Main List with Drag and Drop */}
          <div className={`w-full hidden cmd:flex flex-col gap-3`}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="listData" mode="vertical" type="DEFAULT" direction="vertical" ignoreContainerClipping={false} isCombineEnabled={false} isDropDisabled={false} renderClone={null}>
                {(provided) => (
                  <div
                    className="w-full flex flex-col gap-[2px]"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {listData.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <ul
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <li
                              onClick={() => {
                                handleItemClick(item.id);
                                setIsOpen(true);
                              }}
                              className={`w-full min-h-[60px] cursor-pointer border-[1px] ${
                                activeItem === item.id
                                  ? "border-[#777777]"
                                  : "border-transparent"
                              } flex justify-between items-center rounded-[8px] px-3 py-2 ${
                                selectedSubitems[item.id]
                                  ? "bg-[#00c8c8]"
                                  : "bg-[#222222]"
                              }`}
                            >
                              <div className="flex gap-3">
                                <p
                                  className={`text-base ${
                                    selectedSubitems[item.id]
                                      ? "text-[#00a7a7]"
                                      : "text-[#555555]"
                                  } font-pingfang`}
                                >
                                  {item.id}
                                </p>
                                <div className="flex items-start flex-col">
                                  <p
                                    className={`text-[16px] font-thin font-pingfang ${
                                      selectedSubitems[item.id]
                                        ? "text-[#000000]"
                                        : "text-[#cccccc]"
                                    }`}
                                  >
                                    {item.title}
                                  </p>
                                  <p
                                    className={` ${
                                      selectedSubitems[item.id]
                                        ? "text-[#000000] font-medium font-pingfang-semibold"
                                        : "text-[#777777] font-thin font-pingfang "
                                    } text-[18px]`}
                                  >
                                    {item.value}
                                  </p>
                                </div>
                              </div>
                              {selectedSubitems[item.id] ? (
                                <Icons.Check3 className="w-[20px] h-[20px]" />
                              ) : (
                                <Icons.LeftArrow
                                  className="w-[20px] h-[20px] rotate-180"
                                  fill="fill-[#555555]"
                                />
                              )}
                            </li>
                          </ul>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {/* Add Option/Input Buttons */}
            {user === "A" && (
              <div className="w-full grid grid-cols-2 gap-2">
                <button className="w-full gap-1 h-[40px] hover:border-[#777777] border-[1px] transition-all duration-200 border-[#333333] rounded-[8px] flex justify-start px-4 items-center">
                  <AiOutlinePlus className="text-[21px] text-[#555555]" />
                  <p className="text-[#555555] text-[12px] font-pingfang">
                    Add Option
                  </p>
                </button>
                <button className="w-full gap-1 h-[40px] hover:border-[#777777] transition-all duration-200 border-[1px] border-[#333333] rounded-[8px] flex justify-start px-4 items-center">
                  <AiOutlinePlus className="text-[21px] text-[#555555]" />
                  <p className="text-[#555555] text-[12px] font-pingfang">
                    Add Input
                  </p>
                </button>
              </div>
            )}
          </div>
          {/* for small screen ---> */}
          {activeItem === null && (
            <div className={`w-full flex cmd:hidden flex-col gap-3`}>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="listData">
                  {(provided) => (
                    <div
                      className="w-full flex flex-col gap-[2px]"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {listData.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <ul
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <li
                                onClick={() => {
                                  handleItemClick(item.id);
                                  setIsOpen(true);
                                }}
                                className={`w-full min-h-[60px] cursor-pointer border-[1px] ${
                                  activeItem === item.id
                                    ? "border-[#777777]"
                                    : "border-transparent"
                                } flex justify-between items-center rounded-[8px] px-3 py-2 ${
                                  selectedSubitems[item.id]
                                    ? "bg-[#00c8c8]"
                                    : "bg-[#222222]"
                                }`}
                              >
                                <div className="flex gap-3">
                                  <p
                                    className={`text-base ${
                                      selectedSubitems[item.id]
                                        ? "text-[#00a7a7]"
                                        : "text-[#555555]"
                                    } font-pingfang`}
                                  >
                                    {item.id}
                                  </p>
                                  <div className="flex items-start flex-col">
                                    <p
                                      className={`text-[16px] font-thin font-pingfang ${
                                        selectedSubitems[item.id]
                                          ? "text-[#000000]"
                                          : "text-[#cccccc]"
                                      }`}
                                    >
                                      {item.title}
                                    </p>
                                    <p
                                      className={` ${
                                        selectedSubitems[item.id]
                                          ? "text-[#000000] font-medium font-pingfang-semibold"
                                          : "text-[#777777] font-thin font-pingfang "
                                      } text-[18px]`}
                                    >
                                      {item.value}
                                    </p>
                                  </div>
                                </div>
                                {selectedSubitems[item.id] ? (
                                  <Icons.Check3 className="w-[20px] h-[20px]" />
                                ) : (
                                  <Icons.LeftArrow
                                    className="w-[20px] h-[20px] rotate-180"
                                    fill="fill-[#555555]"
                                  />
                                )}
                              </li>
                            </ul>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {/* Add Option/Input Buttons */}
              {user === "A" && (
                <div className="w-full grid grid-cols-2 gap-2">
                  <button className="w-full gap-1 h-[40px] hover:border-[#777777] border-[1px] transition-all duration-200 border-[#333333] rounded-[8px] flex justify-start px-4 items-center">
                    <AiOutlinePlus className="text-[21px] text-[#555555]" />
                    <p className="text-[#555555] text-[12px] font-pingfang">
                      Add Option
                    </p>
                  </button>
                  <button className="w-full gap-1 h-[40px] hover:border-[#777777] transition-all duration-200 border-[1px] border-[#333333] rounded-[8px] flex justify-start px-4 items-center">
                    <AiOutlinePlus className="text-[21px] text-[#555555]" />
                    <p className="text-[#555555] text-[12px] font-pingfang">
                      Add Input
                    </p>
                  </button>
                </div>
              )}
            </div>
          )}
          {/* List detail -------> */}
          <div className="w-full mx-auto max-w-full cmd:max-w-[400px] justify-start items-center flex flex-col gap-[3rem]">
            {listData.map(
              (item) =>
                activeItem === item.id && (
                  <div key={item.id} className="w-full flex flex-col gap-[2px]">
                    {item.subitems.map((subitem) => (
                      <button
                        key={subitem}
                        onClick={() => handleSubitemSelect(item.id, subitem)}
                        className={`w-full min-h-[60px] text-[20px] border-[2px] flex justify-between items-center px-3 py-2 ${
                          selectedSubitems[item.id] === subitem
                            ? " border-[2px] text-[#eeeeee] font-pingfang-semibold border-[#00a7a7]"
                            : "border-[#222222] font-pingfang text-[#cccccc]"
                        } rounded-[8px] bg-[#222222]`}
                      >
                        <p className="text-[20px]">{subitem}</p>
                        {selectedSubitems[item.id] === subitem && (
                          <img
                            src="/check.png"
                            className="w-[20px] h-[20px]"
                            alt=""
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )
            )}
            {/* buttons */}
            {activeItem !== null && (
              <div className="w-full flex flex-col justify-center items-center gap-2">
                {/* place order */}
                <button
                  disabled={getSelectedSubitemsLength() < listData.length}
                  className="max-w-[200px] mt-[45%] disabled:mt-0 disabled:font-pingfang font-pingfang-semibold disabled:text-[#333333] text-black-1 w-full min-h-[83px] userBBtn rounded-[80px]"
                >
                  <p className="text-[20px]">Quote/Proposal</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Confirmation;
