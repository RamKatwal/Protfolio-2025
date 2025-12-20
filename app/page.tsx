import Casestudysection from "@/app/components/Reusable/casestudysection";
import { LinkPreview }   from "@/app/components/ui/link-preview";

export default function Home() {
  return (
    <div className=" max-w-[50vw] h-full bg-white flex flex-col items-start border-r border-gray-200 gap-4">
      <div className="flex flex-col items-start px-4 pt-4 gap-4"> 
        
        <p>
          Hi 👋 I&apos;m Ram{" "}
          <LinkPreview href="https://www.instagram.com/visualsofalex11/">visualsofalex11</LinkPreview>
          , a software engineer, DJ, writer, and minimalist based in Amsterdam, The Netherlands.<br /><br />
          I develop things as a Senior Frontend Software Engineer. Previously, I worked as a Senior Frontend Software Engineer at heycar, Frontend Software Engineer at Yemeksepeti, Fullstack Software Engineer at Sistas, Mobile Developer at Tanbula, and Specialist at Apple.
        </p>
        </div>
        <Casestudysection />
    </div>
  );
}

