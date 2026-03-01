"use client";

import { Heart, LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface Feature {
  icon: LucideIcon;
  label: string;
}

interface OwnerCardProps {
  name: string;
  rating: number;
  joinedDate: string;
  features: Feature[];
  onMessageClick?: () => void;
}

export function OwnerCard({
  name,
  rating,
  joinedDate,
  features,
  onMessageClick,
}: OwnerCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="bg-yellow-100 text-yellow-600 text-xl">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">Владелец: {name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Heart className="w-4 h-4 text-red-500 fill-red-500 mr-1" />
              <span className="font-medium">{rating}</span>
            </div>
            <span>•</span>
            <span>На сайте с {joinedDate}</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-yellow-600" />
              <span className="text-gray-700">{feature.label}</span>
            </div>
          );
        })}
      </div>

      <Button
        variant="secondary"
        className="w-full mb-4"
        onClick={onMessageClick}
      >
        Отправить сообщение
      </Button>
    </div>
  );
}
