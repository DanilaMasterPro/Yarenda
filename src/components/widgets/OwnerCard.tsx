"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface OwnerCardProps {
  ownerId?: string | number;
  name: string;
  avatar?: string | null;
  rating?: number;
  joinedDate?: string;
  description?: string | null;
  phone?: string | null;
  onMessageClick?: () => void;
}

export function OwnerCard({
  ownerId,
  name,
  avatar,
  rating,
  joinedDate,
  description,
  phone,
  onMessageClick,
}: OwnerCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-6 mb-6">
      <Link
        href={`/user/${ownerId ?? ""}`}
        className="flex items-center gap-3 sm:gap-4 lg:gap-4 mb-3 sm:mb-4 lg:mb-4 group"
      >
        <Avatar className="w-11 h-11 sm:w-16 sm:h-16 lg:w-16 lg:h-16 ring-2 ring-transparent group-hover:ring-yellow-400 transition-all">
          {avatar && <AvatarImage src={avatar} alt={name} />}
          <AvatarFallback className="bg-yellow-100 text-yellow-600 text-base sm:text-xl lg:text-xl">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h3 className="font-semibold text-base sm:text-lg lg:text-lg leading-tight group-hover:text-yellow-600 transition-colors">
            Владелец: {name}
          </h3>
          {(rating != null || joinedDate) && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 mt-0.5">
              {rating != null && (
                <>
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 fill-red-500" />
                  <span className="font-medium">{rating}</span>
                </>
              )}
              {rating != null && joinedDate && <span>•</span>}
              {joinedDate && (
                <span>
                  На сайте с {new Date(joinedDate).toLocaleDateString("ru-RU", { month: "long", year: "numeric" })}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      {description && (
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      )}

      <Button variant="secondary" className="w-full" onClick={onMessageClick}>
        Отправить сообщение
      </Button>
    </div>
  );
}
