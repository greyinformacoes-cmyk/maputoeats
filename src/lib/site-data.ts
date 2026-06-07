import foodGrelhado from "@/assets/food-grelhado.jpg";
import foodMassa from "@/assets/food-massa.jpg";
import foodBebida from "@/assets/food-bebida.jpg";
import foodSobremesa from "@/assets/food-sobremesa.jpg";

import {
  Beef,
  Fish,
  Soup,
  Sandwich,
  Pizza,
  Hamburger,
  Coffee,
  CakeSlice,
  type LucideIcon,
} from "lucide-react";

export type Category = { name: string; icon: LucideIcon };

export const categories: Category[] = [
  { name: "Churrasco", icon: Beef },
  { name: "Mariscos", icon: Fish },
  { name: "Comida Moçambicana", icon: Soup },
  { name: "Fast Food", icon: Sandwich },
  { name: "Pizza", icon: Pizza },
  { name: "Hambúrgueres", icon: Hamburger },
  { name: "Cafés", icon: Coffee },
  { name: "Pastelarias", icon: CakeSlice },
];

export type Restaurant = {
  id: string;
  name: string;
  image: string;
  tags: string;
  location: string;
  hours: string;
  rating: number;
};

export const featured: Restaurant[] = [];

export type NewsItem = { image: string; badge: string };

export const news: NewsItem[] = [
  { image: foodGrelhado, badge: "Novo Prato" },
  { image: foodMassa, badge: "Especialidade" },
  { image: foodBebida, badge: "Promoção" },
  { image: foodSobremesa, badge: "Sobremesas" },
];

export type RecentItem = {
  id: string;
  name: string;
  image: string;
  category: string;
  district: string;
};

export const recent: RecentItem[] = [];

