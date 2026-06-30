// data/categories.ts
import { Ionicons } from "@expo/vector-icons";

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export interface Category {
  id: string;
  name: string;
  icon: IconName; // Made required instead of optional
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
}

// Use 'as const' to make the array readonly and more type-safe
export const categories = [
  {
    id: '1',
    name: 'Fast Chargers',
    icon: 'flash-outline' as IconName,
    subCategories: [
      { id: '1-1', name: 'Wireless Chargers' },
      { id: '1-2', name: 'Car Chargers' },
      { id: '1-3', name: 'Wall Chargers' },
    ],
  },
  {
    id: '2',
    name: 'Power Banks',
    icon: 'battery-full-outline' as IconName,
    subCategories: [
      { id: '2-1', name: 'Portable Power Banks' },
      { id: '2-2', name: 'Solar Power Banks' },
    ],
  },
  {
    id: '3',
    name: 'Cables',
    icon: 'usb-outline' as IconName, // Changed from 'cable-outline'
    subCategories: [
      { id: '3-1', name: 'USB-C Cables' },
      { id: '3-2', name: 'Lightning Cables' },
      { id: '3-3', name: 'Micro USB Cables' },
    ],
  },
  {
    id: '4',
    name: 'Audio',
    icon: 'headset-outline' as IconName,
    subCategories: [
      { id: '4-1', name: 'Earphones' },
      { id: '4-2', name: 'Headphones' },
      { id: '4-3', name: 'Speakers' },
    ],
  },
  {
    id: '5',
    name: 'Protection',
    icon: 'shield-outline' as IconName,
    subCategories: [
      { id: '5-1', name: 'Screen Protectors' },
      { id: '5-2', name: 'Phone Cases' },
    ],
  },
  {
    id: '6',
    name: 'Smart Accessories',
    icon: 'watch-outline' as IconName,
    subCategories: [
      { id: '6-1', name: 'Smart Watches' },
      { id: '6-2', name: 'Smart Bands' },
    ],
  },
  {
    id: '7',
    name: 'Camera & Selfie',
    icon: 'camera-outline' as IconName,
    subCategories: [
      { id: '7-1', name: 'Selfie Sticks' },
      { id: '7-2', name: 'Tripods' },
    ],
  },
  {
    id: '8',
    name: 'Mounts & Holders',
    icon: 'phone-portrait-outline' as IconName,
    subCategories: [
      { id: '8-1', name: 'Car Mounts' },
      { id: '8-2', name: 'Desk Holders' },
    ],
  },
  {
    id: '9',
    name: 'Memory & Storage',
    icon: 'save-outline' as IconName,
    subCategories: [
      { id: '9-1', name: 'Memory Cards' },
      { id: '9-2', name: 'USB Drives' },
    ],
  },
  {
    id: '10',
    name: 'Computer Access...',
    icon: 'laptop-outline' as IconName,
    subCategories: [
      { id: '10-1', name: 'Mice' },
      { id: '10-2', name: 'Keyboards' },
    ],
  },
  {
    id: '11',
    name: 'Batteries',
    icon: 'battery-charging-outline' as IconName,
    subCategories: [
      { id: '11-1', name: 'Rechargeable Batteries' },
      { id: '11-2', name: 'Battery Chargers' },
    ],
  },
] as const;

// Type for the categories array
export type CategoryType = typeof categories[number];