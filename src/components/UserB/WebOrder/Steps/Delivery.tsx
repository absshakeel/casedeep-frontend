"use client";

import React, { useState, useRef } from "react";
import * as Icons from "../../../../Svg/Icons";
import CustomDialog from "../../../shared/Ui/CustomDialog";
import { CgAttachment } from "react-icons/cg";
import { RiLinksFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useUserRedux } from "../../../../hooks/useUserRedux";
import { IoIosArrowBack } from "react-icons/io";

const Delivery: React.FC = () => {
  const [deliveryData, setDeliveryDatat] = useState([
    {
      title: "Title Title Title Title Title Title",
      text: "Filename.pdf..1/3",
      btnType: "Delivered",
    },
    {
      title: "Hello World Hello World",
      text: "Coming Soon",
      btnType: "Modification Requested",
    },
    {
      title: "Hello World Hello World",
      text: "Coming Soon",
      btnType: "Deliver",
    },
  ]);

  // states ------>
  const [showReciptDialog, setShowReciptDialog] = useState(false);
  const [requestModification, setRequestModification] = useState(false);
  const { activeStep2, setActiveStep2 } = useUserRedux();
  const [document, setDocument] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newDocument = { name: file.name, url: url };

      // Set the new document, replacing the previous one
      setDocument(newDocument);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeliveryBtnClick = (btnType: string) => {
    if (btnType === "Delivered") {
      setShowReciptDialog(true);
    }
  };

  const handleBackClick = () => {
    setActiveStep2(-1);
  };

  return (
    <React.Fragment>
      <div className="w-full col-span-2 flex flex-col ">
        {/* header for small screen  */}
        <div className="w-full cmd:hidden pb-3 pt-2 flex justify-between items-center">
          <button
            onClick={handleBackClick}
            className="flex justify-center items-center gap-2"
          >
            <IoIosArrowBack className="text-[#555555] text-[24px]" />
            <p className="text-[#555555] text-[18px] font-pingfang">Payement</p>
          </button>

          <img src="/trumb4.webp" className="w-[40px] h-[40px]" alt="" />
        </div>
        <div className="w-full h-fit mx-auto  gap-3 pl-0 md:pl-3 grid grid-cols-2 csm:grid-cols-3 xl:grid-cols-4">
          {/* delivery 1 */}
          {deliveryData.map((block, index) => {
            return (
              <div
                key={index}
                className="w-full relative h-full justify-between max-w-[250px] mx-auto bg-contract-bg p-4 rounded-[32px] flex flex-col"
              >
                <div className="w-full ">
                  <div className="flex justify-start items-center gap-2">
                    <Icons.Check4
                      fill={`${
                        block.btnType === "Delivered"
                          ? "fill-[#00c8c8]"
                          : "fill-[#555555]"
                      }`}
                    />
                    <p className="text-[16px] text-[#cccccc] leading-[20px] font-pingfang">
                      {block.title}
                    </p>
                  </div>

                  <p className="text-[16px] my-4 text-center text-[#aaaaaa] leading-[20px] font-pingfang">
                    {block.text}
                  </p>
                </div>
                <button
                  onClick={() => handleDeliveryBtnClick(block.btnType)}
                  className={`w-full h-[50px] transition-all px-2 duration-300 ${
                    block.btnType === "Delivered" &&
                    "bg-cyan-btn active:bg-press-cyan hover:bg-hover-cyan transition-all duration-300 text-black-1"
                  } 
                ${
                  block.btnType === "Modification Requested" &&
                  "bg-[#3d3d3d] active:bg-[#00c8c8] active:text-black-1 transition-all duration-300 leading-[18px] hover:bg-[#555555] text-[#cccccc]"
                } 
                     ${
                       block.btnType === "Deliver" &&
                       "bg-[#3d3d3d] active:bg-[#00c8c8] active:text-black-1 transition-all duration-300 leading-[18px] hover:bg-[#555555] text-[#cccccc]"
                     } 
                }

              rounded-[25px] text-[14px] font-pingfang`}
                >
                  {block.btnType}
                </button>
                {/* delete card ----> */}
              </div>
            );
          })}
        </div>
      </div>
      {/* show recipt dialog ------> */}
      <CustomDialog
        size="max-w-md"
        open={showReciptDialog}
        close={setShowReciptDialog}
      >
        <div className="w-full relative flex gap-4 flex-col">
          {/* title */}
          <p className="text-[#cccccc] text-[16px] font-normal font-pingfang">
            Title Title Title Title Title Title
          </p>
          {/* attached document ---> */}
          {Array(2)
            .fill(0)
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex flex-col border-[1px] border-[#777777] rounded-[10px]"
                >
                  {/* top section */}
                  <div className="w-full flex justify-start items-center bg-transparent p-2">
                    <div className="flex justify-center items-center gap-2">
                      <CgAttachment className="text-[18px] group-hover:text-[#999] text-[#777] -rotate-45" />
                      <p className="text-[#777777] font-pingfang text-[12px]">
                        Receipt
                      </p>
                    </div>
                  </div>
                  {/* document  */}
                  <div className="w-full h-[180px] group rounded-b-[10px] flex items-end bg-modal-bg">
                    <div className="w-full group-hover:bg-white-1/50 border-b-[#777777] group-hover:border-b-white-1/50 transition-all duration-300 px-3 py-2 flex justify-between items-center rounded-b-[10px]">
                      <button className="text-black-1 text-[12px] font-pingfang-semibold border-[1px] border-black-1 rounded-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        Replace
                      </button>
                      <div className="flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <img
                          src="/printer.png"
                          className="w-[40px] h-[40px] cursor-pointer"
                          alt=""
                        />
                        <img
                          src="/download.png"
                          className="w-[40px] h-[40px] cursor-pointer"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* attached file  */}

          <div className="w-full grid gap-2 relative grid-cols-1 items-start border-[1px] border-[#777777] px-1 rounded-[10px] py-2">
            <div className="w-full gap-1 flex justify-center items-start">
              <RiLinksFill className="text-[20px] group-hover:fill-[#999] fill-[#777]" />
              <div className="w-full overflow-auto flex flex-col">
                <input
                  type="text"
                  ref={inputRef}
                  autoFocus={true}
                  defaultValue={
                    document?.name ? document.name : "IMG_20220604_105148.jpg"
                  }
                  className="text-[#777777] w-[150px] bg-transparent focus:outline-none text-[12px] font-pingfang focus:text-[#00c8c8]"
                />
                <div className="w-full flex justify-between items-center gap-2">
                  <p className="text-[12px] w-[280px] truncate font-pingfang text-[#777777]">
                    {document?.url
                      ? document.url
                      : "https://testtesttesttesttesttesttejsnjsncjsncjnsjcnsja"}
                  </p>
                  <button className="px-2 mr-1 active:text-[#999999] active:border-[#999999] transition-all duration-300 py-[2px] rounded-[5px] border-[1px] border-[#777777] font-pingfang text-[12px] text-[#777777]">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* recived payement ---> */}
          <button className="w-full h-[50px] text-[#00bb55] text-[14px] font-pingfang rounded-[20px] border-[1px] border-[#00bb55]">
            I received it! Order is complete.
          </button>
          <button
            onClick={() => {
              setShowReciptDialog(false);
              setRequestModification(true);
            }}
            className="w-full h-[40px] text-[#777777] text-[14px] font-pingfang rounded-[20px] border-[1px] border-[#777777]"
          >
            Request modification...
          </button>

          {/* close modal */}
          <button
            onClick={() => setShowReciptDialog(false)}
            className="absolute right-0 top-0"
          >
            <RxCross2 className="text-[20px] text-[#555555] hover:text-[#777777] transition-all duration-300" />
          </button>
        </div>
      </CustomDialog>
      {/* request modification dialog ------->  */}
      <CustomDialog
        size="max-w-md"
        open={requestModification}
        close={setRequestModification}
        initialFocus={textAreaRef}
      >
        <div className="w-full relative flex gap-4 flex-col">
          {/* title */}
          <p className="text-[#cccccc] text-[16px] font-normal font-pingfang">
            Title Title Title Title Title Title
          </p>

          {/* request modification text ---->  */}
          <textarea
            autoFocus={true}
            ref={textAreaRef}
            placeholder="Describe the requested modifications here..."
            className="w-full resize-none placeholder:text-[#00c8c8] focus:outline-none p-2 text-[#00c8c8] font-pingfang text-[14px] min-h-[250px] bg-[#333333] rounded-[10px]"
          ></textarea>

          <div className="w-full flex flex-col border-[1px] border-[#777777] rounded-[10px]">
            {/* top section */}
            <div className="w-full flex justify-between items-center bg-transparent p-2">
              <div className="flex justify-center items-center gap-2">
                <CgAttachment className="text-[18px] group-hover:text-[#999] text-[#777] -rotate-45" />
                <p className="text-[#777777] font-pingfang text-[12px]">
                  Receipt
                </p>
              </div>
              {/* cross icon  */}
              <div className="flex justify-center items-center gap-6">
                <p className="text-[12px] font-pingfang text-[#777777]">
                  Nov. 09, 2025
                </p>
                <button className="cursor-pointer group">
                  <Icons.CrossIcon
                    className="w-[20px] h-[20px]"
                    fill="fill-[#777777] group-hover:fill-[#ff1d1d] group-active:opacity-50"
                  />
                </button>
              </div>
            </div>
            {/* document  */}
            <div className="w-full h-[180px] group rounded-b-[10px] flex items-end bg-modal-bg">
              <div className="w-full group-hover:bg-white-1/50 border-b-[#777777] group-hover:border-b-white-1/50 transition-all duration-300 px-3 py-2 flex justify-between items-center rounded-b-[10px]">
                <button className="text-black-1 text-[12px] font-pingfang-semibold border-[1px] border-black-1 rounded-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Replace
                </button>
                <div className="flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <img
                    src="/printer.png"
                    className="w-[40px] h-[40px] cursor-pointer"
                    alt=""
                  />
                  <img
                    src="/download.png"
                    className="w-[40px] h-[40px] cursor-pointer"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          {/* attached file  */}

          <div className="w-full grid gap-2 relative grid-cols-[1fr,50px] items-start border-[1px] border-[#777777] px-1 rounded-[10px] py-2">
            <div className="w-full gap-1 flex justify-center items-start">
              <RiLinksFill className="text-[20px] group-hover:fill-[#999] fill-[#777]" />
              <div className="w-full overflow-auto  flex flex-col">
                <input
                  type="text"
                  ref={inputRef}
                  autoFocus={true}
                  defaultValue={document?.name ? document.name : "Link Name"}
                  className="text-[#777777] w-[150px] bg-transparent focus:outline-none text-[12px] font-pingfang focus:text-[#00c8c8]"
                />
                <div className="w-full flex justify-between items-center gap-2">
                  <p className="text-[12px] w-[200px] csm:w-[280px] truncate font-pingfang text-[#777777]">
                    {document?.url
                      ? document.url
                      : "https://testtesttesttesttesttesttejsnjsncjsncjnsjcnsja"}
                  </p>
                </div>
              </div>
            </div>
            {/* cross icon  */}
            <button className="absolute right-[8px] group top-[6px]">
              <Icons.CrossIcon
                className="w-[20px] h-[20px]"
                fill="fill-[#777777] group-hover:fill-[#ff1d1d] group-active:opacity-50"
              />
            </button>
            {/* date  */}
            <p className="text-[#777777] absolute top-1 right-[4rem] font-pingfang text-[12px] font-normal">
              Nov. 09, 2025
            </p>
          </div>
          {/* edit file */}
          <div className="w-full my-1 grid gap-2 grid-cols-[1fr,30px]">
            <button
              onClick={handleButtonClick}
              className="w-full gap-2 group hover:border-[#999999] transition-all duration-300 border-[1px] border-[#777777] rounded-[10px] flex justify-start items-center px-1 h-[30px]"
            >
              <CgAttachment className="text-[20px] group-hover:text-[#999] text-[#777] -rotate-45" />
              <p className="text-[12px] w-[calc(100%-60px)] text-left truncate font-pingfang group-hover:text-[#999999] text-[#777777]">
                Attach - PDF/Excel/Word/JPG/PNG...
              </p>
            </button>
            <button
              onClick={handleButtonClick}
              className="w-[30px] transition-all duration-300 h-[30px] hover:border-[#999999] group flex justify-center items-center border-[1px] border-[#777777] rounded-[10px]"
            >
              <RiLinksFill className="text-[20px] group-hover:fill-[#999] fill-[#777]" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          {/* close modal */}
          <button
            onClick={() => setRequestModification(false)}
            className="absolute right-0 top-0"
          >
            <RxCross2 className="text-[20px] text-[#555555] hover:text-[#777777] transition-all duration-300" />
          </button>
          <button
            onClick={() => {
              setRequestModification(false);
            }}
            className="w-full h-[50px] text-[#777777] text-[14px] font-pingfang rounded-[20px] border-[1px] border-[#777777]"
          >
            Request modification...
          </button>
        </div>
      </CustomDialog>
    </React.Fragment>
  );
};

export default Delivery;
