// app/data/categories.ts
import { Ionicons } from "@expo/vector-icons";

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon: IconName;
  subCategories: SubCategory[];
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Mobile Brands',
    icon: 'phone-portrait-outline' as IconName,
    subCategories: [
      { id: '1-1', name: 'HUAWEI' },
      { id: '1-2', name: 'SAMSUNG' },
      { id: '1-3', name: 'NOKIA' },
      { id: '1-4', name: 'GREENTEL' },
      { id: '1-5', name: 'ETEL' },
      { id: '1-6', name: 'MICROMAX' },
      { id: '1-7', name: 'TELIGO' },
      { id: '1-8', name: 'LEPHONE' },
      { id: '1-9', name: 'LAVA' },
      { id: '1-10', name: 'OPPO' },
      { id: '1-11', name: 'LG' },
      { id: '1-12', name: 'I tel' },
      { id: '1-13', name: 'DITEL' },
      { id: '1-14', name: 'ZIGO TECHNOLOGY' },
      { id: '1-15', name: 'MI' },
      { id: '1-16', name: 'STAR MOBILE' },
      { id: '1-17', name: 'REAL ME' },
      { id: '1-18', name: 'VIVO' },
      { id: '1-19', name: 'BIRD' },
      { id: '1-20', name: 'ZTE' },
      { id: '1-21', name: 'I PHONE' },
      { id: '1-22', name: 'KGTEL' },
      { id: '1-23', name: 'INFINIX' },
      { id: '1-24', name: 'TECNO' },
      { id: '1-25', name: 'TCL' },
      { id: '1-26', name: 'COOLPAD' },
      { id: '1-27', name: 'HOTWAV' },
      { id: '1-28', name: 'SOFTLOGIC' },
      { id: '1-29', name: 'BLACK VIEW' },
      { id: '1-30', name: 'HMD' },
    ],
  },
  {
    id: '2',
    name: 'Batteries',
    icon: 'battery-charging-outline' as IconName,
    subCategories: [
      { id: '2-1', name: 'Mobile Batteries' },
      { id: '2-2', name: 'Rechargeable Batteries' },
    ],
  },
  {
    id: '3',
    name: 'Screen Protection',
    icon: 'shield-outline' as IconName,
    subCategories: [
      { id: '3-1', name: 'Tempered Glass' },
      { id: '3-2', name: 'Full Tempered Glass' },
    ],
  },
  {
    id: '4',
    name: 'Chargers',
    icon: 'flash-outline' as IconName,
    subCategories: [
      { id: '4-1', name: 'Mobile Chargers' },
      { id: '4-2', name: 'Car Chargers' },
    ],
  },
  {
    id: '5',
    name: 'Cables',
    icon: 'usb-outline' as IconName,
    subCategories: [
      { id: '5-1', name: 'Data Cables' },
    ],
  },
  {
    id: '6',
    name: 'Audio',
    icon: 'headset-outline' as IconName,
    subCategories: [
      { id: '6-1', name: 'Hands Free' },
    ],
  },
  {
    id: '7',
    name: 'Cases & Covers',
    icon: 'folder-open-outline' as IconName,
    subCategories: [
      { id: '7-1', name: 'Back Covers' },
      { id: '7-2', name: 'Book Pouches' },
    ],
  },
  {
    id: '8',
    name: 'Memory & Storage',
    icon: 'save-outline' as IconName,
    subCategories: [
      { id: '8-1', name: 'Memory Cards' },
      { id: '8-2', name: 'Pen Drives' },
    ],
  },
  {
    id: '9',
    name: 'Mounts & Holders',
    icon: 'phone-portrait-outline' as IconName,
    subCategories: [
      { id: '9-1', name: 'Phone Holders' },
    ],
  },
  {
    id: '10',
    name: 'Wearables',
    icon: 'watch-outline' as IconName,
    subCategories: [
      { id: '10-1', name: 'Smart Watches' },
    ],
  },
  {
    id: '11',
    name: 'Power Banks',
    icon: 'battery-full-outline' as IconName,
    subCategories: [
      { id: '11-1', name: 'Power Banks' },
    ],
  },
  {
    id: '12',
    name: 'Repair Services',
    icon: 'construct-outline' as IconName,
    subCategories: [
      { id: '12-1', name: 'Phone Repair' },
    ],
  },
  {
    id: '13',
    name: 'Other Accessories',
    icon: 'grid-outline' as IconName,
    subCategories: [
      { id: '13-1', name: 'Rings' },
      { id: '13-2', name: 'Housing' },
      { id: '13-3', name: 'Other Items' },
    ],
  },
];