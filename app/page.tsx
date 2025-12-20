import Casestudysection from "@/app/components/Reusable/casestudysection";
import Experience from "@/app/components/common/Experience";
import { LinkPreview }   from "@/app/components/ui/link-preview";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" max-w-[50vw] h-full bg-white flex flex-col items-start border-r border-gray-200">
      <div className="flex flex-col items-start px-4 py-2 gap-4"> 
        <div className="rounded-xl overflow-hidden border border-gray-200">
          <Image 
            src="/images/Ram.png" 
            alt="Profile" 
            width={64}
            height={64}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <p className="text-sm">
          Hi I&apos;m {" "}
          <LinkPreview href="https://www.instagram.com/visualsofalex11/">visualsofalex11</LinkPreview>
          , a software engineer, DJ, writer, and minimalist based in Amsterdam, The Netherlands.<br /><br />
          I develop things as a Senior Frontend Software Engineer. Previously, I worked as a Senior Frontend Software Engineer at heycar, Frontend Software Engineer at Yemeksepeti, Fullstack Software Engineer at Sistas, Mobile Developer at Tanbula, and Specialist at Apple.
        </p>
        </div>
        <Casestudysection />
        <Experience />

    </div>
  );
}

