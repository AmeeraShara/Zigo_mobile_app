// src/data/categories.ts

import { Ionicons } from "@expo/vector-icons";

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export interface Category {
  id: string;
  name: string;
  icon: IconName;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
}

export const categories = [
  {
    id: '1',
    name: 'Chargers',
    icon: 'flash-outline' as IconName,
    subCategories: [
      { id: '1-1', name: 'Fast Chargers' },
      { id: '1-2', name: 'Wireless Chargers' },
      { id: '1-3', name: 'Car Chargers' },
      { id: '1-4', name: 'Charging Stations' },
    ],
  },
  {
    id: '2',
    name: 'Power Banks',
    icon: 'battery-full-outline' as IconName,
    subCategories: [
      { id: '2-1', name: '5000mAh' },
      { id: '2-2', name: '10000mAh' },
      { id: '2-3', name: '20000mAh' },
      { id: '2-4', name: 'MagSafe Power Banks' },
    ],
  },
  {
    id: '3',
    name: 'Cables',
    icon: 'usb-outline' as IconName,
    subCategories: [
      { id: '3-1', name: 'USB-C' },
      { id: '3-2', name: 'Lightning' },
      { id: '3-3', name: 'Micro USB' },
      { id: '3-4', name: 'HDMI' },
      { id: '3-5', name: 'Type-C to Type-C' },
    ],
  },
  {
    id: '4',
    name: 'Audio',
    icon: 'headset-outline' as IconName,
    subCategories: [
      { id: '4-1', name: 'Earbuds' },
      { id: '4-2', name: 'Headphones' },
      { id: '4-3', name: 'Bluetooth Speakers' },
      { id: '4-4', name: 'Neckbands' },
    ],
  },
  {
    id: '5',
    name: 'Protection',
    icon: 'shield-outline' as IconName,
    subCategories: [
      { id: '5-1', name: 'Screen Protectors' },
      { id: '5-2', name: 'Phone Cases' },
      { id: '5-3', name: 'Camera Protectors' },
      { id: '5-4', name: 'Laptop Sleeves' },
    ],
  },
  {
    id: '6',
    name: 'Smart Accessories',
    icon: 'watch-outline' as IconName,
    subCategories: [
      { id: '6-1', name: 'Smart Watches' },
      { id: '6-2', name: 'Fitness Bands' },
      { id: '6-3', name: 'Smart Tags' },
      { id: '6-4', name: 'Wearables' },
    ],
  },
  {
    id: '7',
    name: 'Camera & Selfie',
    icon: 'camera-outline' as IconName,
    subCategories: [
      { id: '7-1', name: 'Selfie Sticks' },
      { id: '7-2', name: 'Tripods' },
      { id: '7-3', name: 'Ring Lights' },
      { id: '7-4', name: 'Phone Lenses' },
    ],
  },
  {
    id: '8',
    name: 'Mounts & Holders',
    icon: 'phone-portrait-outline' as IconName,
    subCategories: [
      { id: '8-1', name: 'Car Mounts' },
      { id: '8-2', name: 'Bike Mounts' },
      { id: '8-3', name: 'Desk Holders' },
      { id: '8-4', name: 'Magnetic Holders' },
    ],
  },
  {
    id: '9',
    name: 'Memory & Storage',
    icon: 'save-outline' as IconName,
    subCategories: [
      { id: '9-1', name: 'Micro SD Cards' },
      { id: '9-2', name: 'USB Flash Drives' },
      { id: '9-3', name: 'External SSDs' },
      { id: '9-4', name: 'Memory Card Readers' },
    ],
  },
  {
    id: '10',
    name: 'Computer Accessories',
    icon: 'laptop-outline' as IconName,
    subCategories: [
      { id: '10-1', name: 'Keyboards' },
      { id: '10-2', name: 'Mouse' },
      { id: '10-3', name: 'Webcams' },
      { id: '10-4', name: 'USB Hubs' },
      { id: '10-5', name: 'Laptop Stands' },
    ],
  },
  {
    id: '11',
    name: 'Batteries',
    icon: 'battery-charging-outline' as IconName,
    subCategories: [
      { id: '11-1', name: 'AA Batteries' },
      { id: '11-2', name: 'AAA Batteries' },
      { id: '11-3', name: 'Rechargeable Batteries' },
      { id: '11-4', name: 'Button Cells' },
    ],
  },
] as const;

export type CategoryType = typeof categories[number];