"use client"

import React from "react";
import {
    SignInButton,
    SignUpButton,
    UserButton,
} from '@clerk/nextjs'
import { Authenticated, Unauthenticated } from "convex/react";
import { useStoreUser } from "../../../hooks/use-store-user";
import { BarLoader } from "react-spinners";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";


const Header = () => {

    const { isLoading } = useStoreUser();
    const path = usePathname();
    return (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-3xl px-4">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between gap-2 ">
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={98}
                        height={32}
                        className="h-4 sm:h-6 w-auto object-contain"
                    />
                </Link>

                {path === '/' && (
                    <div className="hidden lg:flex space-x-6 flex-1 justify-center">
                        <Link
                            href="#features"
                            className="text-white font-medium transition-all duration-300
                    hover:text-[#2e27eaff] cursor-pointer">
                            Features
                        </Link>
                        <Link
                            href="#testimonials"
                            className="text-white font-medium transition-all duration-300
                    hover:text-[#2e27eaff] cursor-pointer"> Testimonials</Link>
                    </div>
                )}
                <Authenticated>
                    <UserButton />
                </Authenticated>
                <Unauthenticated>
                    <SignInButton>
                        <Button variant={"gradient"} size="sm">Sign In</Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button  size="sm" className="whitespace-nowrap">Sign Up</Button>
                    </SignUpButton>
                </Unauthenticated>


                {isLoading && (
                    <div className="fixed bottom-0 left-0 w-full z-40 flex justify-center">
                        <BarLoader width={"95%"} color="#2e27eaff" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;  