"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Package,
  Truck,
  Battery,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProductCard } from "@/components/widgets/ProductCard";
import { OwnerCard } from "@/components/widgets/OwnerCard";

const productDetails = [
  {
    id: 1,
    title: "Дрель-шуруповёрт DeWalt DCD796",
    price: 650,
    originalPrice: 850,
    rating: 4.9,
    reviewCount: 47,
    location: "Москва, Центральный район",
    owner: {
      name: "Александр М.",
      avatar: "",
      rating: 5.0,
      joinedDate: "Сентябрь 2022",
    },
    images: [
      "https://images.unsplash.com/photo-1710242078536-fe62a305a86c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JkbGVzcyUyMGRyaWxsJTIwZHJpdmVyfGVufDF8fHx8MTc3MTU3MTg2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1760376208640-2ece4c4a0adc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1tZXIlMjBkcmlsbCUyMGNvbnN0cnVjdGlvbiUyMHRvb2x8ZW58MXx8fHwxNzcxNTcxODY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1751486403850-fae53b6ab0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtpdGElMjBkcmlsbCUyMHNldCUyMGNhc2V8ZW58MXx8fHwxNzcxNTczOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    features: [
      { icon: Package, label: "Отличное состояние" },
      { icon: Truck, label: "Доставка в тот же день" },
      { icon: Battery, label: "Батарея и зарядное устройство в комплекте" },
    ],
    description: `Сверхкомпактная дрель-шуруповёрт идеально подходит для сверления:

Подходит для небольших проектов

Поставляется с двумя батареями и зарядным устройством

Я могу при необходимости включить набор сверл, которые вы видите на первой картинке, но если вы берете инструмент на более длительный срок, пожалуйста, будьте осторожны с ними. Прочитайте больше`,
    reviews: [
      {
        id: 1,
        author: "Иван К.",
        rating: 5,
        date: "12 января 2026",
        text: "Отличный инструмент! Александр был очень любезен и услужлив.",
      },
      {
        id: 2,
        author: "Мария С.",
        rating: 5,
        date: "5 января 2026",
        text: "Быстрая доставка, инструмент в идеальном состоянии!",
      },
      {
        id: 3,
        author: "Дмитрий П.",
        rating: 4,
        date: "28 декабря 2025",
        text: "Хороший инструмент, мощный и удобный в использовании.",
      },
    ],
    relatedProducts: [
      {
        id: 2,
        title: "Перфоратор Bosch",
        price: 900,
        period: "день",
        rating: 5.0,
        reviews: 145,
        location: "Москва, Южный округ",
        owner: "Александр М.",
        popular: false,
        image:
          "https://images.unsplash.com/photo-1770386582823-3a7094e35b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3NjaCUyMGhhbW1lciUyMGRyaWxsJTIwY2FzZXxlbnwxfHx8fDE3NzE1NzM5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: 3,
        title: "Шуруповёрт Makita",
        price: 550,
        period: "день",
        rating: 4.8,
        reviews: 203,
        location: "Москва, Центр",
        owner: "Александр М.",
        popular: true,
        image:
          "https://images.unsplash.com/photo-1751486403850-fae53b6ab0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtpdGElMjBkcmlsbCUyMHNldCUyMGNhc2V8ZW58MXx8fHwxNzcxNTczOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: 4,
        title: "Электролобзик Bosch",
        price: 500,
        period: "день",
        rating: 4.7,
        reviews: 56,
        location: "Москва, Центр",
        owner: "Александр М.",
        popular: false,
        image:
          "https://images.unsplash.com/photo-1615746363486-92cd8c5e0a90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaWdzYXclMjBwb3dlciUyMHRvb2x8ZW58MXx8fHwxNzcxNTcxODY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: 5,
        title: "Циркулярная пила Makita",
        price: 700,
        period: "день",
        rating: 4.9,
        reviews: 145,
        location: "Москва, Центр",
        owner: "Александр М.",
        popular: true,
        image:
          "https://images.unsplash.com/photo-1619759247378-6a73e3ad45f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWxhciUyMHNhdyUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NzE1NzE4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      },
    ],
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const productData =
    productDetails.find((p) => p.id === Number(id)) ?? productDetails[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Дрели и шуруповёрты", href: "/catalog" },
            { label: "DeWalt дрель-шуруповёрт" },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Images */}
          <div className="lg:sticky lg:top-24 self-start">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
              <ImageWithFallback
                src={productData.images[selectedImage]}
                alt={productData.title}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-4">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square w-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-yellow-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${productData.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Booking */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {productData.title}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <MapPin className="w-5 h-5" />
              <span>{productData.location}</span>
            </div>

            {/* Owner Card */}
            <OwnerCard
              name={productData.owner.name}
              rating={productData.owner.rating}
              joinedDate={productData.owner.joinedDate}
              features={productData.features}
            />

            {/* Description */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4">Описание</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {productData.description}
              </p>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4">Местоположение</h3>
              <div className="relative w-full h-64 rounded-xl overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=37.6060%2C55.7617&z=15&pt=37.6060%2C55.7617%2Cpm2rdm&l=map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-xl"
                  title="Яндекс Карта"
                />
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Выберите даты</h3>
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  {productData.price}₽
                </span>
                <span className="text-xl text-gray-500 line-through">
                  {productData.originalPrice}₽
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">за день аренды</p>

              <div className="space-y-3">
                <Button variant="primary" size="lg" className="w-full text-lg">
                  Отправить запрос
                </Button>
                <p className="text-xs text-center text-gray-500">
                  🔒 Вы не будете платить до подтверждения
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Отзывы</h2>
          <div className="space-y-6">
            {productData.reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-yellow-100 text-yellow-600">
                        {review.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{review.author}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-orange-400 fill-orange-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline">Показать больше отзывов</Button>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Другие предложения от {productData.owner.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productData.relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                period={product.period}
                rating={product.rating}
                reviews={product.reviews}
                location={product.location}
                owner={product.owner}
                popular={product.popular}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
