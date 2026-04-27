export interface Item {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  brand: string;
  specs: Record<string, string>;
  inStock: boolean;
  addedBy?: string;
  createdAt?: string;
}

export const CATEGORIES = ["All", "Audio", "Computing", "Mobile", "Gaming", "Smart Home", "Wearables"];

export const staticItems: Item[] = [
  {
    id: "1",
    title: "Sony WH-1000XM5 Headphones",
    shortDescription: "Industry-leading noise cancellation with 30-hour battery life.",
    fullDescription: "The Sony WH-1000XM5 delivers unparalleled noise cancellation powered by two processors and eight microphones. With 30 hours of battery life and crystal-clear hands-free calling, these over-ear headphones redefine what wireless audio can be. Multipoint connection lets you pair with two devices simultaneously.",
    price: 349.99,
    category: "Audio",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    brand: "Sony",
    specs: { "Driver Size": "30mm", "Frequency Response": "4Hz–40kHz", "Battery": "30 hours", "Connectivity": "Bluetooth 5.2", "Weight": "250g" },
    inStock: true,
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    title: "Apple MacBook Pro 14\" M3",
    shortDescription: "Blazing M3 chip performance in a stunning Liquid Retina XDR display.",
    fullDescription: "The MacBook Pro 14-inch with M3 chip delivers exceptional performance for pros. The Liquid Retina XDR display with ProMotion technology goes up to 120Hz for incredibly smooth scrolling and interaction. With up to 18 hours of battery life and the power of M3, it handles intensive workflows with ease.",
    price: 1999.00,
    category: "Computing",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    brand: "Apple",
    specs: { "Chip": "Apple M3", "RAM": "18GB Unified Memory", "Storage": "512GB SSD", "Display": "14.2\" Liquid Retina XDR", "Battery": "18 hours" },
    inStock: true,
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    title: "Samsung Galaxy S24 Ultra",
    shortDescription: "AI-powered photography and the legendary S Pen in a titanium frame.",
    fullDescription: "The Galaxy S24 Ultra raises the bar with Galaxy AI features that transform how you communicate, create, and connect. The 200MP camera with AI zoom delivers incredible detail, while the integrated S Pen lets you capture ideas instantly. Built with titanium for unmatched durability.",
    price: 1299.99,
    category: "Mobile",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
    brand: "Samsung",
    specs: { "Display": "6.8\" Dynamic AMOLED 2X", "Processor": "Snapdragon 8 Gen 3", "Camera": "200MP main", "Battery": "5000mAh", "Storage": "256GB" },
    inStock: true,
    createdAt: "2024-01-20",
  },
  {
    id: "4",
    title: "PlayStation 5 Slim",
    shortDescription: "Next-gen gaming with lightning-fast SSD and stunning 4K visuals.",
    fullDescription: "The PlayStation 5 Slim features a refined design that's 30% smaller than the original PS5 while delivering the same incredible gaming experience. With its custom SSD, games load in the blink of an eye and the DualSense controller's haptic feedback pulls you deeper into gameplay.",
    price: 449.99,
    category: "Gaming",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&q=80",
    brand: "Sony",
    specs: { "CPU": "AMD Zen 2, 8 cores", "GPU": "AMD RDNA 2, 10.28 TFLOPS", "Storage": "1TB NVMe SSD", "Resolution": "Up to 8K", "Frame Rate": "Up to 120fps" },
    inStock: false,
    createdAt: "2024-02-01",
  },
  {
    id: "5",
    title: "Amazon Echo Hub",
    shortDescription: "Smart home control panel with 8-inch display and Alexa built-in.",
    fullDescription: "Echo Hub is a versatile smart home control panel designed to put all your compatible smart home devices at your fingertips. The 8-inch display makes it easy to control lights, locks, cameras, and more. Built-in Alexa lets you use voice commands for hands-free control throughout your home.",
    price: 179.99,
    category: "Smart Home",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    brand: "Amazon",
    specs: { "Display": "8\" HD touchscreen", "Processor": "Quad-core", "Connectivity": "Wi-Fi, Zigbee, Bluetooth", "Voice": "Alexa built-in", "Mount": "Wall-mountable" },
    inStock: true,
    createdAt: "2024-02-10",
  },
  {
    id: "6",
    title: "Apple Watch Ultra 2",
    shortDescription: "The most rugged and capable Apple Watch for extreme adventures.",
    fullDescription: "Apple Watch Ultra 2 is designed for athletes and adventurers who push limits. With a titanium case, sapphire crystal display, and up to 60-hour battery life, it handles whatever you throw at it. Precision dual-frequency GPS delivers exceptional accuracy even in challenging environments.",
    price: 799.00,
    category: "Wearables",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    brand: "Apple",
    specs: { "Case": "49mm Titanium", "Display": "Sapphire crystal LTPO OLED", "Battery": "Up to 60 hours", "Water Resistance": "100m", "GPS": "Dual-frequency L1 & L5" },
    inStock: true,
    createdAt: "2024-02-15",
  },
  {
    id: "7",
    title: "Bose QuietComfort 45",
    shortDescription: "Premium noise cancellation with legendary Bose acoustic performance.",
    fullDescription: "The Bose QuietComfort 45 headphones blend iconic acoustic performance with advanced noise cancelling technology. Aware Mode lets the environment in at the touch of a button, and with up to 24 hours of battery life, you can listen all day. Lightweight, foldable design makes them perfect for travel.",
    price: 279.99,
    category: "Audio",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
    brand: "Bose",
    specs: { "Battery": "24 hours", "Connectivity": "Bluetooth 5.1", "Modes": "Quiet & Aware", "Weight": "238g", "Foldable": "Yes" },
    inStock: true,
    createdAt: "2024-02-20",
  },
  {
    id: "8",
    title: "NVIDIA GeForce RTX 4080",
    shortDescription: "Ultimate gaming GPU with DLSS 3 and ray tracing performance.",
    fullDescription: "The GeForce RTX 4080 is built with the ultra-efficient NVIDIA Ada Lovelace architecture, delivering a massive leap in performance and AI-powered graphics. Experience lifelike virtual worlds with ray tracing and DLSS 3, NVIDIA's revolutionary AI rendering technology.",
    price: 1199.99,
    category: "Computing",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
    brand: "NVIDIA",
    specs: { "CUDA Cores": "9728", "VRAM": "16GB GDDR6X", "Memory Bandwidth": "717GB/s", "Power": "320W TDP", "Outputs": "3x DP 1.4a, HDMI 2.1" },
    inStock: true,
    createdAt: "2024-03-01",
  },
  {
    id: "9",
    title: "Razer DeathAdder V3 Pro",
    shortDescription: "Wireless gaming mouse with 90-hour battery and HyperSpeed tech.",
    fullDescription: "The Razer DeathAdder V3 Pro is engineered for competitive play. The iconic ergonomic shape has been refined with a hollow design that cuts weight to just 64g. HyperSpeed wireless technology delivers a connection that's up to 25% faster than other wireless technologies.",
    price: 149.99,
    category: "Gaming",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80",
    brand: "Razer",
    specs: { "DPI": "Up to 30,000", "Battery": "90 hours", "Weight": "64g", "Buttons": "6 programmable", "Sensor": "Razer Focus Pro 30K" },
    inStock: true,
    createdAt: "2024-03-05",
  },
  {
    id: "10",
    title: "Google Nest Thermostat",
    shortDescription: "Smart thermostat that learns your schedule and saves energy.",
    fullDescription: "The Google Nest Learning Thermostat automatically creates a custom schedule based on what temperatures you like and when you're usually home. It programs itself in about a week and continues to adjust on its own. The Nest Leaf appears when you choose a temperature that saves energy.",
    price: 129.99,
    category: "Smart Home",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    brand: "Google",
    specs: { "Display": "2.08\" color LCD", "Connectivity": "Wi-Fi, Bluetooth", "Compatibility": "95% of heating systems", "Sensors": "Temp, humidity, activity", "Power": "Battery or C-wire" },
    inStock: true,
    createdAt: "2024-03-10",
  },
  {
    id: "11",
    title: "Samsung Galaxy Watch 6 Classic",
    shortDescription: "Iconic rotating bezel with advanced health monitoring.",
    fullDescription: "The Galaxy Watch 6 Classic brings back the iconic rotating bezel with a modern twist. Advanced health features including body composition analysis, sleep coaching, and irregular heart rhythm notification help you understand your body better. Galaxy AI features bring smart assistance to your wrist.",
    price: 399.99,
    category: "Wearables",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    brand: "Samsung",
    specs: { "Display": "1.5\" Super AMOLED", "Battery": "Up to 40 hours", "Water Resistance": "5ATM + IP68", "Bezel": "Rotating", "Sensors": "BioActive, Accelerometer, Gyro" },
    inStock: false,
    createdAt: "2024-03-15",
  },
  {
    id: "12",
    title: "iPad Pro 13\" M4",
    shortDescription: "The thinnest Apple product ever with the Ultra Retina XDR display.",
    fullDescription: "iPad Pro with M4 chip is the most advanced iPad ever. With the extraordinary Ultra Retina XDR display featuring Apple's tandem OLED technology for the first time, incredible performance of M4, and Apple Pencil Pro support, it's the ultimate device for creativity and productivity.",
    price: 1299.00,
    category: "Computing",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    brand: "Apple",
    specs: { "Chip": "Apple M4", "Display": "13\" Ultra Retina XDR OLED", "Storage": "256GB", "Camera": "12MP Wide + 10MP Ultra Wide", "Battery": "Up to 10 hours" },
    inStock: true,
    createdAt: "2024-03-20",
  },
];

export function getStoredItems(): Item[] {
  if (typeof window === "undefined") return staticItems;
  try {
    const stored = localStorage.getItem("nexus_items");
    const userItems: Item[] = stored ? JSON.parse(stored) : [];
    return [...staticItems, ...userItems];
  } catch {
    return staticItems;
  }
}

export function addStoredItem(item: Item): void {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem("nexus_items");
    const userItems: Item[] = stored ? JSON.parse(stored) : [];
    userItems.push(item);
    localStorage.setItem("nexus_items", JSON.stringify(userItems));
  } catch {
    console.error("Failed to save item");
  }
}

export function deleteStoredItem(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem("nexus_items");
    const userItems: Item[] = stored ? JSON.parse(stored) : [];
    const filtered = userItems.filter((i) => i.id !== id);
    localStorage.setItem("nexus_items", JSON.stringify(filtered));
  } catch {
    console.error("Failed to delete item");
  }
}
