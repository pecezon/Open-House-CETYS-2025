import React from "react";
import { Button, Image } from "@heroui/react";
import Logo from "../assets/logoCetys.png";

const Header = () => {
  return (
    <div className="flex w-full items-center justify-center px-4 px-4 py-8 flex-col">
      <div className="flex w-2/8 flex-col items-center justify-center gap-4">
        <Image alt="Logo CETYS" src={Logo} width={175} />
        <p className="text-center text-5xl italic">
          OPEN <br /> HOUSE
        </p>
        <p className="text-center text-5xl italic">2025</p>
      </div>
    </div>
  );
};

export default Header;
