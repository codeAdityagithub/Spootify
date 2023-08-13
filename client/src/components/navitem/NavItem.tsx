// import { GoHomeFill } from "react-icons/go/index";
// import { BsSearch } from "react-icons/bs/index";
// import { BiLibrary } from "react-icons/bi/index";
// import { BsSpotify } from "react-icons/bs/index";
// import React, { ReactNode, useState } from "react";

// type ItemProps = {
//     icon: ReactNode;
//     text: string;
// };

// const items: ItemProps[] = [
//     {
//         icon: <GoHomeFill size={25} />,
//         text: "Home",
//     },
//     {
//         icon: <BsSearch size={25} />,
//         text: "Search",
//     },
//     {
//         icon: <BiLibrary size={25} />,
//         text: "Your Library",
//     },
//     {
//         icon: <BsSpotify size={25} />,
//         text: "GetApp",
//     },
// ];

const NavItem = () => {
    // const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div className="bg-black flex flex-row w-full">
            {/* {items.map((item: ItemProps, index: number): React.ReactNode => {
                return (
                    <div
                        key={index}
                        className={
                            "flex-1 cursor-pointer gap-1 p-2 flex flex-col items-center justify-between transition-transform ease-linear delay-100 active:scale-90" +
                            (activeIndex !== index && " text-textDark-400")
                        }
                        onClick={() => {
                            setActiveIndex(index);
                        }}
                    >
                        {item.icon}
                        <p className="text-xs">{item.text}</p>
                    </div>
                ); */}
            {/* })} */}
        </div>
    );
};

export default NavItem;
