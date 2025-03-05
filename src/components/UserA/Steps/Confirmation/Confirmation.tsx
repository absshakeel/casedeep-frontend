//@ts-nocheck

import React, { useState, useRef, useEffect, useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import * as Icons from "../../../../Svg/Icons";
import { AiOutlinePlus } from "react-icons/ai";
import CustomVideoPlayer from "../../../WebTopPick/VideoPlayer";
import { IoIosArrowBack } from "react-icons/io";
import { useUserRedux } from "../../../../hooks/useUserRedux";
import Description from "./Description";
import Discount from "./Discount";
import Delivery from "./Delivery";
import Payment from "./Payment";

const Confirmation: React.FC = () => {
  const acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "audio/mp3", 
    "model/vnd.fbx",
    "model/obj",
    "model/gltf-binary",
    "model/gltf+json",
  ];


  const [currentLanguage, setCurrentLanguage] = useState('en');
  const getDefaultUnit = (lang: string = 'en') => {
    const unitMap = {
      en: 'pcs',
      es: 'ud.',
      ja: '個',
      zh: '个'
    };
    return unitMap[lang] || unitMap.en;
  };
  // data ------------------->
  const [listData, setListData] = useState<ListItem[]>([
    {
      id: "1",
      title: "Description/Reference",
      des: "No setting/Yes",
      subOptions: ["Multi-select", "Default First", "Grid View"],
      selectedMainButton: null,

      subItems: [
        {
          id: "2-1",
          title: "Decision after further discussion",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          quantity: "0",
          price: "0",
          isEditing: false,
          isNew: false,
        },
        {
          id: "2-2",
          title: "Flooring",
          quantity: "2.5 Kg",
          price: "1,200",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
        {
          id: "2-3",
          title: "Paint on interior walls A1529-D21",
          quantity: "9 mlsa",
          price: "200",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
        {
          id: "2-4",
          title: "Paint on interior walls A1529-D21",
          quantity: "0",
          price: "200",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
        {
          id: "2-5",
          title: "Wallpapers",
          quantity: "99999",
          price: "peace",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
      ],
    },
    {
      id: "2",
      title: "Payment Method",
      des: "Selected by the customer/Fixed",
      subOptions: ["Multi-select", "Default First", "Grid View"],
      selectedMainButton: null,

      subItems: [
        {
          id: "3-1",
          title: "Decision after further discussion",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          quantity: "0",
          price: "0",
          isEditing: false,
          isNew: false,
        },
        {
          id: "3-2",
          title: "Flooring",
          quantity: "2.5 Kg",
          price: "1,200",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
        {
          id: "3-3",
          title: "Paint on interior walls A1529-D21",
          quantity: "9 mlsa",
          price: "200",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
        {
          id: "3-4",
          title: "Paint on interior walls A1529-D21",
          quantity: "0",
          price: "200",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
        {
          id: "3-5",
          title: "Wallpapers",
          quantity: "99999",
          price: "peace",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
      ],
    },
    {
      id: "3",
      title: "Delivery Date",
      des: "Selected by the customer/Fixed",
      subOptions: ["Multi-select", "Default First", "Grid View"],
      selectedMainButton: null,

      subItems: [
        {
          id: "4-1",
          title: "Decision after further discussion",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          quantity: "0",
          price: "0",
          isEditing: false,
          isNew: false,
        },
        {
          id: "4-2",
          title: "Flooring",
          quantity: "2.5 Kg",
          price: "1,200",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
        {
          id: "4-3",
          title: "Paint on interior walls A1529-D21",
          quantity: "9 mlsa",
          price: "100",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
        {
          id: "4-4",
          title: "Paint on interior walls A1529-D21",
          quantity: "0",
          price: "150",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
        {
          id: "4-5",
          title: "Wallpapers",
          quantity: "9999",
          price: "peace",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
      ],
    },
    {
      id: "4",
      title: "Discount Setting",
      des: "No setting/Yes",
      subOptions: ["Multi-select", "Default First", "Grid View"],
      selectedMainButton: null,

      subItems: [
        {
          id: "5-1",
          title: "Decision after further discussion",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          quantity: "0",
          price: "0",
          isEditing: false,
          isNew: false,
        },
        {
          id: "5-2",
          title: "Flooring",
          quantity: "2.5 Kg",
          price: "1,200",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
        {
          id: "5-3",
          title: "Paint on interior walls A1529-D21",
          quantity: "9 mlsa",
          price: "200",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
        {
          id: "5-4",
          title: "Paint on interior walls A1529-D21",
          quantity: "0",
          price: "200",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
        {
          id: "5-5",
          title: "Wallpapers",
          quantity: "99999",
          price: "peace",
          selectedSubButton: null,
          showQuantity: false,
          showPrice: false,
          isEditing: false,
          isNew: false,
        },
      ],
    },
  ]);

  const [gridViewData, setGridViewData] = useState([
    { name: "Japanese style", selected: false },
    { name: "Scandinavian style", selected: false },
    { name: "Classical style", selected: false },
    { name: "Others", selected: false },
  ]);

  //   states ------------------>
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const [editableItemIndex, setEditableItemIndex] = useState<number | null>(
    null
  );
  const [editedSubItemIndex, setEditedSubItemIndex] = useState<number | null>(
    null
  );
  const { activeStep2, setActiveStep2 } = useUserRedux();
  const [editingInputId, setEditingInputId] = useState(null);
  const [isAddInputClicked, setIsAddInputClicked] = useState(false);
  const [selectedSubItems, setSelectedSubItems] = useState({});
  const [editedSubItemId, setEditedSubItemId] = useState<string | null>(null);
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const quantityInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>(
    {}
  );
  const priceInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const [uploadedSubitemFiles, setUploadedSubitemFiles] = useState<{
    [key: string]: File[];
  }>({});
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [mainItemOption, setMainItemOption] = useState<string | null>(null);
  const [editingQuantity, setEditingQuantity] = useState(null);
  const [editingPrice, setEditingPrice] = useState(null);
  const textareaRef = useRef(null);
  const [countingValues, setCountingValues] = useState<{
    [key: string]: string;
  }>({});

  // functions -------->

  const handleMainListButtonClick = (itemId: string, buttonOption: string) => {
    setListData((prevListData) =>
      prevListData.map((item) => {
        if (item.id === itemId) {
          // Set the selected button and select the first sub-item if "Default First" is chosen
          const updatedItem = { ...item, selectedButton: buttonOption };
          if (buttonOption === "Default First" && updatedItem.subItems.length) {
            updatedItem.selectedSubItems = [updatedItem.subItems[0].id];
          } else if (buttonOption === "Multi-select") {
            updatedItem.selectedSubItems = []; // Reset for multi-select
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleSubButtonClick = (
    mainItemId: string,
    subItemId: string,
    buttonOption: string
  ) => {
    setListData((prevListData) =>
      prevListData.map((item) =>
        item.id === mainItemId
          ? {
              ...item,
              subItems: item.subItems.map((subItem) =>
                subItem.id === subItemId
                  ? {
                      ...subItem,
                      selectedSubButton: buttonOption,
                      showQuantity:
                        buttonOption === "Quantity"
                          ? !subItem.showQuantity
                          : subItem.showQuantity,
                      showPrice:
                        buttonOption === "Unit"
                          ? !subItem.showPrice
                          : subItem.showPrice,
                      // Set default unit when enabling Unit button
                      price: buttonOption === "Unit" && !subItem.showPrice 
                        ? getDefaultUnit(currentLanguage)
                        : subItem.price
                    }
                  : subItem
              ),
            }
          : item
      )
    );

    if (buttonOption === "Quantity" && quantityInputRefs.current[subItemId]) {
      setTimeout(() => quantityInputRefs.current[subItemId]?.focus(), 0);
    }
    if (buttonOption === "Unit" && priceInputRefs.current[subItemId]) {
      setTimeout(() => priceInputRefs.current[subItemId]?.focus(), 0);
    }
  };

  const handleEditClick = (index: number) => {
    if (editableItemIndex === index) {
      setEditableItemIndex(null);
    } else {
      setEditableItemIndex(index);
      setEditedTitle(listData[index].title);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(listData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setListData(items);
    setSelectedItemIndex(null); // Close the sub-items when dragging
  };

  const handleSubItemDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (selectedItemIndex === null || !listData[selectedItemIndex]) {
      return;
    }

    const currentSubItems = [...listData[selectedItemIndex].subItems];

    const [movedSubItem] = currentSubItems.splice(source.index, 1);
    currentSubItems.splice(destination.index, 0, movedSubItem);

    const updatedListData = [...listData];
    updatedListData[selectedItemIndex] = {
      ...updatedListData[selectedItemIndex],
      subItems: currentSubItems,
    };

    setListData(updatedListData);
  };

  const handleSubItemFileChange =
    (subItemId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file && acceptedFileTypes.includes(file.type)) {
        setUploadedSubitemFiles((prev) => {
          const updatedFiles = prev[subItemId]
            ? [...prev[subItemId], file]
            : [file];

          // Automatically get the file URL for preview after inserting
          const fileURL = URL.createObjectURL(file);

          // Download the file when the button is clicked again (third click)
          if (prev[subItemId] && prev[subItemId].length > 0) {
            const link = document.createElement("a");
            link.href = fileURL;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }

          return { ...prev, [subItemId]: updatedFiles };
        });
      } else {
        alert("Unsupported file type. Please select a valid file.");
      }
    };
    const handleSubItemInputChange = (inputIndex, field, value) => {
      if (selectedItemIndex === null) return;
    
      setListData((prevData) => {
        const updatedListData = [...prevData];
        const selectedNode = updatedListData[selectedItemIndex];
    
        if (!selectedNode.inputs) {
          selectedNode.inputs = [];
        }
    
        // Ensure the input exists
        if (!selectedNode.inputs[inputIndex]) {
          selectedNode.inputs[inputIndex] = { id: (inputIndex + 1).toString(), label: "", value: "" };
        }
    
        // Update the specific input's field
        selectedNode.inputs[inputIndex][field] = value;
    
        // Update title when label changes
        if (field === 'label') {
          selectedNode.title = value || "New Option";
        }
    
        // Update description with all non-empty values
        const allValues = selectedNode.inputs
          .map(input => input.value)
          .filter(Boolean);
        selectedNode.des = allValues.length > 0 ? allValues.join(' | ') : "Add Inputs";
    
        return updatedListData;
      });
    };

  const handleItemClick = (index: number) => {
    setSelectedItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const addNewInputOption = () => {
    setIsAddInputClicked(true);
    const newOption = {
      id: (listData.length + 1).toString(),
      title: "New Option",
      des: "Add Inputs",
      subOptions: [],
      subItems: [],
      inputs: [{
        id: '1',
        label: "New Option",
        value: ""
      }],
      isEditing: false,
    };
  
    setListData([newOption, ...listData]);
    setSelectedItemIndex(0);
   
  };
  const renderUploadedFile = (subItemId: string) => {
    const files = uploadedSubitemFiles[subItemId];
    if (!files || files.length === 0) return null;
  
    return files.map((file, index) => {
      const fileURL = URL.createObjectURL(file);
  
      if (file.type.startsWith("image/")) {
        return (
          <img
            key={index}
            src={fileURL}
            alt="Uploaded"
            className="w-full object-fill h-auto rounded-[8px]"
          />
        );
      } else if (file.type === "video/mp4") {
        return (
          <div className="w-full">
            <CustomVideoPlayer src={fileURL} isCloseIcon={false} />
          </div>
        );
      } else if (file.type === "audio/mp3") {
        return (
          <audio key={index} controls className="w-full mb-2">
            <source src={fileURL} type="audio/mp3" />
            Your browser does not support the audio tag.
          </audio>
        );
      } else {
        return (
          <div key={index} className="mb-2">
            <p className="text-[#cccccc]">File uploaded: {file.name}</p>
            <a
              href={fileURL}
              download={file.name}
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Download File
            </a>
          </div>
        );
      }
    });
  };

  const handleSubItemEditClick = (index: number) => {
    setEditedSubItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const addNewOption = () => {
    const newOption = {
      id: (listData.length + 1).toString(),
      title: "New option name",
      des: "Single Select Menu",
      subOptions: ["Multi-select", "Default First", "Grid View"],
      subItems: [
        {
          id: `${listData.length + 1}-1`,
          title: "Decision after further discussion",
          quantity: "0",
          price: "0",
        },
        {
          id: `${listData.length + 1}-2`,
          title: "Flooring",
          quantity: "2.5 Kg",
          price: "1,200",
        },
        {
          id: `${listData.length + 1}-3`,
          title: "Paint on interior walls A1529-D21",
          quantity: "9 mlsa",
          price: "200",
        },
        {
          id: `${listData.length + 1}-4`,
          title: "Paint on interior walls A1529-D21",
          quantity: "0",
          price: "200",
        },
        {
          id: `${listData.length + 1}-5`,
          title: "Wallpapers",
          quantity: "99999",
          price: "peace",
        },
      ],
    };

    // Insert new option at the top
    setListData([newOption, ...listData]);
    setEditableItemIndex(0);
    setEditedTitle(newOption.title);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
    const newListData = [...listData];
    if (editableItemIndex !== null) {
      newListData[editableItemIndex].title = event.target.value;
      setListData(newListData);
    }
  };

  const addInputToExistingNode = () => {
    if (selectedItemIndex === null) return;

    const updatedListData = [...listData];
    const selectedNode = updatedListData[selectedItemIndex];

    // Add a dummy input to the selected node
    const newInput = {
      id: `${selectedNode.id}-${selectedNode.inputs.length + 1}`,
      label: `Dummy Label ${selectedNode.inputs.length + 1}`,
      value: `Dummy Value ${selectedNode.inputs.length + 1}`,
    };

    selectedNode.inputs.push(newInput);

    setListData(updatedListData);
  };

  const handleInsertClick = (subItemId: string) => {
    const files = uploadedSubitemFiles[subItemId];

    if (!files || files.length === 0) {
      // If no file exists, insert a new file
      const inputRef = fileInputRefs.current.find(
        (ref) => ref && ref.dataset.subitemid === subItemId
      );
      if (inputRef) {
        inputRef.click();
      }
    } else if (files.length > 0) {
      // If a file exists, remove the file
      setUploadedSubitemFiles((prev) => {
        const updatedFiles = { ...prev };
        delete updatedFiles[subItemId];
        return updatedFiles;
      });
    }
  };

  const isSubItemSelected = (mainItemId, subItemId) => {
    return selectedSubItems[mainItemId]?.includes(subItemId);
  };

  const handleSubItemClick = (mainItemId, subItemId) => {
    setListData((prev) =>
      prev.map((item) => {
        if (item.id === mainItemId) {
          const currentSelections = item.selectedSubItems || [];
          const isSelected = currentSelections.includes(subItemId);

          // Handle Multi-select
          if (item.selectedButton === "Multi-select") {
            item.selectedSubItems = isSelected
              ? currentSelections.filter((id) => id !== subItemId)
              : [...currentSelections, subItemId];
          }
          // Handle Default First (only one selection at a time)
          else if (item.selectedButton === "Default First") {
            item.selectedSubItems = isSelected ? [] : [subItemId];
          }
        }
        return item;
      })
    );
  };

  const handlePriceChange = useCallback((subItemId, newValue) => {
    setListData((prevData) => {
      return prevData.map((item) => ({
        ...item,
        subItems: item.subItems.map((subItem) =>
          subItem.id === subItemId ? { ...subItem, price: newValue } : subItem
        ),
      }));
    });
  }, []);

  // Handle quantity change while typing
  const handleQuantityChange = useCallback((subItemId, newValue) => {
    setListData((prevData) => {
      const newData = prevData.map((item) => ({
        ...item,
        subItems: item.subItems.map((subItem) =>
          subItem.id === subItemId
            ? { ...subItem, quantity: newValue }
            : subItem
        ),
      }));
      // Calculate `quantity * 10` if numeric, else show "counting"
      const numericValue = parseFloat(newValue);
      setCountingValues((prev) => ({
        ...prev,
        [subItemId]: !isNaN(numericValue)
          ? (numericValue * 10).toString()
          : "counting",
      }));
      return newData;
    });
  }, []);

  // Handle quantity click
  const handleQuantityButtonClick = useCallback(
    (subItemId) => {
      setListData((prevData) => {
        const newData = [...prevData];
        const selectedSubItems = newData[selectedItemIndex].subItems;
        const subItemIndex = selectedSubItems.findIndex(
          (item) => item.id === subItemId
        );

        if (subItemIndex !== -1) {
          const currentQuantity =
            parseFloat(selectedSubItems[subItemIndex].quantity) || 0;
          selectedSubItems[subItemIndex] = {
            ...selectedSubItems[subItemIndex],
            quantity: (currentQuantity + 1).toString(), // Increment by 1
          };
          newData[selectedItemIndex] = {
            ...newData[selectedItemIndex],
            subItems: selectedSubItems,
          };
          setCountingValues((prev) => ({
            ...prev,
            [subItemId]: ((currentQuantity + 1) * 10).toString(),
          }));
        }
        return newData;
      });
    },
    [selectedItemIndex]
  );

  const toggleGridItemSelection = (index) => {
    const newData = gridViewData.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );
    setGridViewData(newData);
  };

  const addSubItemToMainItem = () => {
    if (selectedItemIndex === null) return;

    setListData((prevListData) => {
      const updatedListData = [...prevListData];
      const selectedMainItem = updatedListData[selectedItemIndex];

      // Create a new sub-item with a unique ID, dummy title, and editable state
      const newSubItem = {
        id: `${selectedMainItem.id}-${selectedMainItem.subItems.length + 1}`,
        title: "New Option",
        isEditing: true,
        isNew: true,
        quantity: "0",
        price: "0",
      };

      // Add new sub-item at the beginning of the list
      selectedMainItem.subItems = [newSubItem, ...selectedMainItem.subItems];
      return updatedListData;
    });

    // Set the new sub-item ID to editable
    setEditedSubItemId(
      `${listData[selectedItemIndex].id}-${
        listData[selectedItemIndex].subItems.length + 1
      }`
    );
  };

  const handleTitleClick = (id: string) => {
    setListData((prevListData) =>
      prevListData.map((item, i) => {
        if (i === selectedItemIndex) {
          const updatedSubItems = item.subItems.map((subItem) => ({
            ...subItem,
            isEditing: subItem.id === id,
          }));
          return { ...item, subItems: updatedSubItems };
        }
        return item;
      })
    );
    setEditedSubItemId(id);
  };

  const handleSubItemTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newListData = [...listData];
    if (selectedItemIndex !== null && editedSubItemId) {
      const selectedMainItem = newListData[selectedItemIndex];
      const subItemToUpdate = selectedMainItem.subItems.find(
        (subItem) => subItem.id === editedSubItemId
      );
      if (subItemToUpdate) subItemToUpdate.title = event.target.value;
      setListData(newListData);
    }
  };

  const handleRemoveMainItem = (itemId: string, event: React.MouseEvent) => {
    event.preventDefault(); // Prevent any default behavior
    event.stopPropagation(); // Stop event bubbling
    
    setListData((prevListData) => {
      // Find the exact item by ID
      const itemToRemove = prevListData.find(item => item.id === itemId);
      if (!itemToRemove) return prevListData;
      
      // Create new array without the item to remove
      return prevListData.filter(item => item.id !== itemId);
    });
    
    // Reset selection if needed
    setEditableItemIndex(null);
    setSelectedItemIndex(null);
  };

  const handleRemoveSubItem = (mainItemId, subItemId) => {
    setListData((prevListData) =>
      prevListData.map((item) =>
        item.id === mainItemId
          ? {
              ...item,
              subItems: item.subItems.filter(
                (subItem) => subItem.id !== subItemId
              ),
            }
          : item
      )
    );
  };

  // useEffect ------->

  useEffect(() => {
    if (editedSubItemId) {
      const ref = inputRefs.current[editedSubItemId];
      ref?.focus();
    }
  }, [editedSubItemId]);

  useEffect(() => {
    if (selectedItemIndex !== null && mainItemOption === "Default First") {
      const currentItem = listData[selectedItemIndex];
      if (currentItem?.subItems?.length > 0) {
        setSelectedSubItems({
          [currentItem.id]: [currentItem.subItems[0].id],
        });
      }
    }
  }, [selectedItemIndex, mainItemOption]);

  useEffect(() => {
    if (selectedItemIndex !== null && mainItemOption) {
      const currentItem = listData[selectedItemIndex];
      setSelectedSubItems((prev) => {
        if (mainItemOption === "Default First") {
          // Select only the first sub-item by default
          return {
            ...prev,
            [currentItem.id]: currentItem.subItems.length
              ? [currentItem.subItems[0].id]
              : [],
          };
        } else if (mainItemOption === "Multi-select") {
          // Keep existing selections for Multi-select, or reset if needed
          return {
            ...prev,
            [currentItem.id]: prev[currentItem.id] || [],
          };
        }
        return prev;
      });
    }
  }, [selectedItemIndex, mainItemOption, listData]);

  const handleBackClick = () => {
    if (selectedItemIndex === null) {
      setActiveStep2(-1);
    } else {
      setSelectedItemIndex(null);
    }
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "40px"; // Set initial height
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.max(scrollHeight, 40)}px`; // Use the larger of scrollHeight or 40px
    }
  };
  const getGridLayout = (subItem) => {
    const hasQuantity = subItem.showQuantity;
    const hasPrice = subItem.showPrice;
    
    if (!hasQuantity && !hasPrice) {
      return "grid-cols-[1fr,40px]"; // Maximum space for title
    } else if (hasQuantity && hasPrice) {
      return "grid-cols-[1fr,170px]"; // Space for both quantity and price
    } else if (hasPrice) {
      return "grid-cols-[1fr,100px]"; // Space for price only
    } else {
      return "grid-cols-[1fr,80px]"; // Space for quantity only
    }
  };
  return (
    <div className="w-full col-span-2 flex flex-col">
      {/* header for small screen  */}
      <div className="w-full cmd:hidden pb-3 pt-2 flex justify-between items-center">
        <button
          onClick={handleBackClick}
          className="flex justify-center items-center gap-2"
        >
          <IoIosArrowBack className="text-[#555555] text-[24px]" />
          <p className="text-[#555555] text-[18px] font-pingfang">
            {selectedItemIndex === null ? "Confirmation" : ""}
          </p>
        </button>

        <img src="/trumb4.webp" className="w-[40px] h-[40px]" alt="" />
      </div>

      <div className="w-full gap-4 csm2:gap-2 grid grid-cols-1 cmd:grid-cols-2 col-span-2">
        {/* main list -------> */}
        <div className="w-full hidden cmd:flex flex-col gap-3">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable" direction="vertical">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-full flex flex-col gap-2"
                >
                  {listData?.map((item: any, index: number) => {
                    const isEditing = editableItemIndex === index;

                    return (
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
                            onClick={() => {
                              handleItemClick(index);
                            }}
                          >
                            <li
                              key={index}
                              className={`w-full flex ${
                                selectedItemIndex === index &&
                                "border-[#777777] border-[1px] "
                              }  
                            ${
                              item.selectedSubItems &&
                              item.selectedSubItems.length > 0 &&
                              "border-[#777777] border-[1px] "
                            }
                                flex-col rounded-[8px] bg-[#222222] h-fit cursor-pointer  px-3 py-2`}
                            >
                              <div className="w-full flex justify-between items-center">
                              <div className="flex gap-3 flex-1 min-w-0">
                                <p className="text-base text-[#555555] font-pingfang shrink-0">
                                  {index + 1}
                                </p>
                                <div className="flex items-start flex-col min-w-0 flex-1">
                                  <input
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    value={isEditing ? editedTitle : item.title}
                                    onChange={handleTitleChange}
                                    className={`text-[16px] w-full focus:outline-none bg-transparent font-thin font-pingfang truncate ${
                                      isEditing ? "text-cyan-1" : "text-[#cccccc]"
                                    }`}
                                    readOnly={!isEditing}
                                  />
                                  <p className="text-[#777777] font-pingfang text-[18px] truncate w-full">
                                    {item.des}
                                  </p>
                                </div>
                              </div>
                              <button
                                className="group shrink-0 ml-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditClick(index);
                                }}
                              >
                                <Icons.EditIcon
                                  className="w-[22px] h-[22px]"
                                  fill={`${
                                    isEditing
                                      ? "fill-[#00c8c8]"
                                      : "fill-[#555555] fill-[#555555] group-hover:fill-[#777777] "
                                  }`}
                                />
                              </button>
                            </div>
                              {/* sub-options */}
                              {isEditing && (
                                <div
                                  className={`w-full mt-4 gap-3 grid ${
                                    item.subOptions.length === 0
                                      ? "grid-cols-1"
                                      : "grid-cols-[1fr,1fr,1fr,50px]"
                                  } `}
                                >
                                  {item.subOptions.map(
                                    (sub: any, index: number) => (
                                      <button
                                        key={index}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleMainListButtonClick(
                                            item.id,
                                            sub
                                          );
                                        }}
                                        className={`w-full h-[40px] ${
                                          item.selectedButton === sub
                                            ? "border-[#00c8c8] text-[#00c8c8]"
                                            : "border-[#555555] hover:border-[#777777] hover:text-[#777777] text-[#555555]"
                                        } rounded-[16px] transition-all duration-300 text-[12px] font-normal font-pingfang border-[1px]`}
                                      >
                                        {sub}
                                      </button>
                                    )
                                  )}
                                  <div
                                    className={`w-full ${
                                      item.subOptions.length === 0
                                        ? "-mt-3"
                                        : "mt-0"
                                    }  flex justify-end items-center`}
                                  >
                                   <button
                                className="group"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation(); 
                                  handleRemoveMainItem(item.id, e);
                                }}
                              >
                                <Icons.CrossIcon
                                  className="w-[20px] h-[20px]"
                                  fill="fill-[#555555] group-active:opacity-50 group-hover:fill-[#ff1d1d] transition-all duration-200"
                                />
                              </button>
                                  </div>
                                </div>
                              )}
                            </li>
                          </ul>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* add new option + add new input ----->  */}
          <div className="w-full grid grid-cols-2 gap-2">
            <button
              className="w-full gap-1 h-[40px] border-[1px] border-[#333333] hover:border-[#00c8c8] rounded-[8px] flex justify-start px-4 items-center group active:scale-[0.98] transition-all duration-200"
              onClick={addNewOption}
            >
              <AiOutlinePlus className="text-[21px] text-[#555555] group-hover:text-[#00c8c8] transition-colors" />
              <p className="text-[#555555] text-[12px] font-pingfang group-hover:text-[#00c8c8] transition-colors">
                Add Option
              </p>
            </button>
            <button
              onClick={addNewInputOption}
              className="w-full gap-1 h-[40px] border-[1px] border-[#333333] hover:border-[#00c8c8] rounded-[8px] flex justify-start px-4 items-center group active:scale-[0.98] transition-all duration-200"
            >
              <AiOutlinePlus className="text-[21px] text-[#555555] group-hover:text-[#00c8c8] transition-colors" />
              <p className="text-[#555555] text-[12px] font-pingfang group-hover:text-[#00c8c8] transition-colors">
                Add Input
              </p>
            </button>
          </div>
        </div>
        {/* subitems ------------> */}
        {selectedItemIndex >= 0 &&
          selectedItemIndex < listData.length &&
          listData[selectedItemIndex]?.id === "1" && <Description />}
        {selectedItemIndex >= 0 &&
          selectedItemIndex < listData.length &&
          listData[selectedItemIndex]?.id === "2" && <Payment />}
        {selectedItemIndex >= 0 &&
          selectedItemIndex < listData.length &&
          listData[selectedItemIndex]?.id === "3" && <Delivery />}
        {selectedItemIndex >= 0 &&
          selectedItemIndex < listData.length &&
          listData[selectedItemIndex]?.id === "4" && <Discount />}
        {selectedItemIndex >= 0 &&
        selectedItemIndex < listData.length &&
        ![1, 2, 3, 4].includes(Number(listData[selectedItemIndex]?.id)) &&
        listData[selectedItemIndex]?.selectedButton === "Grid View" ? (
          <div className="w-full h-fit grid grid-cols-2 gap-1">
            {gridViewData.map((item, index) => (
              <button
                key={index}
                onClick={() => toggleGridItemSelection(index)}
                className={`w-full h-fit ${
                  item.selected ? "border-cyan-1" : "border-[#222222]"
                } rounded-[8px] border-[2px] p-2 flex flex-col bg-[#222222]`}
              >
                <div className="w-full py-1 flex justify-between items-center">
                  <p className="text-[16px] font-pingfang text-[#eeeeee]">
                    {item.name}
                  </p>
                  {item.selected ? (
                    <img
                      src="/check.png"
                      className="w-[24px] h-[24px]"
                      alt=""
                    />
                  ) : (
                    <Icons.Check3 className="w-[20px] h-[20px]" />
                  )}
                </div>
                <div className="w-full mt-2 h-[80px] bg-black-2 rounded-[8px]"></div>
              </button>
            ))}
          </div>
        ) : (
          selectedItemIndex < listData.length &&
          ![1, 2, 3, 4].includes(Number(listData[selectedItemIndex]?.id)) && (
            <>
              <div className="w-full flex flex-col gap-3">
                <DragDropContext onDragEnd={handleSubItemDragEnd}>
                  <Droppable
                    droppableId="listData" direction="vertical" type="DEFAULT">
                    {(provided) => (
                      <div
                        className="w-full flex flex-col gap-[2px]"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {listData[selectedItemIndex]?.subItems?.map(
                          (subItem, index) => {
                            // Determine grid columns based on quantity and price
                            let gridCols;
                            if (!subItem.quantity && !subItem.price) {
                              gridCols = "grid-cols-[1fr,50px]"; // Only title
                            } else if (subItem.quantity && subItem.price) {
                              gridCols = "grid-cols-[1fr,170px]"; // Both present
                            } else if (subItem.price) {
                              gridCols = "grid-cols-[1fr,140px]"; // Only price present
                            } else {
                              gridCols = "grid-cols-[1fr,100px]"; // Only quantity present
                            }

                            // Check if a file exists for the current subItem
                            const hasFile =
                              uploadedSubitemFiles[subItem.id]?.length > 0;

                            return (
                              <Draggable
                                key={subItem.id}
                                draggableId={subItem.id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    className={`w-full flex flex-col ${
                                      listData[
                                        selectedItemIndex
                                      ].selectedSubItems?.includes(subItem.id)
                                        ? "selected"
                                        : ""
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() =>
                                      handleSubItemClick(
                                        listData[selectedItemIndex].id,
                                        subItem.id
                                      )
                                    }
                                  >
                                    <div
                                      className={`w-full relative cursor-pointer grid gap-3 ${getGridLayout(subItem)} ${
                                        editedSubItemIndex === index
                                          ? "rounded-t-[8px]"
                                          : "rounded-[8px]"
                                      } 
                                ${
                                  listData[
                                    selectedItemIndex
                                  ].selectedSubItems?.includes(subItem.id)
                                    ? "border-[2px] border-cyan-1"
                                    : "bg-[#222222]"
                                }
                     
                           ${
                             mainItemOption === "Default First" && index !== 0
                               ? "cursor-not-allowed"
                               : ""
                           }
                           px-3 py-4 bg-[#222222] `}
                                    >
                                      <div className="flex justify-start items-center gap-3">
                                        <p
                                          className={`text-[16px]
                                     ${
                                       isSubItemSelected(
                                         listData[selectedItemIndex].id,
                                         subItem.id
                                       )
                                         ? "text-cyan-1"
                                         : "text-[#555555]"
                                     }
                               font-normal font-pingfang`}
                                        >
                                          {index + 1}
                                        </p>
                                        {subItem.isEditing ? (
                                          <input
                                            ref={(el) =>
                                              (inputRefs.current[subItem.id] =
                                                el)
                                            }
                                            type="text"
                                            className={`text-[16px] resize-none text-[#eeeeee] font-pingfang bg-transparent focus:outline-none focus:text-cyan-1`}
                                            value={subItem.title}
                                            onChange={handleSubItemTitleChange}
                                            onBlur={() => handleTitleClick("")}
                                          />
                                        ) : (
                                          <p
                                            onClick={() =>
                                              handleTitleClick(subItem.id)
                                            }
                                            className="text-[16px] break-all text-[#eeeeee] font-pingfang"
                                          >
                                            {subItem.title}
                                          </p>
                                        )}
                                      </div>
                                      <div className="w-full  flex justify-between items-center gap-4">
                                        {subItem.showQuantity && (
                                          <span
                                            className="text-[#cccccc] flex justify-center items-center font-pingfang w-[60px] cursor-pointer"
                                            onClick={() => {
                                              setEditingQuantity(subItem.id);
                                              setTimeout(
                                                () =>
                                                  quantityInputRefs.current[
                                                    subItem.id
                                                  ]?.focus(),
                                                0
                                              );
                                            }}
                                          >
                                            {editingQuantity === subItem.id ? (
                                              <input
                                                type="text"
                                                ref={(el) =>
                                                  (quantityInputRefs.current[
                                                    subItem.id
                                                  ] = el)
                                                }
                                                value={subItem.quantity || ""}
                                                onChange={(e) => {
                                                  handleQuantityChange(
                                                    subItem.id,
                                                    e.target.value
                                                  );
                                                }}
                                                onBlur={() =>
                                                  setEditingQuantity(null)
                                                }
                                                autoFocus={true}
                                                className="bg-transparent focus:text-cyan-1 w-[60px] flex justify-center text-center items-center font-pingfang text-cyan-1 focus:outline-none overflow-auto"
                                              />
                                            ) : (
                                              subItem.quantity
                                            )}
                                          </span>
                                        )}

                                        {subItem.showPrice && (
                                          <span
                                            className="text-[#cccccc] flex justify-center items-center font-pingfang w-[60px] cursor-pointer"
                                            onClick={() => {
                                              setEditingPrice(subItem.id);
                                              setTimeout(
                                                () =>
                                                  priceInputRefs.current[
                                                    subItem.id
                                                  ]?.focus(),
                                                0
                                              );
                                            }}
                                          >
                                            {editingPrice === subItem.id ? (
                                              <input
                                                type="text"
                                                ref={(el) =>
                                                  (priceInputRefs.current[
                                                    subItem.id
                                                  ] = el)
                                                }
                                                value={subItem.price || ""}
                                                onChange={(e) =>
                                                  handlePriceChange(
                                                    subItem.id,
                                                    e.target.value
                                                  )
                                                }
                                                onBlur={() =>
                                                  setEditingPrice(null)
                                                }
                                                autoFocus={true}
                                                className="bg-transparent focus:text-cyan-1 w-[60px] flex justify-center text-center items-center font-pingfang text-cyan-1 focus:outline-none overflow-auto"
                                              />
                                            ) : (
                                              subItem.price
                                            )}
                                          </span>
                                        )}
                                        <button
                                          onClick={() =>
                                            handleSubItemEditClick(index)
                                          }
                                          className="group"
                                        >
                                          <Icons.EditIcon
                                            className="w-[24px] absolute right-3 top-1/2 -translate-y-1/2 h-[24px]"
                                            fill={`${
                                              editedSubItemIndex === index
                                                ? "fill-[#00c8c8]"
                                                : "fill-[#555555] group-hover:fill-[#777777] "
                                            } `}
                                          />
                                        </button>
                                      </div>
                                    </div>
                                    {/* subitems edit clicked -----> */}
                                    {(hasFile ||
                                      editedSubItemIndex === index) && (
                                      <div className="w-full py-1 bg-[#202020] rounded-b-[8px] -mt-2">
                                        {editedSubItemIndex === index && (
                                          <div className="w-full px-3 py-1 flex justify-between items-center">
                                            <div className="flex justify-center items-center gap-[6px]">
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleInsertClick(subItem.id);
                                                handleSubButtonClick(
                                                  listData[selectedItemIndex].id,
                                                  subItem.id,
                                                  "Insert"
                                                );
                                              }}
                                              disabled={uploadedSubitemFiles[subItem.id]?.length === 0}
                                              className={`text-[12px] ${
                                                subItem.selectedSubButton === "Insert"
                                                  ? "border-[#00c8c8] text-[#00c8c8]"
                                                  : uploadedSubitemFiles[subItem.id]?.length === 0
                                                  ? "border-[#333333] text-[#333333] cursor-not-allowed"
                                                  : "border-[#555555] hover:border-[#777777] hover:text-[#777777] text-[#555555]"
                                              } font-normal font-pingfang transition-all duration-300 h-[30px] w-[60px] rounded-[16px] border-[1px]`}
                                            >
                                              Insert
                                            </button>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  // handleQuantityButtonClick(subItem.id);
                                                  setEditingQuantity(
                                                    subItem.id
                                                  );
                                                  handleSubButtonClick(
                                                    listData[selectedItemIndex]
                                                      .id,
                                                    subItem.id,
                                                    "Quantity"
                                                  );
                                                }}
                                                className={`text-[12px] ${
                                                  subItem.showQuantity
                                                    ? "border-[#00c8c8] text-[#00c8c8]"
                                                    : "border-[#555555] hover:border-[#777777] hover:text-[#777777] text-[#555555]"
                                                } font-normal font-pingfang transition-all duration-300 h-[30px] w-[60px] rounded-[16px] border-[1px]`}
                                              >
                                                Quantity
                                              </button>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setEditingPrice(subItem.id);
                                                  handleSubButtonClick(
                                                    listData[selectedItemIndex]
                                                      .id,
                                                    subItem.id,
                                                    "Unit"
                                                  );
                                                }}
                                                className={`text-[12px] ${
                                                  subItem.showPrice
                                                    ? "border-[#00c8c8] text-[#00c8c8]"
                                                    : "border-[#555555] hover:border-[#777777] hover:text-[#777777] text-[#555555]"
                                                } font-normal font-pingfang transition-all duration-300 h-[30px] w-[60px] rounded-[16px] border-[1px] `}
                                              >
                                                Unit
                                              </button>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleSubButtonClick(
                                                    listData[selectedItemIndex]
                                                      .id,
                                                    subItem.id,
                                                    "counting"
                                                  );
                                                }}
                                                className={`text-[12px] ${
                                                  subItem.selectedSubButton ===
                                                  "counting"
                                                    ? "border-[#00c8c8] text-[#00c8c8]"
                                                    : "border-[#555555] hover:border-[#777777] hover:text-[#777777] text-[#555555]"
                                                } font-normal font-pingfang transition-all duration-300 h-[30px] w-[60px] rounded-[16px] border-[1px]`}
                                              >
                                                {countingValues[subItem.id] ||
                                                  "counting"}
                                              </button>

                                              {/* fileinput */}
                                              <input
                                                type="file"
                                                ref={(el) => {
                                                  if (el) {
                                                    el.dataset.subitemid =
                                                      subItem.id;
                                                    fileInputRefs.current[
                                                      index
                                                    ] = el;
                                                  }
                                                }}
                                                style={{ display: "none" }}
                                                accept={acceptedFileTypes.join(
                                                  ","
                                                )}
                                                onClick={(e) =>
                                                  e.stopPropagation()
                                                }
                                                onChange={handleSubItemFileChange(
                                                  subItem.id
                                                )}
                                              />
                                            </div>
                                            <button
                                              className="group"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveSubItem(
                                                  listData[selectedItemIndex]
                                                    .id,
                                                  subItem.id
                                                );
                                              }}
                                            >
                                              <Icons.CrossIcon
                                                className="w-[20px] h-[20px]"
                                                fill="fill-[#555555] group-active:opacity-50 group-hover:fill-[#ff1d1d]"
                                              />
                                            </button>
                                          </div>
                                        )}
                                        <div className="w-full bg-[#222222] px-1 rounded-b-[8px]">
                                          {renderUploadedFile(subItem.id)}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            );
                          }
                        )}
                        {provided.placeholder}
                        <div className="w-full pl-1 gap-3 flex flex-col">
                          {listData[selectedItemIndex]?.inputs?.map(
                            (inputItem, index) => {
                              return (
                                <div
                                  key={inputItem.id}
                                  className="w-full gap-[2px] flex flex-col"
                                >
                                  <textarea
                                    ref={textareaRef}
                                    value={inputItem.label}
                                    onBlur={() => setEditingInputId(null)}
                                    onFocus={() =>
                                      setEditingInputId(inputItem.id)
                                    }
                                    onChange={(e) => {
                                      handleSubItemInputChange(
                                        0,
                                        "label",
                                        e.target.value
                                      );
                                      adjustHeight(); 
                                    }}
                                    placeholder="Input Label"
                                    className={`${
                                      editingInputId === inputItem.id
                                        ? "text-cyan-1"
                                        : "text-[#777777]"
                                    } bg-transparent resize-none py-1 cursor-default focus:outline-none text-[20px] font-normal font-pingfang`}
                                  />

                                  <textarea
                                    type="text"
                                    value={inputItem.value}
                                    ref={textareaRef}
                                    onBlur={() => setEditingInputId(null)}
                                    onFocus={() =>
                                      setEditingInputId(inputItem.id)
                                    }
                                    onChange={(e) => {
                                      handleSubItemInputChange(
                                        index,
                                        "value",
                                        e.target.value
                                      );
                                      adjustHeight();
                                    }}
                                    className={`w-full min-h-[40px] ${
                                      editingInputId === inputItem.id
                                        ? "bg-cyan-1 text-black-1"
                                        : "text-[#555555] bg-[#222222]"
                                    } max-w-full py-2 hideScroll rounded-[8px] cursor-default px-4 text-[16px] font-pingfang focus:outline-none`}
                                     style={{ height : '40px'}}
                                  />
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                {/* button --> add-option */}
                {selectedItemIndex === null ? (
                  ""
                ) : listData[selectedItemIndex]?.subOptions?.length === 0 ? (
                  <button
                    onClick={addInputToExistingNode}
                    className="w-full gap-1 h-[40px] border-[1px] border-[#333333] hover:border-[#00c8c8] rounded-[8px] flex justify-start px-4 items-center group active:scale-[0.98] transition-all duration-200"
                  >
                    <AiOutlinePlus className="text-[21px] text-[#555555] group-hover:text-[#00c8c8] transition-colors" />
                    <p className="text-[#555555] text-[12px] font-pingfang group-hover:text-[#00c8c8] transition-colors">
                      Add Input
                    </p>
                  </button>
                ) : (
                  <button
                    onClick={addSubItemToMainItem}
                    className="w-full gap-1 h-[40px] border-[1px] border-[#333333] hover:border-[#00c8c8] rounded-[8px] flex justify-start px-4 items-center group active:scale-[0.98] transition-all duration-200"
                  >
                    <AiOutlinePlus className="text-[21px] text-[#555555] group-hover:text-[#00c8c8] transition-colors" />
                    <p className="text-[#555555] text-[12px] font-pingfang group-hover:text-[#00c8c8] transition-colors">
                      Add Option
                    </p>
                  </button>
                )}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Confirmation;
