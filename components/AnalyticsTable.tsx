"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";

interface LinkData {
  name: string;
  subtitle?: string;
  icon?: string;
  type: string;
  reach?: string;
  impressions?: string;
  totalClicks?: string;
  uniqueClicks?: string;
}

const links: LinkData[] = [
  {
    name: "Contact me",
    subtitle: "https://facebook.com/sabrihakulii",
    type: "Button",
    totalClicks: "5.9K",
    uniqueClicks: "4.8K",
  },
  {
    name: "Newsletters",
    subtitle: "sabri@publer.io",
    type: "Email",
    totalClicks: "2.8K",
    uniqueClicks: "2.1K",
  },
  {
    name: "Sabri Hakuli",
    subtitle: "Pixels matter. But hierarchy, contrast, and flow...",
    icon: "/avatars/sabri1.png",
    type: "Post",
    reach: "2.9K",
    impressions: "1.5K",
    totalClicks: "844",
    uniqueClicks: "790",
  },
  {
    name: "Web Portfolio",
    subtitle: "https://sabrihakuli.com",
    icon: "/avatars/portfolio.png",
    type: "Post",
    reach: "12.8K",
    impressions: "2.9K",
    totalClicks: "2.5K",
    uniqueClicks: "1.2K",
  },
  {
    name: "Dribbble",
    subtitle: "https://dribbble.com/sabrihakuli",
    icon: "/icons/dribbble.svg",
    type: "Post",
    reach: "7.8K",
    impressions: "3.6K",
    totalClicks: "905",
    uniqueClicks: "783",
  },
  {
    name: "Facebook",
    subtitle: "https://facebook.com/sabrihakuli",
    icon: "/icons/facebook.svg",
    type: "Post",
    reach: "4.8K",
    impressions: "2.8K",
    totalClicks: "1.1K",
    uniqueClicks: "860",
  },
  {
    name: "Sabri Hakuli",
    subtitle: "Your UI isn’t finished when there’s nothing left to add...",
    icon: "/avatars/sabri2.png",
    type: "Post",
    reach: "3.8K",
    impressions: "1.2K",
    totalClicks: "890",
    uniqueClicks: "570",
  },
];

export default function AnalyticsTable() {
  return (
    <Card className="w-full max-w-5xl bg-[#151a21] border-none shadow-2xl">
      <CardContent className="p-8">
        <div className="bg-[#141517] rounded-2xl border border-[#1f2023] text-white p-6 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-[#1f2023]">
                <th className="text-left py-3 font-medium">Name</th>
                <th className="text-left py-3 font-medium">Type</th>
                <th className="text-left py-3 font-medium">Reach</th>
                <th className="text-left py-3 font-medium">Impressions</th>
                <th className="text-left py-3 font-medium">Total Clicks</th>
                <th className="text-left py-3 font-medium">Unique Clicks</th>
              </tr>
            </thead>

            <tbody>
              {links.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-[#1f2023] hover:bg-[#1a1b1e] transition"
                >
                  {/* Name + icon + subtitle */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {item.icon ? (
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#1f2023] flex items-center justify-center text-gray-400 text-lg">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        {item.subtitle && (
                          <span className="text-gray-400 text-xs truncate max-w-[220px]">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="text-gray-300">{item.type}</td>
                  <td className="text-gray-300">{item.reach || "-"}</td>
                  <td className="text-gray-300">{item.impressions || "-"}</td>
                  <td className="text-gray-300">{item.totalClicks || "-"}</td>
                  <td className="text-gray-300">{item.uniqueClicks || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
