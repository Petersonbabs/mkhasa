import Link from "next/link";
import logoImg from "@/public/images/logo.webp";
import Image from "next/image";

interface WrapperProps {
    backGroundColor: string;
  }

export const Logo = ({ backGroundColor }: WrapperProps) => {
    return (
      <Link href="/dashboard" aria-label="Navigate to home page">
        <div className={"flex gap-x-2 items-center"}>
          <Image
            src={logoImg}
            alt=""
            className="aspect-[40/37] w-8 min-[360px]:w-10 md:w-12 lg:w-14"
          />
          <p
            className={`font-fuzzy font-bold tracking-tighter text-sm pt-2 ${
              backGroundColor === "black" ? "text-white" : "text-app-red"
            } min-[360px]:text-lg md:text-xl lg:text-2xl`}
  
          >
            mkhasa
          </p>
        </div>
      </Link>
    );
  };