import React,{ReactNode} from 'react'

interface Props {
    children:ReactNode;
    text:string;
    bgImage:string,
    color:string,
}

const Node:React.FC<Props> = ({children,text,bgImage,color}:Props) => {
  return (
    <div className="w-full flex justify-center items-center flex-col gap-5">
    <p className={`text-[20px] ${color} font-normal font-zen`}>{text}</p>
    <div
      style={{
        backgroundImage: bgImage,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
      className="w-full max-w-[220px] h-[250px] sm:h-[330px]"
    >
      <div className="flex flex-col h-full w-full justify-center items-center">
           {children}
      </div>
    </div>
  </div>
  )
}

export default Node