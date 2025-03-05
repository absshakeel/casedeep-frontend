import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import * as Icons from "../../../../Svg/Icons";
import CustomDialog from "../../../shared/Ui/CustomDialog";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setContractInfo } from '../../../../store/slices/userSlice';
import { useUserRedux } from '../../../../hooks/useUserRedux';

const Contract: React.FC = () => {
  const dispatch = useDispatch();
  const contractInfo = useSelector((state) => state.user.contractInfo);
  const [articles, setArticles] = useState(contractInfo?.articles || [
    {
      id: "1",
      title: "SERVICES",
      des: "The Provider agrees to deliver the se...",
    },
    {
      id: "2",
      title: "PAYMENT",
      des: "The Client agrees to compensate th...",
    },
    {
      id: "3",
      title: "DELIVERABLES",
      des: "The Provider shall deliver the deliver...",
    },
    {
      id: "4",
      title: "RESPONSIBILITIES",
      des: "The Provider shall perform the Servi...",
    },
    {
      id: "5",
      title: "INDEMNIFICATION",
      des: "Each party agrees to indemnify, defe...",
    },
    {
      id: "6",
      title: "CONFIDENTIALITY",
      des: "Both parties agree to maintain the c...",
    },
    {
      id: "7",
      title: "TERMINATION",
      des: "This Contract may be terminated by ...",
    },
  ]);

  //   stats ------------->
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [deleteArticle, setDeleteArticle] = useState(false);
  const { activeStep2, setActiveStep2 } = useUserRedux();

  // Update Redux store whenever articles change
  React.useEffect(() => {
    dispatch(setContractInfo({ articles }));
  }, [articles, dispatch]);
  const [editedArticle, setEditedArticle] = useState<{
    title: string;
    des: string;
  } | null>(null);
  const [articleButtonStatus, setArticleButtonStatus] = useState("generate");

  // functions --------->

  const handleArticleClick = (index: number) => {
    setSelectedIndex(index);
    setEditedArticle({
      title: articles[index].title,
      des: articles[index].des,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "title" | "des"
  ) => {
    if (editedArticle) {
      setEditedArticle({
        ...editedArticle,
        [field]: e.target.value,
      });
    }
  };

  const handleSaveChanges = () => {
    if (selectedIndex !== null && editedArticle) {
      const updatedArticles = [...articles];
      updatedArticles[selectedIndex] = {
        ...updatedArticles[selectedIndex],
        ...editedArticle,
      };
      setArticles(updatedArticles);
      setSelectedIndex(null);
      setEditedArticle(null);
    }
  };

  const handleAddArticle = () => {
    const newArticle = {
      id: String(articles.length + 1),
      title: "New Article",
      des: "Article Content",
    };
    setArticles((prevArticles) => {
      const updatedArticles = [...prevArticles, newArticle];
      // Open the new article for editing
      setSelectedIndex(updatedArticles.length - 1);
      setEditedArticle({ title: newArticle.title, des: newArticle.des });
      return updatedArticles;
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(articles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setArticles(items);
    setEditedArticle(null);
    setSelectedIndex(null);
  };

  const handleRemoveArticle = (index: number | null) => {
    setArticles((prevArticles) => {
      const updatedArticles = prevArticles.filter((_, i) => i !== index);
      if (selectedIndex === index) {
        setSelectedIndex(null);
        setEditedArticle(null);
      }
      return updatedArticles;
    });
  };

  const handleArticleButtonClick = () => {
    if (articleButtonStatus === "generate") {
      setArticleButtonStatus("stop");
    } else if (articleButtonStatus === "stop") {
      setArticleButtonStatus("edit");
    } else if (articleButtonStatus === "edit") {
      setArticleButtonStatus("save");
    } else if (articleButtonStatus === "save") {
      setArticleButtonStatus("generate");
    }
  };

  // open contract pdf ---->
  const handleOpenPDF = () => {
    const pdfUrl = "/contract.pdf";
    window.open(pdfUrl, "_blank");
  };

  const handleBackClick = () => {
    if (selectedIndex === null) {
      setActiveStep2(-1);
    } else {
      setSelectedIndex(null);
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
              {selectedIndex === null ? "Confirmation" : ""}
            </p>
          </button>

          <img src="/trumb4.webp" className="w-[40px] h-[40px]" alt="" />
        </div>

        <div className="w-full col-span-2 grid gap-5 csm2:gap-2 grid-cols-1 cmd:grid-cols-2">
          {/* Contract Preview Section */}
          <div className="w-full hidden cmd:flex flex-col gap-[2px]">
            <div className="w-full grid grid-cols-2 gap-4 csm:gap-8 p-4 rounded-[8px] bg-contract-bg">
              {/* Contract Preview Button with Hover Effects */}
              <button 
                onClick={handleOpenPDF} 
                className="w-full h-full group relative cursor-pointer"
              >
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                  {/* Center View text */}
                  <span className="text-[20px] text-white font-pingfang">View</span>
                  
                  {/* Bottom right page number */}
                  <div className="absolute bottom-1  bg-white/90 px-2 py-1">
                    <span className="text-[14px] bold text-black font-pingfang block">2 </span>
                    <span className="text-[14px]  text-black font-pingfang">PAGE</span>
                  </div>
                </div>
                <img
                  src="/contract2.png"
                  className="w-full object-cover h-full group-hover:brightness-90 group-active:brightness-75 transition-all duration-200"
                  alt=""
                />
              </button>

              <div className="w-full flex justify-center items-center flex-col gap-1">
                {contractDetails.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full flex justify-center items-center flex-col gap-[2px]"
                    >
                      <p className="text-[10px] text-[#777777] font-pingfang">
                        {item.name}
                      </p>
                      <p className="text-[14px] text-[#999999] font-pingfang">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
                {/* signature btn ----> */}
                <button 
                  className="w-full flex justify-center items-center text-black-1 text-[14px] font-pingfang mt-3 max-w-[150px] h-[50px] rounded-[25px] bg-gradient-to-b from-[#ffa950] to-[#ff9527] hover:from-[#ffa950]/90 hover:to-[#ff9527]/90 active:from-[#ffa950]/75 active:to-[#ff9527]/75 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Signature
                </button>
              </div>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="articles">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="w-full flex flex-col gap-[2px]"
                  >
                    {articles.map((art, index) => {
                      const isSelected = selectedIndex === index;
                      return (
                        <Draggable
                          key={art.id}
                          draggableId={art.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={index}
                              onClick={() => handleArticleClick(index)}
                              className={`w-full flex justify-between items-center ${
                                isSelected
                                  ? "border-[#777777]"
                                  : "border-transparent"
                              } rounded-[8px] border-[1px] h-fit bg-[#222222] px-3 py-2`}
                            >
                              <div className="flex cursor-pointer justify-center items-center gap-3">
                                <p className="text-base text-[#555555] font-pingfang">
                                  {index + 1}
                                </p>
                                <div className="flex flex-col gap-[2px]">
                                  <p className="text-[16px] uppercase text-[#cccccc] font-pingfang font-normal">
                                    {art.title}
                                  </p>
                                  <p className="text-[18px] w-[250px] csm:w-[220px] lg:w-[270px] xl:w-[310px] truncate text-[#777777] font-pingfang">
                                    {art.des}
                                  </p>
                                </div>
                              </div>
                              <button
                                className="group"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteArticle(true);
                                  setSelectedIndex(index);
                                }}
                              >
                                <Icons.CrossIcon
                                  className="w-[20px] h-[20px]"
                                  fill="fill-[#555555] group-active:opacity-50 group-hover:fill-[#ff1d1d] transition-all duration-200"
                                />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {/* add new article */}
            <button
              onClick={handleAddArticle}
              className="w-full mt-2 group active:border-cyan-1 gap-1 h-[40px] hover:border-[#777777] border-[1px] transition-all duration-200 border-[#333333] rounded-[8px] flex justify-start px-4 items-center"
            >
              <AiOutlinePlus className="text-[21px] group-active:text-cyan-1 text-[#555555]" />
              <p className="text-[#555555] group-active:text-cyan-1 text-[12px] font-pingfang">
                Add Article
              </p>
            </button>
          </div>

          {/* for small screen ----> */}
          {selectedIndex === null && (
            <div className="w-full flex cmd:hidden flex-col gap-[2px]">
              {/* contract ---------> */}
              <div className="w-full grid grid-cols-2 gap-4 csm:gap-8 p-4 rounded-[8px] bg-contract-bg">
                <button onClick={handleOpenPDF} className="w-full h-full">
                  <img
                    src="/contract2.png"
                    className="w-full object-cover h-full"
                    alt=""
                  />
                </button>
                <div className="w-full flex justify-center items-center flex-col gap-1">
                  {contractDetails.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex justify-center items-center flex-col gap-[2px]"
                      >
                        <p className="text-[10px] text-[#777777] font-pingfang">
                          {item.name}
                        </p>
                        <p className="text-[14px] text-[#999999] font-pingfang">
                          {item.value}
                        </p>
                      </div>
                    );
                  })}
                  {/* signature btn ----> */}
                  <button className="w-full text-black-1 text-[14px] font-pingfang mt-3 max-w-[150px] h-[50px] rounded-[25px] bg-cyan-btn hover:bg-cyan-btn/90 active:bg-cyan-btn/75 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Signature
                  </button>
                </div>
              </div>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="articles">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="w-full flex flex-col gap-[2px]"
                    >
                      {articles.map((art, index) => {
                        const isSelected = selectedIndex === index;
                        return (
                          <Draggable
                            key={art.id}
                            draggableId={art.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                key={index}
                                onClick={() => handleArticleClick(index)}
                                className={`w-full flex justify-between items-center ${
                                  isSelected
                                    ? "border-[#777777]"
                                    : "border-transparent"
                                } rounded-[8px] border-[1px] h-fit bg-[#222222] px-3 py-2`}
                              >
                                <div className="flex cursor-pointer justify-center items-center gap-3">
                                  <p className="text-base text-[#555555] font-pingfang">
                                    {index + 1}
                                  </p>
                                  <div className="flex flex-col gap-[2px]">
                                    <p className="text-[16px] uppercase text-[#cccccc] font-pingfang font-normal">
                                      {art.title}
                                    </p>
                                    <p className="text-[18px] w-[250px] csm:w-[220px] lg:w-[270px] xl:w-[310px] truncate text-[#777777] font-pingfang">
                                      {art.des}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  className="group"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteArticle(true);
                                    setSelectedIndex(index);
                                  }}
                                >
                                  <Icons.CrossIcon
                                    className="w-[20px] h-[20px]"
                                    fill="fill-[#555555] group-active:opacity-50 group-hover:fill-[#ff1d1d] transition-all duration-200"
                                  />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              {/* add new article */}
              <button
                onClick={handleAddArticle}
                className="w-full mt-2 group active:border-cyan-1 gap-1 h-[40px] hover:border-[#777777] border-[1px] transition-all duration-200 border-[#333333] rounded-[8px] flex justify-start px-4 items-center"
              >
                <AiOutlinePlus className="text-[21px] group-active:text-cyan-1 text-[#555555]" />
                <p className="text-[#555555] group-active:text-cyan-1 text-[12px] font-pingfang">
                  Add Article
                </p>
              </button>
            </div>
          )}
          {/* edit articles -----------------> */}
          {editedArticle && selectedIndex !== null &&  (
            <div className="w-full flex flex-col">
              <div className="w-full bg-cyan-1 px-3 rounded-t-[8px] min-h-[46px] flex justify-start items-center">
                {editedArticle && (
                  <input
                    type="text"
                    value={editedArticle.title}
                    onChange={(e) => handleInputChange(e, "title")}
                    className="w-full text-[16px] uppercase text-black-1 font-pingfang bg-transparent focus:outline-none py-2"
                    placeholder="Title"
                  />
                )}
              </div>
              <div className="w-full min-h-[280px] rounded-b-[8px] bg-[#222222] px-3">
                {editedArticle && (
                  <textarea
                    value={editedArticle.des}
                    onChange={(e) => handleInputChange(e, "des")}
                    className="w-full text-[16px] min-h-full resize-none focus:outline-none text-[#777777] font-pingfang bg-transparent py-2"
                    placeholder="Article Content"
                    rows={4}
                  />
                )}
              </div>

              <button
                onClick={handleSaveChanges}
                className="min-h-[76px] max-w-[200px] mt-3 w-full mx-auto bg-cyan-1 rounded-[80px] flex justify-center items-center"
              >
                <p className="text-[20px] font-pingfang text-black-1">OK</p>
              </button>
            </div>
          )}

          {/* generate + stop + edit + save button -------> */}
          {selectedIndex !== null && (
            <div className="w-full flex justify-center items-center flex-col gap-2">
              <button
                onClick={handleArticleButtonClick}
                className={`w-full ${
                  articleButtonStatus === "stop" && "bg-dark-orange-btn"
                } ${articleButtonStatus === "generate" && "bg-cyan-btn"} 
              
              ${
                (articleButtonStatus === "stop" ||
                  articleButtonStatus === "save") &&
                "bg-orange-btn"
              }
              text-black-1 bg-cyan-btn text-[20px] font-pingfang p-2 rounded-[10px]`}
              >
                {articleButtonStatus === "generate" && "Generate"}
                {articleButtonStatus === "stop" && "Stop"}
                {articleButtonStatus === "edit" && "Edit"}
                {articleButtonStatus === "save" && "Save"}
              </button>
              <button className="w-full p-2  text-[14px] active:opacity-50 transition-all duration-300 font-pingfang text-[#aaaaaa] h-[50px] hover:bg-black-grad hover:text-[#c5c5c5] bg-[#252525] rounded-[10px]">
                Skip Contract
              </button>
            </div>
          )}
        </div>
      </div>
      {/* delete the contract ---->   */}
      <CustomDialog
        size="max-w-md"
        open={deleteArticle}
        close={setDeleteArticle}
      >
        <div className="w-full flex flex-col">
          <p className="text-[16px] font-pingfang text-[#cccccc]">
            Do you want to delete this contract?
          </p>
          {/* buttons  */}
          <div className="w-full mt-10 flex justify-between items-center">
            <button
              onClick={() => {
                handleRemoveArticle(selectedIndex);
                setDeleteArticle(false);
              }}
              className="w-[80px] h-[40px] border-[1px] border-[#ff1d1d] text-[#ff1d1d] text-[14px] font-pingfang rounded-[20px]"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setDeleteArticle(false);
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

export default Contract;

const contractDetails = [
  {
    name: "Contract Number",
    value: "OR2329032168",
  },
  {
    name: "Generation Time",
    value: "Jun 16, 2025",
  },
  {
    name: "Signature Time",
    value: "Jun 16, 2025",
  },
  {
    name: "Modification Time",
    value: "Jun 16, 2025",
  },
];
