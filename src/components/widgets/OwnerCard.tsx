"use client";

import Link from "next/link";
import { Heart, Package, Truck, Battery, LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

const ICON_MAP: Record<string, LucideIcon> = {
  package: Package,
  truck: Truck,
  "battery-charging": Battery,
};

interface Feature {
  icon: string;
  label: string;
}

interface OwnerCardProps {
  ownerId?: number;
  name: string;
  rating: number;
  joinedDate: string;
  features: Feature[];
  onMessageClick?: () => void;
}

export function OwnerCard({
  ownerId = 1,
  name,
  rating,
  joinedDate,
  features,
  onMessageClick,
}: OwnerCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-6 mb-6">
      <Link
        href={`/owner/${ownerId}`}
        className="flex items-center gap-3 sm:gap-4 lg:gap-4 mb-3 sm:mb-4 lg:mb-4 group"
      >
        <Avatar className="w-11 h-11 sm:w-16 sm:h-16 lg:w-16 lg:h-16 ring-2 ring-transparent group-hover:ring-yellow-400 transition-all">
          <AvatarFallback className="bg-yellow-100 text-yellow-600 text-base sm:text-xl lg:text-xl">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h3 className="font-semibold text-base sm:text-lg lg:text-lg leading-tight group-hover:text-yellow-600 transition-colors">
            Владелец: {name}
          </h3>
          <div className="flex items-center gap-2 text-xs sm:text-sm lg:text-sm text-gray-600 mt-0.5">
            <div className="flex items-center">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4 text-red-500 fill-red-500 mr-1" />
              <span className="font-medium">{rating}</span>
            </div>
            <span>•</span>
            <span>На сайте с {joinedDate}</span>
          </div>
        </div>
      </Link>

      {/* Features */}
      <div className="space-y-2 sm:space-y-3 lg:space-y-3 mb-3 sm:mb-4 lg:mb-5">
        {features.map((feature, index) => {
          const Icon = ICON_MAP[feature.icon] ?? Package;
          return (
            <div
              key={index}
              className="flex items-center gap-2.5 sm:gap-3 lg:gap-3"
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-yellow-600 shrink-0" />
              <span className="text-sm sm:text-base lg:text-base text-gray-700">
                {feature.label}
              </span>
            </div>
          );
        })}
      </div>

      <Button variant="secondary" className="w-full" onClick={onMessageClick}>
        Отправить сообщение
      </Button>
    </div>
  );
}
