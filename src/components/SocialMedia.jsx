import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";

const socialLinks = [
    {
        title: "Facebook",
        href: "https://facebook.com/amarshop",
        icon: <Facebook className="w-5 h-5" />,
        color: "hover:bg-blue-600 hover:border-blue-600",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20"
    },
    {
        title: "Instagram",
        href: "https://instagram.com/amarshop",
        icon: <Instagram className="w-5 h-5" />,
        color: "hover:bg-gradient-to-br hover:from-pink-600 hover:to-purple-600 hover:border-pink-600",
        bgColor: "bg-gradient-to-br from-pink-500/10 to-purple-500/10",
        borderColor: "border-pink-500/20"
    },
    {
        title: "Twitter",
        href: "https://twitter.com/amarshop",
        icon: <Twitter className="w-5 h-5" />,
        color: "hover:bg-sky-500 hover:border-sky-500",
        bgColor: "bg-sky-500/10",
        borderColor: "border-sky-500/20"
    },
    {
        title: "LinkedIn",
        href: "https://linkedin.com/company/amarshop",
        icon: <Linkedin className="w-5 h-5" />,
        color: "hover:bg-blue-700 hover:border-blue-700",
        bgColor: "bg-blue-700/10",
        borderColor: "border-blue-700/20"
    },
    {
        title: "YouTube",
        href: "https://youtube.com/c/amarshop",
        icon: <Youtube className="w-5 h-5" />,
        color: "hover:bg-red-600 hover:border-red-600",
        bgColor: "bg-red-600/10",
        borderColor: "border-red-600/20"
    },
    {
        title: "GitHub",
        href: "https://github.com/amarshop",
        icon: <Github className="w-5 h-5" />,
        color: "hover:bg-gray-800 hover:border-gray-800",
        bgColor: "bg-gray-800/10",
        borderColor: "border-gray-800/20"
    }
];

const SocialMedia = () => {
    return (
        <TooltipProvider>
            <div className="flex items-center justify-center gap-3 my-6">
                {socialLinks.map((item) => (
                    <Tooltip key={item.title}>
                        <TooltipTrigger asChild>
                            <Link
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "p-3 rounded-full border transition-all duration-300 transform group",
                                    item.bgColor,
                                    item.borderColor,
                                    item.color,
                                    "hover:scale-110 hover:shadow-lg",
                                    "active:scale-95"
                                )}
                                aria-label={`Follow us on ${item.title}`}
                            >
                                <div className="group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-black text-white border-gray-800">
                            <p className="font-medium">{item.title}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </TooltipProvider>
    );
};

export default SocialMedia;