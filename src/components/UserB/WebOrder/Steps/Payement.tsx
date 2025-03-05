import React, { useState, useRef } from "react";
import PayementCard from "../../../shared/Ui/PayementCard";
import * as Icons from "../../../../Svg/Icons";
import CustomDialog from "../../../shared/Ui/CustomDialog";
import { CgAttachment } from "react-icons/cg";
import { RiLinksFill } from "react-icons/ri";
import CreatePayement from "../../../shared/Ui/CreatePayement";
import { RxCross2 } from "react-icons/rx";
import InputWithLabel from "../../../shared/Ui/InputWithLabel";
import TextAreaWithLabel from "../../../shared/Ui/TextAreaWithLabel";
import { useUserRedux } from "../../../../hooks/useUserRedux";
import { IoIosArrowBack } from "react-icons/io";

const Payement: React.FC = () => {
  // dialog states --------->

  const [payDialog, setPayDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { activeStep2, setActiveStep2 } = useUserRedux();
  const [document, setDocument] = useState<{
    name: string;
    url: string;
    type: string;
    date: string;
  } | null>(null);
  const [showReciptDialog, setShowReciptDialog] = useState(false);
  const [payementFormDialog, setPayementFormDialog] = useState(false);
  const [isPayConfirmed, setPayConfimed] = useState(false);
  const [deleteAttachmentDialog, setDeleteAttachmentDialog] = useState(false);

  const [paymentBlocks, setPaymentBlocks] = useState<
    { title: string; price: string; btnType: string }[]
  >([
    {
      title: "30%",
      price: "3,000,000.00",
      btnType: "Paid",
    },
    {
      title: "30%",
      price: "3,000,000.00",
      btnType: "Pay",
    },
  ]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const fileType = file.type.split('/')[0];
      const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
      
      setDocument({
        name: file.name,
        url: url,
        type: fileType,
        date: currentDate
      });
      setShowReciptDialog(true);
      setPayDialog(false);
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePayementBtnClick = (btnType: string) => {
    if (btnType === "Pay") {
      setPayementFormDialog(true);
    }
    if (btnType === "Paid") {
      setShowReciptDialog(true);
    }
  };

  const handleBackClick = () => {
    setActiveStep2(-1);
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
            <p className="text-[#555555] text-[18px] font-pingfang">Payement</p>
          </button>

          <img src="/trumb4.webp" className="w-[40px] h-[40px]" alt="" />
        </div>
        <div className="w-full h-fit col-span-2 gap-3 pl-0 md:pl-3 grid grid-cols-2 csm:grid-cols-3 xl:grid-cols-4">
          {paymentBlocks.map((block, index) => (
            <div
              key={index}
              className="w-full bg-[green] h-fit relative bg-contract-bg p-4 rounded-[32px] flex flex-col gap-3"
            >
              <div className="flex justify-start items-center gap-2">
                <Icons.Check4
                  fill={`${
                    block.btnType === "Paid"
                      ? "fill-[#ff9527]"
                      : "fill-[#555555]"
                  } `}
                  className="min-w-[50px] min-h-[50px]"
                />
                <input
                  className={`text-[36px] ${
                    block.btnType === "Paid"
                      ? "text-[#cccccc] placeholder:text-[#cccccc]"
                      : "text-[#555555] placeholder:text-[#555555]"
                  }  leading-[20px] w-[calc(100%-50px)] focus:text-cyan-1 resize-none font-pingfang bg-transparent border-none outline-none`}
                  placeholder={block.title}
                  autoFocus={index === paymentBlocks.length - 1}
                />
              </div>
              <div className="flex justify-start items-center gap-2">
                <p
                  className={` ${
                    block.btnType === "Paid"
                      ? "text-[#999999]"
                      : "text-[#555555]"
                  } text-[16px] font-pingfang uppercase`}
                >
                  USD
                </p>
                <input
                  type="number"
                  className={`${
                    block.btnType === "Paid"
                      ? "text-[#999999] placeholder:text-[#999999]"
                      : "text-[#555555] placeholder:text-[#555555]"
                  } text-[16px] font-pingfang bg-transparent border-none outline-none w-full`}
                  placeholder={block.price}
                />
              </div>

              <button
                onClick={() => handlePayementBtnClick(block.btnType)}
                className={`w-full h-[50px] ${
                  block.btnType === "Pay" &&
                  "bg-orange-btn hover:bg-hover-orange active:bg-press-orange text-black-1"
                } 
                ${
                  block.btnType === "Paid" &&
                  "bg-[#333333] hover:bg-[#3d3d3d] active:text-[#999999] active:bg-[#333333] border-[#333333] text-[#999999]"
                }
                transition-all duration-300 font-pingfang rounded-[25px] text-[14px] font-normal `}
              >
                {block.btnType}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* payement detail form  */}
      <CustomDialog
        size="max-w-md"
        open={payementFormDialog}
        close={setPayementFormDialog}
      >
        <div className="w-full flex gap-[10px] flex-col">
          {/* name */}
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#cccccc] text-[12px] font-pingfang">Beneficiary Name</p>
            <p className="text-[#777777] text-[14px] font-pingfang">Enter beneficiary name</p>
          </div>
          {/* Beneficiary Address */}
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#cccccc] text-[12px] font-pingfang">Beneficiary Address</p>
            <p className="text-[#777777] text-[14px] font-pingfang">TextText TextText TextText TextText TextText TextText TextText TextText</p>
          </div>
          {/* Bank Name */}
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#cccccc] text-[12px] font-pingfang">Bank Name</p>
            <p className="text-[#777777] text-[14px] font-pingfang">Enter Bank Name</p>
          </div>
          {/* Bank Address */}
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#cccccc] text-[12px] font-pingfang">Bank Address</p>
            <p className="text-[#777777] text-[14px] font-pingfang">TextText TextText TextText TextText TextText TextText TextText TextText</p>
          </div>
          {/* Account Number */}
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#cccccc] text-[12px] font-pingfang">Account Number</p>
            <p className="text-[#777777] text-[14px] font-pingfang">123456789</p>
          </div>
          {/* Routing Number */}
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#cccccc] text-[12px] font-pingfang">Routing Number</p>
            <p className="text-[#777777] text-[14px] font-pingfang">123456789</p>
          </div>
          {/* Branch Name */}
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#cccccc] text-[12px] font-pingfang">Branch Name - Optional</p>
            <p className="text-[#777777] text-[14px] font-pingfang">TextText TextText TextText</p>
          </div>
          {/* Account Type */}
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#cccccc] text-[12px] font-pingfang">Account Type - Optional</p>
            <p className="text-[#777777] text-[14px] font-pingfang">TextText TextText TextText</p>
          </div>
          {/* SWIFT/BIC */}
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#cccccc] text-[12px] font-pingfang">SWIFT/BIC - Optional</p>
            <p className="text-[#777777] text-[14px] font-pingfang">TextText TextText TextText</p>
          </div>
          
          {/* Transaction Disclaimer */}
          <div className="w-full flex flex-col gap-1 mt-2">
            <p className="text-[#cccccc] text-[12px] font-pingfang">Transaction Disclaimer</p>
            <p className="text-[10px] text-[#ff9527] font-pingfang">
              The above payment account is provided by "Display Name," and you will be making a direct payment to the recipient's bank account. This website does not provide any guarantee services for this transaction, and you will bear the transaction risk yourself.
            </p>
          </div>

          {/* Buttons with hover/pressed effects */}
          <button className="w-full mt-3 min-h-[40px] rounded-[20px] text-[14px] font-pingfang text-[#777777] border-[1px] border-[#777777] hover:text-[#999999] hover:border-[#999999] active:opacity-50 transition-all duration-300">
            Copy account information
          </button>
          <button
            onClick={() => {
              setPayementFormDialog(false);
              setPayDialog(true);
            }}
            className="w-full min-h-[40px] mt-1 rounded-[20px] text-[14px] font-pingfang text-[#00bb55] border-[1px] border-[#00bb55] hover:text-[#00ff77] hover:border-[#00ff77] active:opacity-50 transition-all duration-300"
          >
            Payment completed?
          </button>
        </div>
      </CustomDialog>

      {/* pay dialog ----> */}
      <CustomDialog
        size="max-w-md"
        title=" Do you send the invoice?"
        open={payDialog}
        close={setPayDialog}
      >
        <div className="w-full flex flex-col">
          <div className="w-full my-4 grid gap-2 grid-cols-[1fr,30px]">
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
          {/* buttons  */}
          <div className="w-full mt-2 flex justify-between items-center">
            <button
              onClick={() => setPayDialog(false)}
              className="w-[80px] h-[40px] hover:border-[#00ff77] active:text-[#00bb55] active:border-[#00bb55] active:opacity-50 transition-all duration-300 hover:text-[#00ff77] text-[#00bb55] text-[14px] font-pingfang border-[1px] border-[#0B5] rounded-[20px]"
            >
              Yes
            </button>
            <button
              onClick={() => setPayDialog(false)}
              className="hover:text-[##999999] w-[80px] hover:border-[#999999] transition-all duration-300 active:opacity-50 h-[40px] text-[#777777] text-[14px] font-pingfang border-[1px] border-[#777777] rounded-[20px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </CustomDialog>

      {/* show recipt dialog ------> */}
      <CustomDialog
        size="max-w-md"
        open={showReciptDialog}
        close={setShowReciptDialog}
        title="Do you send the receipt?"
      >
      <div className="w-full flex flex-col border-[1px] border-[#777777] rounded-[10px]">
        <div className="w-full flex justify-between items-center bg-transparent p-2">
          <div className="flex justify-center items-center gap-2">
            <CgAttachment className="text-[18px] text-[#777] -rotate-45" />
            <p className="text-[#777777] font-pingfang text-[12px]">
              {document?.name || 'Receipt'}
            </p>
          </div>
          <div className="flex justify-center items-center gap-6">
            <p className="text-[12px] font-pingfang text-[#777777]">
              {document?.date || 'Nov. 09, 2025'}
            </p>
            <button
              onClick={() => {
                setDeleteAttachmentDialog(true);
                setShowReciptDialog(false);
              }}
              className="cursor-pointer group"
            >
              <Icons.CrossIcon
                className="w-[20px] h-[20px]"
                fill="fill-[#777777] group-hover:fill-[#ff1d1d] group-active:opacity-50"
              />
            </button>
          </div>
        </div>
        <div 
          className="w-full h-[180px] group rounded-b-[10px] relative bg-modal-bg cursor-pointer"
          onClick={() => document?.url && window.open(document.url, '_blank')}
        >
          {document?.url && (
            <img 
              src={document.url} 
              alt={document.name}
              className="w-full h-full object-contain"
            />
          )}
          <div className="w-full absolute bottom-0 opacity-0 group-hover:opacity-100 bg-[#333333]/80 transition-all duration-300 px-3 py-2 flex justify-between items-center rounded-b-[10px]">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleButtonClick();
              }}
              className="text-[#cccccc] text-[12px] font-pingfang border-[1px] border-[#777777] rounded-[10px] px-3 py-1 hover:border-[#999999] hover:text-[#ffffff] transition-all duration-300"
            >
              Replace
            </button>
            <div className="flex justify-center items-center gap-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.print();
                }}
                className="hover:opacity-80 transition-all duration-300"
              >
                <img
                  src="/printer.png"
                  className="w-[24px] h-[24px] cursor-pointer"
                  alt="Print"
                />
              </button>
              <a 
                href={document?.url}
                download={document?.name}
                onClick={(e) => e.stopPropagation()}
                className="hover:opacity-80 transition-all duration-300"
              >
                <img
                  src="/download.png"
                  className="w-[24px] h-[24px] cursor-pointer"
                  alt="Download"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      </CustomDialog>
      {/* delete this Attachment ---->   */}
      <CustomDialog
        size="max-w-md"
        title="Invoice"
        open={deleteAttachmentDialog}
        close={setDeleteAttachmentDialog}
      >
        <div className="w-full flex flex-col">
          <p className="text-[16px] font-pingfang text-[#cccccc]">
            Delete this Attachment?
          </p>
          {/* buttons  */}
          <div className="w-full mt-10 flex justify-between items-center">
            <button
              onClick={() => setDeleteAttachmentDialog(false)}
              className="w-[80px] h-[40px] border-[1px] border-[#ff1d1d] text-[#ff1d1d] text-[14px] font-pingfang rounded-[20px]"
            >
              Delete
            </button>
            <button
              onClick={() => setDeleteAttachmentDialog(false)}
              className="w-[80px] hover:text-[##999999] hover:border-[#999999] transition-all duration-300 active:opacity-50 h-[40px] text-[#777777] text-[14px] font-pingfang border-[1px] border-[#777777] rounded-[20px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </CustomDialog>
    </React.Fragment>
  );
};

export default Payement;
