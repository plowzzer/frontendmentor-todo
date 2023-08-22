import React from "react";
import { useThemeContext } from "@/context/ThemeProvider";
import { Moon, Sun } from "lucide-react";

const Header: React.FC = () => {
  const { theme, changeTheme } = useThemeContext() as any;

  return (
    <header className="bg-gradient-to-r from-cyan-500 to-blue-500 h-80 pt-28">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl tracking-wide font-bold uppercase text-white">
          TODO
        </h1>
        <button onClick={changeTheme}>
          {theme === "dark" ? (
            <Sun color="white" size={32} />
          ) : (
            <Moon color="white" size={32} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
