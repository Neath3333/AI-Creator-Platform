"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { features, platformTabs } from "@/lib/data";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";


export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };

  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20 animate-pulse" />

      <div style={{
        left: mousePosition.x - 192,
        top: mousePosition.y - 192,
        transition: "all 0.3s ease out",
      }} className="fixed w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none z-0">

      </div>
      <section className="relative z-10 mt-48 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-7xl lg:text-8xl font-black leading-none tracking-tight ">
                <span className="block font-black text-white">Create</span>
                <span className="block font-light italic text-purple-300">Publish</span>
                <span className="block font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">Grow</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl md:max-w-none">The AI-powered platform that turns your ideas into
                <span className="text-purple-300 font-semibold">
                  {" "}
                  engaging content
                </span>
                {" "}
                and help you build a thriving creator business.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
              <Link href={"/dashboard"}>
                <Button variant={"gradient"} size={"xl"} className="rounded-full w-full sm:w-auto text-white">
                  Start Creating for Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={"/feed"}>
                <Button variant={"outline"} size={"xl"} className="rounded-full w-full sm:w-auto">
                  Explore the Feed
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <Image
              src={"/banner.jpg"}
              width={500}
              height={400}
              alt="Platform Banner"
              className="w-full h-auto object-contain"
              priority></Image>
          </div>
        </div>
      </section>
      <section id="features" className="relative mt-14 z-10 py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-r from-gray-900/50 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              <span className="gradient-text-primary">Everything you need</span>
            </h2>
            <p className=" text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto p-4">
              From AI-powered writing assistance to advanced analytics, we&apos;ve built the complete toolkit for modern creators.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group transition-all duration-300 hover:scale-105 card-glass">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="mb-2">{feature.title}</CardTitle>
                  <CardDescription>{feature.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
            <span className="gradient-text-primary">How it works</span>
          </h2>
          <p className=" text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto p-4">
            Three powerful modules working together to supercharge your content creation.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <div className="space-y-4">
              {platformTabs.map((tab, index) => (
                <Button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  variant={activeTab === index ? "default" : "outline"}
                  className="w-full justify-start p-6 h-auto"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        activeTab === index
                          ? "bg-gradient-to-br from-purple-500 to-blue-500"
                          : "bg-muted"
                      }`}
                    >
                      <tab.icon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg">{tab.title}</h3>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}