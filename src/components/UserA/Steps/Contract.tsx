//@ts-nocheck

import React, { useState } from "react";
import * as Icons from "../../../Svg/Icons";
import { AiOutlinePlus } from "react-icons/ai";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CustomDialog from "../../shared/Ui/CustomDialog";
import { useDispatch, useSelector } from 'react-redux';
import { setContractInfo } from '../../../store/slices/userSlice';
import { useUserRedux } from '../../../hooks/useUserRedux';
import { IoIosArrowBack } from "react-icons/io";

const Contract: React.FC = () => {
  // data
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
  ]);

  // Update Redux store whenever articles change
  React.useEffect(() => {
    dispatch(setContractInfo({ articles }));
  }, [articles, dispatch]);

  //   stats ------------->  
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { activeStep2, setActiveStep2 } = useUserRedux();
  const [deleteArticle, setDeleteArticle] = useState(false);
  const [editedArticle, setEditedArticle] = useState<{
    title: string;
    des: string;
  } | null>(null);

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
    setSelectedIndex(null); // Close the sub-items when dragging
  };

  const handleRemoveArticle = (index: number) => {
    setArticles((prevArticles) => {
      const updatedArticles = prevArticles.filter((_, i) => i !== index);
      if (selectedIndex === index) {
        setSelectedIndex(null);
        setEditedArticle(null);
      }
      return updatedArticles;
    });
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
              {selectedIndex === null ? "Contract" : ""}
            </p>
          </button>

          <img src="/trumb4.webp" className="w-[40px] h-[40px]" alt="" />
        </div>
        <div className="w-full grid gap-5 csm2:gap-2 grid-cols-1 cmd:grid-cols-2">
          {/* articles -------------------> */}
          <div className="w-full hidden cmd:flex flex-col gap-3">
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
                              } rounded-[8px] border-[1px] relative h-fit bg-[#222222] px-3 py-2`}
                            >
                              <div className="flex cursor-pointer justify-center items-center gap-3">
                                <p className="text-base text-[#555555] font-pingfang">
                                  {index + 1}
                                </p>
                                <div className="flex flex-col gap-[2px]">
                                  <p className="text-[16px] uppercase text-[#cccccc] font-pingfang font-normal">
                                    {art.title}
                                  </p>
                                  <p className="text-[18px] w-[200px] sm:w-[400px] csm2:w-[230px] lg:w-[270px] truncate text-[#777777] font-pingfang">
                                    {art.des}
                                  </p>
                                </div>
                              </div>
                              <button
                                className="group"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedIndex(index);
                                  setDeleteArticle(true);
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
              className="w-full group active:border-cyan-1 gap-1 h-[40px] hover:border-[#777777] border-[1px] transition-all duration-200 border-[#333333] rounded-[8px] flex justify-start px-4 items-center"
            >
              <AiOutlinePlus className="text-[21px] group-active:text-cyan-1 text-[#555555]" />
              <p className="text-[#555555] group-active:text-cyan-1 text-[12px] font-pingfang">
                Add Article
              </p>
            </button>
          </div>

          {/* articles for small screen */}
          {selectedIndex === null && (
            <div className="w-full flex cmd:hidden flex-col gap-3">
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
                                } rounded-[8px] border-[1px] relative h-fit bg-[#222222] px-3 py-2`}
                              >
                                <div className="flex cursor-pointer justify-center items-center gap-3">
                                  <p className="text-base text-[#555555] font-pingfang">
                                    {index + 1}
                                  </p>
                                  <div className="flex flex-col gap-[2px]">
                                    <p className="text-[16px] uppercase text-[#cccccc] font-pingfang font-normal">
                                      {art.title}
                                    </p>
                                    <p className="text-[18px] w-[200px] sm:w-[400px] csm2:w-[230px] lg:w-[270px] truncate text-[#777777] font-pingfang">
                                      {art.des}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  className="group"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedIndex(index);
                                    setDeleteArticle(true);
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
                className="w-full group active:border-cyan-1 gap-1 h-[40px] hover:border-[#777777] border-[1px] transition-all duration-200 border-[#333333] rounded-[8px] flex justify-start px-4 items-center"
              >
                <AiOutlinePlus className="text-[21px] group-active:text-cyan-1 text-[#555555]" />
                <p className="text-[#555555] group-active:text-cyan-1 text-[12px] font-pingfang">
                  Add Article
                </p>
              </button>
            </div>
          )}
          {/* edit articles -----------------> */}

          {editedArticle && selectedIndex !==null &&  (
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
                    className="w-full text-[16px] min-h-[440px] resize-none focus:outline-none text-[#777777] font-pingfang bg-transparent py-2"
                    placeholder="Article Content"
                    rows={4}
                  />
                )}
              </div>

              <button
                onClick={handleSaveChanges}
                className="p-2 mt-3 w-full mx-auto bg-cyan-1 rounded-[10px] flex justify-center items-center"
              >
                <p className="text-[20px] font-pingfang text-black-1">Save</p>
              </button>
            </div>
          )}
        </div>
        {/* delete this articel ---->   */}
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
      </div>
    </React.Fragment>
  );
};

export default Contract;
