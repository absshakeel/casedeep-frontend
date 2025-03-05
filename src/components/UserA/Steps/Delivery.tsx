import React, { useState, useRef } from "react";
import CustomDialog from "../../shared/Ui/CustomDialog";
import { CgAttachment } from "react-icons/cg";
import { RiLinksFill } from "react-icons/ri";
import * as Icons from "../../../Svg/Icons";
import { RxCross2 } from "react-icons/rx";
import CreateDelivery from "../../shared/Ui/CreatePayement";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowBack } from "react-icons/io";
import { useUserRedux } from "../../../hooks/useUserRedux";

const Delivery: React.FC = () => {
  const { activeStep2, setActiveStep2, deliveryInfo, updateDeliveryInfo } = useUserRedux();
  const [deliveryDocumentDialog, setDeliveryDocumentDialog] = useState(false);
  const [editDocumentDialog, setEditDialogDocument] = useState(false);
  const [showReciptDialog, setShowReciptDialog] = useState(false);
  const [selectedReciptId, setSelectedReciptId] = useState<string | null>(null);
  const [deleteAttachmentDialog, setDeleteAttachmentDialog] = useState(false);
  const [openDocIndex, setOpenDocIndex] = useState<number>(0);
  const [deliveryBlocks, setDeliveryBlocks] = useState<{
    title: string;
    text: string;
    confirmed: boolean;
    btnType: string;
    uploadedDocuments: Array<{
      id: string;
      name?: string;
      url?: string;
      date?: string;
      type?: 'file' | 'link';
    }>;
  }[]>(deliveryInfo || [
    {
      title: "Title Title Title Title",
      text: "Filename.pdf..1/3",
      confirmed: false,
      btnType: "Deliver",
      uploadedDocuments: [{ id: uuidv4() }],
    },
  ]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const [deleteCard, setDeleteCard] = useState(false);

  // Update document state type to match Payment.tsx
  const [document, setDocument] = useState<{
    name: string;
    url: string;
    type: string;
    date: string;
  } | null>(null);
  const [url, setUrl] = useState<string>('');

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

      // Update the delivery block text with the actual filename
      const updatedBlocks = [...deliveryBlocks];
      updatedBlocks[openDocIndex].text = file.name;
      setDeliveryBlocks(updatedBlocks);

      setEditDialogDocument(true);
      setDeliveryDocumentDialog(false);
    }
  };

  const handleDocumentChange = (field: "name" | "url", value: string) => {
    if (document) {
      setDocument({
        ...document,
        [field]: value,
      });
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCreateNewDelivery = () => {
    const newBlock = {
      title: "New Title",
      text: "New description...",
      confirmed: false,
      btnType: "Deliver",
      uploadedDocuments: [{ id: uuidv4() }],
    };
    setDeliveryBlocks([...deliveryBlocks, newBlock]);
    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.focus();
      }
    }, 0);
  };

  const handleConfirmDelivery = (index: number) => {
    const updatedBlocks = [...deliveryBlocks];
    updatedBlocks[index].confirmed = !updatedBlocks[index].confirmed;
    updatedBlocks[index].btnType = updatedBlocks[index].confirmed
      ? "Delivered"
      : "Deliver";
    setDeliveryBlocks(updatedBlocks);
    setEditDialogDocument(false);
  };

  const handleDeliveryCardBtnClick = (btnType: string, index: number) => {
    setOpenDocIndex(index);
    if (btnType === "Deliver") {
      setDeliveryDocumentDialog(true);
    }
    if (btnType === "Delivered") {
      setShowReciptDialog(true);
    }
  };

  const handleRemoveCard = (index: number | null) => {
    setDeliveryBlocks((prevCards) => prevCards.filter((_, i) => i !== index));
  };

  const handleEditChange = (
    index: number,
    field: "title" | "text",
    value: string
  ) => {
    const updatedBlocks = [...deliveryBlocks];
    updatedBlocks[index][field] = value;
    setDeliveryBlocks(updatedBlocks);
  };

  const handleUrlPaste = async () => {
    try {
      const pastedData = await navigator.clipboard.readText();
      handleDocumentChange("url", pastedData);
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  };

  const handleUploadedDocuments = () => {
    setDeliveryBlocks((prevs) => {
      const newBlocks = [...prevs];
      newBlocks[openDocIndex] = {
        ...newBlocks[openDocIndex],
        uploadedDocuments: [
          ...newBlocks[openDocIndex].uploadedDocuments,
          { id: uuidv4() },
        ],
      };
      return newBlocks;
    });
  };

  // The handleRemovePaymentScreenshot function will now work correctly
  const handleRemovePaymentScreenshot = () => {
    setDeliveryBlocks((prev) => {
      const blocks = [...prev];
      blocks[openDocIndex].uploadedDocuments = blocks[
        openDocIndex
      ].uploadedDocuments.filter((doc) => doc.id !== selectedReciptId);
      return blocks;
    });
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
            <p className="text-[#555555] text-[18px] font-pingfang">Delivery</p>
          </button>

          <img src="/trumb4.webp" className="w-[40px] h-[40px]" alt="" />
        </div>

        <div className="w-full h-fit gap-3 pl-0 md:pl-3 grid grid-cols-2 csm:grid-cols-3 xl:grid-cols-4">
          {deliveryBlocks.map((block, index) => (
            <div
              key={index}
              className="w-full relative h-fit max-w-[250px] mx-auto bg-contract-bg p-4 rounded-[32px] flex flex-col gap-3"
            >
              <div className="flex justify-start items-center gap-2">
                <Icons.Check4
                  fill={`${
                    block.btnType === "Deliver" ||
                    block.btnType === "Modification Requested" ||
                    block.btnType === "In Progress"
                      ? "fill-[#555555]"
                      : "fill-[#00c8c8]"
                  }`}
                />
                <textarea
                  ref={index === deliveryBlocks.length - 1 ? titleRef : null}
                  value={block.title}
                  onChange={(e) =>
                    handleEditChange(index, "title", e.target.value)
                  }
                  className={`text-[16px] min-h-fit resize-none pr-2 ${
                    block.btnType === "Request" ||
                    block.btnType === "Modification Requested" ||
                    block.btnType === "In Progress"
                      ? "text-[#555555] focus:text-cyan-1"
                      : "text-[#cccccc] focus:text-cyan-1"
                  } bg-transparent focus:outline-none leading-[20px] font-pingfang`}
                />
              </div>
              <div className="flex py-[2px] justify-center items-center gap-2">
                <textarea
                  value={block.text}
                  onChange={(e) =>
                    handleEditChange(index, "text", e.target.value)
                  }
                  className={`text-[16px] h-[35px] text-center resize-none ${
                    block.btnType === "Request" ||
                    block.btnType === "Modification Requested" ||
                    block.btnType === "In Progress"
                      ? "text-[#555555] focus:text-cyan-1"
                      : "text-[#999999] focus:text-cyan-1"
                  } bg-transparent focus:outline-none font-pingfang`}
                />
              </div>
              <button
                onClick={() => handleDeliveryCardBtnClick(block.btnType, index)}
                className={`w-full h-[50px] transition-all px-2 duration-300 ${
                  (block.btnType === "Deliver" ||
                    block.btnType === "Received?") &&
                  "bg-[#3d3d3d] hover:bg-[#555555] active:bg-[#00c8c8] active:text-black-1 text-[#cccccc]"
                } 
             ${
               block.btnType === "Delivered" &&
               "bg-cyan-btn active:bg-press-cyan hover:bg-hover-cyan transition-all duration-300 text-black-1"
             }
             ${
               block.btnType === "Modification Requested" &&
               "bg-[#3d3d3d] text-[#cccccc]"
             }
                 ${
                   block.btnType === "In Progress" &&
                   "bg-[#3d3d3d] text-[#aaaaaa]"
                 }
     
             rounded-[25px] text-[14px] font-pingfang`}
              >
                {block.btnType}
              </button>
              {/* delete card ----> */}
              {index !== 0 && (
                <button
                  onClick={() => {
                    setDeleteCard(true);
                    setOpenDocIndex(index);
                  }}
                  className="group absolute right-4 top-2 cursor-pointer z-30"
                >
                  <RxCross2 className="text-[20px] text-[#555555] group-active:text-cyan-1 duration-300 transition-all group-hover:text-[#777777]" />
                </button>
              )}
            </div>
          ))}

          {/* creat delivery btn --->  */}
          <CreateDelivery
            text="Create Delivery"
            event={handleCreateNewDelivery}
          />
        </div>
      </div>
      {/* attach file dialog --->  */}
  
      <CustomDialog
        size="max-w-md"
        title="Ready to deliver now?"
        open={deliveryDocumentDialog}
        close={setDeliveryDocumentDialog}
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
              onClick={() => {
                setEditDialogDocument(true);
                setDeliveryDocumentDialog(false);
              }}
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
              onClick={() => {
                if (openDocIndex !== null) {
                  handleConfirmDelivery(openDocIndex);
                  setDeliveryDocumentDialog(false);
                }
              }}
              className="w-[80px] h-[40px] hover:border-[#00ff77] active:text-[#00bb55] active:border-[#00bb55] active:opacity-50 transition-all duration-300 hover:text-[#00ff77] text-[#00bb55] text-[14px] font-pingfang border-[1px] border-[#0B5] rounded-[20px]"
            >
              Yes
            </button>
            <button
              onClick={() => setDeliveryDocumentDialog(false)}
              className="hover:text-[##999999] w-[80px] hover:border-[#999999] transition-all duration-300 active:opacity-50 h-[40px] text-[#777777] text-[14px] font-pingfang border-[1px] border-[#777777] rounded-[20px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </CustomDialog>
      {/* edit document ---> */}
      <CustomDialog
        size="max-w-md"
        title={document ? "Do you send the invoice?" : "Add Link"}
        open={editDocumentDialog}
        close={() => {
          setEditDialogDocument(false);
          setDeliveryDocumentDialog(true);
          setUrl('');
          setDocument(null);
        }}
      >
        <div className="w-full flex flex-col">
          <div className="w-full my-4 grid gap-2 relative grid-cols-[1fr,50px] items-start border-[1px] border-[#777777] px-1 rounded-[10px] py-2">
            <div className="w-full gap-1 flex justify-center items-start">
              <RiLinksFill className="text-[20px] group-hover:fill-[#999] fill-[#777]" />
              <div className="w-full flex flex-col">
                <input
                  type="text"
                  ref={nameInputRef}
                  value={document?.name || ""}
                  onChange={(e) => handleDocumentChange("name", e.target.value)}
                  className="text-[#777777] bg-transparent focus:outline-none text-[12px] font-pingfang focus:text-[#00c8c8] w-full"
                  placeholder="Document name"
                />
                <div className="w-full flex justify-between items-center gap-2">
                  <input
                    type="text"
                    ref={urlInputRef}
                    value={document?.url || ""}
                    onChange={(e) =>
                      handleDocumentChange("url", e.target.value)
                    }
                    className="text-[#777777] bg-transparent focus:outline-none text-[12px] font-pingfang focus:text-[#00c8c8] w-[200px] csm:w-[280px]"
                    placeholder="Document URL"
                  />
                  <button
                    onClick={handleUrlPaste}
                    className="border-[1px] border-[#777777] hover:border-[#999999] hover:text-[#999999] transition-all duration-300 text-[#777777] font-pingfang text-[12px] px-1 py-[2px] rounded-[5px]"
                  >
                    Paste
                  </button>
                </div>
              </div>
            </div>
            {/* cross icon  */}
            <button
              onClick={() => {
                setDeliveryDocumentDialog(true);
                setEditDialogDocument(true);
              }}
              className="absolute right-[8px] group top-[6px]"
            >
              <Icons.CrossIcon
                className="w-[20px] h-[20px]"
                fill="fill-[#777777] group-hover:fill-[#ff1d1d] group-active:opacity-50"
              />
            </button>
          </div>
          {/* buttons  */}
          <div className="w-full mt-0 csm:mt-2 flex justify-between items-center">
            <button
              onClick={() => {
                if (openDocIndex !== null) {
                  handleConfirmDelivery(openDocIndex);
                }
              }}
              className="w-[80px] h-[40px] hover:border-[#00ff77] active:text-[#00bb55] active:border-[#00bb55] active:opacity-50 transition-all duration-300 hover:text-[#00ff77] text-[#00bb55] text-[14px] font-pingfang border-[1px] border-[#0B5] rounded-[20px]"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setEditDialogDocument(false);
                setDeliveryDocumentDialog(true);
                setUrl('');
                setDocument(null);
              }}
              className="hover:text-[##999999] w-[80px] hover:border-[#999999] transition-all duration-300 active:opacity-50 h-[40px] text-[#777777] text-[14px] font-pingfang border-[1px] border-[#777777] rounded-[20px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </CustomDialog>
      {/* show recipt dialog ------> */}
      {showReciptDialog && deliveryBlocks[openDocIndex] && (
        <CustomDialog
          size="max-w-md"
          open={showReciptDialog}
          close={setShowReciptDialog}
        >
          <div className="w-full relative flex gap-4 flex-col">
            {/* title */}
            <p className="text-[#cccccc] text-[16px] font-normal font-pingfang">
            Ready to deliver now?
            </p>
            {/* attached document ---->  */}
            {deliveryBlocks[openDocIndex].uploadedDocuments?.map(
              (item, index) => {
                if (!item.name) return null;
                return (
                  <div
                    key={index}
                    className="w-full flex flex-col border-[1px] border-[#777777] rounded-[10px]"
                  >
                    {/* top section */}
                    <div className="w-full flex justify-between items-center bg-transparent p-2">
                      <div className="flex justify-center items-center gap-2">
                        <CgAttachment className="text-[18px] group-hover:text-[#999] text-[#777] -rotate-45" />
                        <p className="text-[#777777] font-pingfang text-[12px]">
                          {item.name}
                        </p>
                      </div>
                      {/* cross icon and date */}
                      <div className="flex justify-center items-center gap-6">
                        <p className="text-[12px] font-pingfang text-[#777777]">
                          {item.date}
                        </p>
                        <button
                          onClick={() => {
                            setDeleteAttachmentDialog(true);
                            setSelectedReciptId(item.id);
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
                    {/* document preview */}
                    <div className="w-full h-[180px] group rounded-b-[10px] flex items-end bg-modal-bg">
                      {item.url && (
                        <img 
                          src={item.url} 
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      )}
                      <div className="w-full group-hover:bg-white-1/50 border-b-[#777777] group-hover:border-b-white-1/50 transition-all duration-300 px-3 py-1 csm:py-2 flex justify-between items-center rounded-b-[10px]">
                        <button className="text-black-1 text-[12px] font-pingfang-semibold border-[1px] border-black-1 rounded-[10px] px-2 py-1">
                          Replace
                        </button>
                        <div className="flex justify-center items-center gap-4">
                          <img
                            src="/printer.png"
                            className="w-[30px] csm:w-[40px] h-[30px] csm:h-[40px] cursor-pointer"
                            alt=""
                          />
                          <img
                            src="/download.png"
                            className="w-[30px] csm:w-[40px] h-[30px] csm:h-[40px] cursor-pointer"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}

            {/* edit file */}
            <div className="w-full mt-2 mb-2 grid gap-2 grid-cols-[1fr,30px]">
              <button
                onClick={handleButtonClick}
                className="w-full gap-2 group hover:border-[#999999] transition-all duration-300 border-[1px] border-[#777777] rounded-[10px] flex justify-start items-center px-1 h-[30px]"
              >
                <CgAttachment className="text-[20px] group-hover:text-[#999] text-[#777] -rotate-45" />
                <p className="text-[12px] w-[calc(100%-60px)] csm:w-[calc(100%-60px)] text-left truncate font-pingfang group-hover:text-[#999999] text-[#777777]">
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
              onClick={() => setShowReciptDialog(false)}
              className="absolute right-0 top-0"
            >
              <RxCross2 className="text-[20px] text-[#555555] hover:text-[#777777] transition-all duration-300" />
            </button>
          </div>
        </CustomDialog>
      )}
      {/* delete delivery ---->   */}
      <CustomDialog size="max-w-md" open={deleteCard} close={setDeleteCard}>
        <div className="w-full flex flex-col">
          <p className="text-[16px] font-pingfang text-[#cccccc]">
            Do you want to delete this delivery card?
          </p>
          {/* buttons  */}
          <div className="w-full mt-10 flex justify-between items-center">
            <button
              onClick={() => {
                handleRemoveCard(openDocIndex);
                setDeleteCard(false);
              }}
              className="w-[80px] h-[40px] border-[1px] border-[#ff1d1d] text-[#ff1d1d] text-[14px] font-pingfang rounded-[20px]"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setDeleteCard(false);
              }}
              className="w-[80px] hover:text-[##999999] hover:border-[#999999] transition-all duration-300 active:opacity-50 h-[40px] text-[#777777] text-[14px] font-pingfang border-[1px] border-[#777777] rounded-[20px]"
            >
              Cancel
            </button>
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
              onClick={() => {
                handleRemovePaymentScreenshot();
                setDeleteAttachmentDialog(false);
              }}
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

export default Delivery;
