import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import * as Icons from "../../../../Svg/Icons";
import { CgAttachment } from "react-icons/cg";
import { RiLinksFill } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import CustomVideoPlayer from "../../../WebTopPick/VideoPlayer";
import { v4 as uuidv4 } from "uuid";
import { BsCheckLg } from "react-icons/bs";

const Description: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [files, setFiles] = useState<{ id: string; type: string; value: string | File }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        id: uuidv4(),
        type: file.type.split("/")[0],
        value: file,
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleAddLink = () => {
    const newLink = {
      id: uuidv4(),
      type: "link",
      value: "",
    };
    setFiles((prevFiles) => [...prevFiles, newLink]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleLinkChange = (id: string, newValue: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === id ? { ...file, value: newValue } : file
      )
    );
  };

  const renderAttachedFiles = () => {
    return files.map((file) => {
      if (file.type === "image") {
        return (
          <div
            key={file.id}
            className="flex items-center gap-2 text-[#777777] text-[14px]"
          >
            <div className="w-full h-[36px] grid grid-cols-[1fr,15px]">
              <img
                src={URL.createObjectURL(file.value as File)}
                alt={(file.value as File).name}
                className="w-full h-[36px] rounded-l-[10px] object-cover"
              />
              <Menu>
                <MenuButton>
                  <button className="w-full rounded-r-[10px] flex justify-center items-center h-full bg-[#00c8c8]">
                    <TiArrowSortedDown className="text-[14px] text-[#555555]" />
                  </button>
                </MenuButton>
                <MenuItems className="flex p-[2px] z-50 !rounded-[10px] bg-[#333333] flex-col">
                  <button className=" py-1 font-medium font-pingfang text-[10px] text-[#777777]">
                    Open
                  </button>
                  <button className=" py-1 font-medium font-pingfang text-[10px] text-[#777777]">
                    Download
                  </button>
                  <button
                    onClick={() => handleRemoveFile(file.id)}
                    className=" py-1 font-medium font-pingfang text-[10px] text-[#ff1d1d]"
                  >
                    Remove
                  </button>
                </MenuItems>
              </Menu>
            </div>
          </div>
        );
      } else if (file.type === "video") {
        return (
          <div
            key={file.id}
            className="flex items-center gap-2 text-[#777777] text-[14px]"
          >
            <div className="w-full h-[36px] grid grid-cols-[1fr,15px]">
              <div className="w-full h-[36px] rounded-l-[10px] object-cover">
                <CustomVideoPlayer
                  src={URL.createObjectURL(file.value as File)}
                />
              </div>
              <Menu>
                <MenuButton>
                  <button className="w-full rounded-r-[10px] flex justify-center items-center h-full bg-[#00c8c8]">
                    <TiArrowSortedDown className="text-[14px] text-[#555555]" />
                  </button>
                </MenuButton>
                <MenuItems  className="flex z-50 p-[2px] !rounded-[10px] bg-[#333333] flex-col">
                  <button className="py-1 font-medium font-pingfang text-[10px] text-[#777777]">
                    Open
                  </button>
                  <button className="py-1 font-medium font-pingfang text-[10px] text-[#777777]">
                    Download
                  </button>
                  <button
                    onClick={() => handleRemoveFile(file.id)}
                    className=" py-1 font-medium font-pingfang text-[10px] text-[#ff1d1d]"
                  >
                    Remove
                  </button>
                </MenuItems>
              </Menu>
            </div>
          </div>
        );
      } else if (file.type === "link") {
        return (
          <div
            key={file.id}
            className="flex items-center gap-2  text-[#777777] text-[14px]"
          >
            <div className="w-full h-[36px] rounded-[10px] pl-1 bg-[#00c8c8] grid grid-cols-[1fr,15px]">
              <div className="w-full flex justify-center items-center gap-[2px]">
                <RiLinksFill className="text-[22px] text-black-1" />

                <input
                  type="text"
                  placeholder="Link"
                  value={file.value as string}
                  onChange={(e) => handleLinkChange(file.id, e.target.value)}
                  className="w-full h-[36px] flex justify-start bg-[red] bg-transparent placeholder:text-black-1 font-pingfang text-black-1 focus:outline-none"
                />
              </div>
              <Menu>
                <MenuButton>
                  <button className="w-full rounded-r-[10px] flex justify-center items-center h-full bg-[#00c8c8]">
                    <TiArrowSortedDown className="text-[14px] text-[#555555]" />
                  </button>
                </MenuButton>
                <MenuItems className="flex p-[2px] z-50 !rounded-[10px] bg-[#333333] flex-col">
                  <button className="rounded-t-[10px] text-[10px] text-[#777777]">
                    Open
                  </button>
                  <button
                    onClick={() => handleRemoveFile(file.id)}
                    className="rounded-b-[10px] py-1 font-medium font-pingfang text-[10px] text-[#ff1d1d]"
                  >
                    Remove
                  </button>
                </MenuItems>
              </Menu>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Enable/Disable Radio Options */}
      <div className="w-full flex flex-col gap-2 bg-[#222] rounded-[8px] p-3">
        <button
          onClick={() => setIsEnabled(true)}
          className={`w-full h-[40px] flex items-center justify-between px-4 rounded-[8px] ${
            isEnabled
              ? "text-[#00c8c8]"
              : "text-[#777777]"
          }`}
        >
          <span>Enable</span>
          {isEnabled && (
            <div className="w-5 h-5 rounded-full bg-[#00c8c8] flex items-center justify-center">
              <BsCheckLg className="w-3 h-3 text-[#222222]" />
            </div>
          )}
        </button>
        <button
          onClick={() => setIsEnabled(false)}
          className={`w-full h-[40px] flex items-center justify-between px-4 rounded-[8px] ${
            !isEnabled
              ? "text-[#00c8c8] border border-[#00c8c8]"
              : "text-[#777777]"
          }`}
        >
          <span>Disable</span>
          {!isEnabled && (
            <div className="w-5 h-5 rounded-full bg-[#00c8c8] flex items-center justify-center">
              <BsCheckLg className="w-3 h-3 text-[#222222]" />
            </div>
          )}
        </button>
      </div>

      {/* Description Content - Only show when enabled */}
      {isEnabled && (
        <div className="w-full flex bg-[#222] rounded-b-[23px] rounded-t-[8px] flex-col h-[calc(100%-48px)]">
          <textarea
            name=""
            id=""
            className="w-full resize-none bg-[#222] h-[480px] focus:bg-cyan-1 placeholder:text-[#555555] focus:text-[#000] focus:border-none focus:outline-none p-3 rounded-[8px] text-area-gr text-[#555555] text-[16px] font-normal font-pingfang"
            placeholder="Please provide a brief description of your requirements in 150 words or less."
          ></textarea>

          <div className="bg-[#222] py-3 rounded-b-[23px] px-3 relative">
            <div className="flex flex-wrap gap-[6px] pr-[40px]">
              {files.length > 0 ? (
                <div className="grid grid-cols-5 gap-[6px] w-full">
                  {renderAttachedFiles()}
                </div>
              ) : (
                <p className="text-[#555555] text-[16px] font-pingfang">
                  Attach References
                </p>
              )}
            </div>

            <div className={`absolute right-4 ${files.length > 5 ? 'bottom-0' : 'top-1/2 -translate-y-1/2'}`}>
              <Menu as="div" className="relative">
                {({ open, close }) => (
                  <>
                    <MenuButton>
                      <button className="group w-full flex justify-center items-center ml-1">
                        <Icons.Add
                          stroke="group-hover:stroke-cyan-1 stroke-[#555555]"
                          fill="group-hover:fill-cyan-1 fill-[#555555]"
                          className="w-[30px] h-[30px]"
                        />
                      </button>
                    </MenuButton>

                    <MenuItems className="w-[140px]" anchor="left">
                      <MenuItem>
                        {({ close }) => (
                          <>
                            <label
                              htmlFor="file-upload"
                              className="flex w-full hover:bg-[#3d3d3d] bg-[#333333] rounded-t-[10px] px-2 justify-start items-center gap-2 py-[11px] cursor-pointer"
                            >
                              <CgAttachment className="text-[18px] -rotate-45 text-[#555555]" />
                              <p className="text-[14px] text-[#777777] font-pingfang">
                                Attach
                              </p>
                            </label>
                            {/* Hidden file input */}
                            <input
                              id="file-upload"
                              type="file"
                              multiple
                              className="hidden"
                              onChange={(e) => {
                                handleFileChange(e);
                                close();
                              }}
                            />
                          </>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ close }) => (
                          <button
                            onClick={() => {
                              handleAddLink();
                              close();
                            }}
                            className="flex w-full hover:bg-[#3d3d3d] bg-[#333333] rounded-b-[10px] px-2 justify-start items-center gap-2 py-[11px] "
                          >
                            <RiLinksFill className="text-[20px] text-[#555555]" />
                            <p className="text-[14px] text-[#777777] font-pingfang">
                              Link
                            </p>
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Description;
