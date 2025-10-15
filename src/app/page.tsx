"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button"; 
import { useEffect, useState } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({x:0, y:0});

    useEffect (() => {
      const handleMouseMove = (e:MouseEvent) => {
        setMousePosition({x:e.clientX, y:e.clientY }) 
      };
    window.addEventListener("mousemove", handleMouseMove);  

     return ()=>{
      window.removeEventListener("mousemove", handleMouseMove);
     };
  
    },[]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 t0-green-900/20 animate-pulse"/>
    </div>
  );
}