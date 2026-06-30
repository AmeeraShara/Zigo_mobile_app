export type SubCategory = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  subCategories: SubCategory[];
};

export const categories: Category[] = [
  {
    id: "chargers",
    name: "Chargers",
    icon: "flash-outline",
    subCategories: [
      { id: "fast-chargers", name: "Fast Chargers" },
      { id: "wireless-chargers", name: "Wireless Chargers" },
      { id: "car-chargers", name: "Car Chargers" },
      { id: "wall-chargers", name: "Wall Chargers" },
      { id: "travel-chargers", name: "Travel Chargers" },
    ],
  },

  {
    id: "power-banks",
    name: "Power Banks",
    icon: "battery-charging-outline",
    subCategories: [
      { id: "5000mah", name: "5000mAh" },
      { id: "10000mah", name: "10000mAh" },
      { id: "20000mah", name: "20000mAh" },
      { id: "magsafe", name: "MagSafe Power Banks" },
      { id: "solar", name: "Solar Power Banks" },
    ],
  },

  {
    id: "cables",
    name: "Cables",
    icon: "git-branch-outline",
    subCategories: [
      { id: "usb-c", name: "USB-C" },
      { id: "lightning", name: "Lightning" },
      { id: "micro-usb", name: "Micro USB" },
      { id: "hdmi", name: "HDMI" },
      { id: "otg", name: "OTG Cables" },
    ],
  },

  {
    id: "audio",
    name: "Audio",
    icon: "headset-outline",
    subCategories: [
      { id: "earbuds", name: "Earbuds" },
      { id: "headphones", name: "Headphones" },
      { id: "bluetooth-speakers", name: "Bluetooth Speakers" },
      { id: "neckbands", name: "Neckbands" },
      { id: "wired-earphones", name: "Wired Earphones" },
    ],
  },

  {
    id: "protection",
    name: "Protection",
    icon: "shield-checkmark-outline",
    subCategories: [
      { id: "phone-cases", name: "Phone Cases" },
      { id: "screen-protectors", name: "Screen Protectors" },
      { id: "camera-lens-protectors", name: "Camera Lens Protectors" },
      { id: "tablet-covers", name: "Tablet Covers" },
      { id: "laptop-sleeves", name: "Laptop Sleeves" },
    ],
  },

  {
    id: "smart-accessories",
    name: "Smart Accessories",
    icon: "watch-outline",
    subCategories: [
      { id: "smart-watches", name: "Smart Watches" },
      { id: "fitness-bands", name: "Fitness Bands" },
      { id: "smart-rings", name: "Smart Rings" },
      { id: "smart-tags", name: "Smart Tags" },
      { id: "wearables", name: "Wearables" },
    ],
  },

  {
    id: "camera-selfie",
    name: "Camera & Selfie",
    icon: "camera-outline",
    subCategories: [
      { id: "tripods", name: "Tripods" },
      { id: "selfie-sticks", name: "Selfie Sticks" },
      { id: "ring-lights", name: "Ring Lights" },
      { id: "phone-camera-lenses", name: "Phone Camera Lenses" },
      { id: "camera-accessories", name: "Camera Accessories" },
    ],
  },

  {
    id: "mount-holders",
    name: "Mount & Holders",
    icon: "car-outline",
    subCategories: [
      { id: "car-mounts", name: "Car Mounts" },
      { id: "bike-holders", name: "Bike Holders" },
      { id: "desk-stands", name: "Desk Stands" },
      { id: "magnetic-holders", name: "Magnetic Holders" },
      { id: "tablet-holders", name: "Tablet Holders" },
    ],
  },

  {
    id: "memory-storage",
    name: "Memory & Storage",
    icon: "save-outline",
    subCategories: [
      { id: "memory-cards", name: "Memory Cards" },
      { id: "usb-flash-drives", name: "USB Flash Drives" },
      { id: "external-ssd", name: "External SSD" },
      { id: "external-hdd", name: "External HDD" },
      { id: "card-readers", name: "Card Readers" },
    ],
  },

  {
    id: "computer-accessories",
    name: "Computer Accessories",
    icon: "laptop-outline",
    subCategories: [
      { id: "keyboards", name: "Keyboards" },
      { id: "mouse", name: "Mouse" },
      { id: "cooling-pads", name: "Cooling Pads" },
      { id: "usb-hubs", name: "USB Hubs" },
      { id: "laptop-bags", name: "Laptop Bags" },
    ],
  },

  {
    id: "batteries",
    name: "Batteries",
    icon: "battery-half-outline",
    subCategories: [
      { id: "aa-batteries", name: "AA Batteries" },
      { id: "aaa-batteries", name: "AAA Batteries" },
      { id: "rechargeable-batteries", name: "Rechargeable Batteries" },
      { id: "button-cell-batteries", name: "Button Cell Batteries" },
      { id: "camera-batteries", name: "Camera Batteries" },
    ],
  },
];