import React, { useState, useRef } from "react";
import * as Icons from "../../../Svg/Icons";
import CreatePayement from "../../shared/Ui/CreatePayement";
import CustomDialog from "../../shared/Ui/CustomDialog";
import { CgAttachment } from "react-icons/cg";
import { RiLinksFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowBack } from "react-icons/io";
import { useUserRedux } from "../../../hooks/useUserRedux";

const Payment: React.FC = () => {
  const [requestPaymentDialog, setRequestPaymentDialog] = useState(false);
  const { activeStep2, setActiveStep2 } = useUserRedux();
  const [confirmPaymentDocDialog, setConfirmPaymentDocDialog] = useState(false);
  const [deleteAttachmentDialog, setDeleteAttachmentDialog] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);
  const [selectedReciptId, setSelectedReciptId] = useState<number | null>(null);
  const [deleteCard, setDeleteCard] = useState(false);
  const [document, setDocument] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [url, setUrl] = useState<string>(
    document?.url || "https://"
  );

  const [paymentBlocks, setPaymentBlocks] = useState<{
    title: string;
    price: string;
    btnType: string;
    uploadedDocuments: any[];
    attachments?: Array<{
      type: 'file' | 'link';
      name: string;
      url: string;
      date: string;
    }>;
  }[]>([
    {
      title: "30%",
      price: "3,000,000.00",
      btnType: "Request",
      uploadedDocuments: [{ id: uuidv4() }],
      attachments: []
    },
  ]);

  const [attachments, setAttachments] = useState<Array<{
    type: 'file' | 'link';
    name: string;
    url: string;
    date: string;
  }>>([]);

  const [showReciptDialog, setShowReciptDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreatePaymentClick = () => {
    const newBlock = {
      title: "0%",
      price: "0.00",
      btnType: "Create",
      uploadedDocuments: [{ id: uuidv4() }],
    };
    setPaymentBlocks([...paymentBlocks, newBlock]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setDocument({ name: file.name, url });
      setRequestPaymentDialog(false);
      setConfirmPaymentDocDialog(true);
    }
  };
  const handleAddLink = () => {
    if (url.trim()) {
      const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
      
      setAttachments(prev => [...prev, { 
        type: 'link', 
        name: url.trim(), // Use URL as name
        url: url.trim(),
        date: currentDate
      }]);
      setUrl('');
      setConfirmPaymentDocDialog(false);
      setRequestPaymentDialog(true);
    }
  };
   const handleButtonClick = () => {
     if (fileInputRef.current) {
       fileInputRef.current.click();
     }
   };

   const handleRemovePaymentBlock = (index: number | null) => {
     setPaymentBlocks((prevBlocks) => prevBlocks.filter((_, i) => i !== index));
   };

   const handlePaymentBtnClick = (btnType: string, index: number) => {
     if (btnType === "Create") {
       setPaymentBlocks((prevBlocks) => {
         const newBlocks = [...prevBlocks];
         newBlocks[index] = {
           ...newBlocks[index],
           btnType: "Request",
         };
         return newBlocks;
       });
     } else if (btnType === "Request") {
       setRequestPaymentDialog(true);
     } else if (btnType === "Paid") {
       setShowReciptDialog(true);
     }
   };
   const handleConfirmAttachment = () => {
    if (document) {
      const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
      
      setAttachments(prev => [...prev, { 
        type: 'file', 
        name: document.name, 
        url: document.url,
        date: currentDate
      }]);
      setDocument(null);
      setConfirmPaymentDocDialog(false);
      setRequestPaymentDialog(true);
    } else if (url.trim()) {
      const linkName = inputRef.current?.value || 'Link';
      setAttachments(prev => [...prev, { 
        type: 'link', 
        name: linkName, 
        url: url.trim(),
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric'
        })
      }]);
      setUrl('');
      setConfirmPaymentDocDialog(false);
      setRequestPaymentDialog(true);
    }
  };
  
  const handleConfirmPayement = () => {
    setPaymentBlocks((prevBlocks) => {
      const blocks = [...prevBlocks];
      blocks[selectedCardIndex] = {
        ...blocks[selectedCardIndex],
        btnType: "Paid",
        attachments: attachments // Save the attachments
      };
      return blocks;
    });
    setAttachments([]); // Clear attachments after saving
  };

   const handleUploadedDocuments = () => {
     setPaymentBlocks((prevs) => {
       const newBlocks = [...prevs];
       newBlocks[selectedCardIndex] = {
         ...newBlocks[selectedCardIndex],
         uploadedDocuments: [
           ...newBlocks[selectedCardIndex].uploadedDocuments,
           { id: uuidv4() },
         ],
       };
       return newBlocks;
     });
   };

   const handleRemovePaymentScreenshot = () => {
     setPaymentBlocks((prev) => {
       const blocks = [...prev];
       blocks[selectedCardIndex].uploadedDocuments = blocks[
         selectedCardIndex
       ].uploadedDocuments.filter((doc) => doc.id !== selectedReciptId);
       return blocks;
     });
   };

   const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     setUrl(event.target.value);
   };

   const handleUrlPaste = async () => {
     try {
       const pastedData = await navigator.clipboard.readText();
       setUrl(pastedData);
     } catch (error) {
       console.error("Failed to read clipboard contents: ", error);
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

         <div className="w-full h-fit gap-3 pl-0 md:pl-3 grid grid-cols-2 csm:grid-cols-3 xl:grid-cols-4">
           {/* add new payement */}
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
                   }`}
                   className="min-w-[50px] min-h-[50px]"
                 />
                 <input
                   className="text-[36px] hideScroll overflow-auto w-full leading-[20px] focus:text-cyan-1 resize-none font-pingfang text-[#cccccc] bg-transparent border-none outline-none"
                   placeholder={block.title}
                   autoFocus={index === paymentBlocks.length - 1}
                 />
               </div>
               <div className="flex justify-start items-center gap-2">
                 <p
                   className={`text-[#999999] text-[16px] font-pingfang uppercase`}
                 >
                   USD
                 </p>
                 <input
                   type="number"
                   className="text-[#999999] text-[16px] font-pingfang bg-transparent border-none outline-none w-full"
                   placeholder={block.price}
                 />
               </div>

               <button
                 onClick={() => {
                   setSelectedCardIndex(index);
                   handlePaymentBtnClick(block.btnType, index);
                 }}
                 className={`w-full h-[50px] ${
                   block.btnType === "Create" &&
                   "border-[#555555] active:border-[#00c8c8] active:text-[#00c8c8] hover:border-[#aaaaaa] bg-contract-bg text-[#aaaaaa]"
                 } 
                 ${
                   block.btnType === "Paid" &&
                   "bg-[#333333] border-[#333333] text-[#999999]"
                 }
                 ${block.btnType === "Request" && "bg-cyan-btn border-cyan-1"}
                 transition-all border-[1px] duration-300 font-pingfang rounded-[25px] text-[14px] font-normal `}
               >
                 {block.btnType}
               </button>

               {/* delete card ----> */}
               {index !== 0 && (
                 <button
                   onClick={() => {
                     setSelectedCardIndex(index);
                     setDeleteCard(true);
                   }}
                   className="group absolute right-4 top-2 cursor-pointer z-30"
                 >
                   <RxCross2 className="text-[20px] text-[#555555] group-active:text-cyan-1 duration-300 transition-all group-hover:text-[#777777]" />
                 </button>
               )}
             </div>
           ))}

           {/* create new payement */}
           <CreatePayement event={handleCreatePaymentClick} />
         </div>
       </div>
       {/* request payement dialog ----> */}
       <CustomDialog
 size="max-w-md"
 title="Do you send the invoice?"
 open={requestPaymentDialog}
 close={setRequestPaymentDialog}
>
  <div className="w-full flex flex-col">
    {/* Display attachments */}
    {attachments.length > 0 && (
      <div className="w-full mb-4">
        {attachments.map((attachment, index) => (
          <div key={index} className="flex items-center justify-between p-2 mb-2 border-[1px] border-[#777777] rounded-[10px]">
            <div className="flex items-center gap-2">
              {attachment.type === 'file' ? (
                <CgAttachment className="text-[18px] text-[#777] -rotate-45" />
              ) : (
                <RiLinksFill className="text-[18px] text-[#777]" />
              )}
              <span className="text-[12px] text-[#777777] font-pingfang truncate">
                {attachment.name}
              </span>
            </div>
            <button
              onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
              className="text-[#777777] hover:text-[#ff1d1d]"
            >
              <RxCross2 className="text-[18px]" />
            </button>
          </div>
        ))}
      </div>
    )}

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
          setConfirmPaymentDocDialog(true);
          setRequestPaymentDialog(false);
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
    {/* ... rest of the dialog content ... */}
    {/* Add final Yes/Cancel buttons */}
    {attachments.length > 0 && (
      <div className="w-full mt-4 flex justify-between items-center">
        <button
          onClick={() => {
            handleConfirmPayement();
            setRequestPaymentDialog(false);
          }}
          className="w-[80px] h-[40px] text-[#00bb55] border-[1px] border-[#0B5] rounded-[20px] hover:border-[#00ff77] hover:text-[#00ff77]"
        >
          Yes
        </button>
        <button
          onClick={() => setRequestPaymentDialog(false)}
          className="w-[80px] h-[40px] text-[#777777] border-[1px] border-[#777777] rounded-[20px] hover:border-[#999999] hover:text-[#999999]"
        >
          Cancel
        </button>
      </div>
    )}
  </div>
</CustomDialog>
<CustomDialog
  size="max-w-md"
  title={document ? "Do you send the invoice?" : "Add Link"}
  open={confirmPaymentDocDialog}
  close={() => {
    setConfirmPaymentDocDialog(false);
    setRequestPaymentDialog(true);
    setUrl('');
    setDocument(null);
  }}
>
  <div className="w-full flex flex-col">
    {document ? (
      // File preview section
      <div className="w-full flex flex-col border-[1px] border-[#777777] rounded-[10px]">
        <div className="w-full flex justify-between items-center p-2">
          <div className="flex items-center gap-2">
            <CgAttachment className="text-[18px] text-[#777] -rotate-45" />
            <span className="text-[12px] text-[#777777] font-pingfang">
              {document.name}
            </span>
          </div>
          <button
            onClick={() => {
              setConfirmPaymentDocDialog(false);
              setRequestPaymentDialog(true);
              setDocument(null);
            }}
          >
            <RxCross2 className="text-[18px] text-[#777777] hover:text-[#ff1d1d]" />
          </button>
        </div>
        <div className="w-full h-[180px] bg-modal-bg rounded-b-[10px] relative">
          <img 
            src={document.url} 
            alt={document.name}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    ) : (
      <div className="w-full mb-4">
    <input
      type="url"
      value={url}
      onChange={handleUrlChange}
      placeholder="https://"
      className="w-full px-3 h-[40px] text-[14px] font-pingfang text-[#cccccc] bg-transparent border-[1px] border-[#777777] rounded-[10px] outline-none focus:border-[#999999]"
    />
  </div>
        
    )}
    <div className="w-full mt-4 flex justify-between items-center">
      <button
        onClick={document ? handleConfirmAttachment : handleAddLink}
        disabled={!document && !url.trim()}
        className="w-[80px] h-[40px] text-[#00bb55] border-[1px] border-[#0B5] rounded-[20px] hover:border-[#00ff77] hover:text-[#00ff77] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Yes
      </button>
      <button
        onClick={() => {
          setConfirmPaymentDocDialog(false);
          setRequestPaymentDialog(true);
          setUrl('');
          setDocument(null);
        }}
        className="w-[80px] h-[40px] text-[#777777] border-[1px] border-[#777777] rounded-[20px] hover:border-[#999999] hover:text-[#999999]"
      >
        Cancel
      </button>
    </div>
  </div>
</CustomDialog>
{showReciptDialog && paymentBlocks[selectedCardIndex] && (
  <CustomDialog
    size="max-w-md"
    open={showReciptDialog}
    close={setShowReciptDialog}
  >
    <div className="w-full flex gap-4 flex-col">
      {/* Display saved attachments */}
      {paymentBlocks[selectedCardIndex].attachments?.map((item, index) => (
        <div
          key={index}
          className="w-full flex flex-col border-[1px] border-[#777777] rounded-[10px]"
        >
          <div className="w-full flex justify-between items-center bg-transparent p-2">
            <div className="flex justify-center items-center gap-2">
              {item.type === 'file' ? (
                <CgAttachment className="text-[18px] text-[#777] -rotate-45" />
              ) : (
                <RiLinksFill className="text-[18px] text-[#777]" />
              )}
              <p className="text-[#777777] font-pingfang text-[12px]">
                {item.name}
              </p>
            </div>
            <div className="flex justify-center items-center gap-6">
              <p className="text-[12px] font-pingfang text-[#777777]">
                {item.date}
              </p>
              <button
                onClick={() => {
                  setDeleteAttachmentDialog(true);
                  setSelectedReciptId(index);
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
          {item.type === 'file' && (
            <div className="w-full h-[180px] group rounded-b-[10px] relative bg-modal-bg">
              <img 
                src={item.url} 
                alt={item.name}
                className="w-full h-full object-contain"
              />
              <div className="w-full absolute bottom-0 bg-[#333333]/80 group-hover:bg-[#333333] transition-all duration-300 px-3 py-2 flex justify-between items-center rounded-b-[10px]">
                <button className="text-[#cccccc] text-[12px] font-pingfang border-[1px] border-[#777777] rounded-[10px] px-3 py-1 hover:border-[#999999] hover:text-[#ffffff] transition-all duration-300">
                  Replace
                </button>
                <div className="flex justify-center items-center gap-4">
                  <button className="hover:opacity-80 transition-all duration-300">
                    <img
                      src="/printer.png"
                      className="w-[24px] h-[24px] cursor-pointer"
                      alt="Print"
                    />
                  </button>
                  <button className="hover:opacity-80 transition-all duration-300">
                    <img
                      src="/download.png"
                      className="w-[24px] h-[24px] cursor-pointer"
                      alt="Download"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

          {/* Attachment buttons */}
          <div className="w-full mt-2 grid gap-2 grid-cols-[1fr,30px]">
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
              onChange={handleUploadedDocuments}
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div>

          <button
            onClick={() => setShowReciptDialog(false)}
            className="w-full mt-2 h-[40px] text-[#777777] text-[14px] font-pingfang border-[1px] border-[#777777] rounded-[20px]"
          >
            OK
          </button>
        </div>
      </CustomDialog>
    )}
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
      {/* delete paymentCard ---->   */}
      <CustomDialog size="max-w-md" open={deleteCard} close={setDeleteCard}>
        <div className="w-full flex flex-col">
          <p className="text-[16px] font-pingfang text-[#cccccc]">
            Do you want to delete this payement card?
          </p>
          {/* buttons  */}
          <div className="w-full mt-10 flex justify-between items-center">
            <button
              onClick={() => {
                handleRemovePaymentBlock(selectedCardIndex);
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
    </React.Fragment>
  );
};

export default Payment;
