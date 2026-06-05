import restChurrasco from "@/assets/rest-churrasco.jpg";
import restMariscos from "@/assets/rest-mariscos.jpg";
import restMoz from "@/assets/rest-moz.jpg";
import restGarden from "@/assets/rest-garden.jpg";
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

export const featured: Restaurant[] = [
  {
    id: "o-costelo",
    name: "O Costelo",
    image: restChurrasco,
    tags: "Churrascaria",
    location: "Sommerschield, Maputo",
    hours: "Aberto até 23:00",
    rating: 4.6,
  },
  {
    id: "wilsons",
    name: "Wilson's Restaurante",
    image: restMariscos,
    tags: "Mariscos • Moçambicana",
    location: "Costa do Sol, Maputo",
    hours: "Aberto até 22:00",
    rating: 4.7,
  },
  {
    id: "madero",
    name: "Madero Maputo",
    image: restMoz,
    tags: "Churrasco • Steakhouse",
    location: "Polana, Maputo",
    hours: "Aberto até 23:00",
    rating: 4.5,
  },
  {
    id: "jardim",
    name: "Jardim dos Sabores",
    image: restGarden,
    tags: "Moçambicana • Vegetariana",
    location: "Triunfo, Maputo",
    hours: "Aberto até 21:00",
    rating: 4.4,
  },
];

export type NewsItem = { image: string; badge: string };

export const news: NewsItem[] = [
  { image: foodGrelhado, badge: "Novo Prato" },
  { image: foodMassa, badge: "Especialidade" },
  { image: foodBebida, badge: "Promoção" },
  { image: restGarden, badge: "Evento Especial" },
  { image: foodSobremesa, badge: "Sobremesas" },
];

export type RecentItem = {
  id: string;
  name: string;
  image: string;
  category: string;
  district: string;
};

export const recent: RecentItem[] = [
  { id: "sabor-da-terra", name: "Sabor da Terra", image: restMoz, category: "Moçambicana", district: "Malhangalene" },
  { id: "porto-mar", name: "Porto Mar", image: restMariscos, category: "Mariscos", district: "Costa do Sol" },
  { id: "pizzaria-italia", name: "Pizzaria Itália", image: foodMassa, category: "Pizza", district: "Polana" },
  { id: "cafe-central", name: "Café Central", image: foodBebida, category: "Cafés", district: "Baixa da Cidade" },
  { id: "tropical-burgers", name: "Tropical Burgers", image: foodGrelhado, category: "Hambúrgueres", district: "Sommerschield" },
  { id: "doce-sabor", name: "Doce Sabor", image: foodSobremesa, category: "Pastelaria", district: "Alto Maé" },
];
