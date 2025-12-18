
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'GX-9000 Phantom GPU',
    category: 'Components',
    price: 215000,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-high performance GPU with liquid cooling and RGB synchronization.',
    specs: { 'VRAM': '24GB GDDR6X', 'Clock': '2.8 GHz', 'Cores': '16384' },
    rating: 4.9,
    stock: 5,
    isNew: true
  },
  {
    id: '2',
    name: 'NeonPulse Mechanical Keyboard',
    category: 'Peripherals',
    price: 24500,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800',
    description: 'Hot-swappable switches with customizable tactile feedback and OLED display.',
    specs: { 'Switches': 'Silver Speed', 'Layout': '75%', 'Latency': '1ms' },
    rating: 4.7,
    stock: 12
  },
  {
    id: '3',
    name: 'Zero-G Wireless Mouse',
    category: 'Peripherals',
    price: 15800,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-lightweight gaming mouse weighing only 49g with a 32K DPI sensor.',
    specs: { 'Weight': '49g', 'Sensor': 'GX-Optical 2.0', 'Battery': '80 Hours' },
    rating: 4.8,
    stock: 25
  },
  {
    id: '4',
    name: 'SonicBlast 7.1 Headset',
    category: 'Audio',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    description: 'Planar magnetic drivers for distortion-free spatial audio and noise-canceling mic.',
    specs: { 'Driver': 'Planar Magnetic', 'Range': '10Hz-50kHz', 'Interface': 'Wireless 2.4GHz' },
    rating: 4.6,
    stock: 8,
    isNew: true
  },
  {
    id: '5',
    name: 'Titan-X Gaming Laptop',
    category: 'Laptops',
    price: 410000,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800',
    description: 'A monster machine with a 240Hz OLED display and 13th Gen processing power.',
    specs: { 'CPU': 'Intel Core i9-13980HX', 'RAM': '64GB', 'Screen': '17" OLED 240Hz' },
    rating: 4.9,
    stock: 3
  },
  {
    id: '6',
    name: 'GX Curved 34" Ultrawide',
    category: 'Peripherals',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    description: 'Immersive 1500R curvature with 175Hz refresh rate and HDR1000 support.',
    specs: { 'Resolution': '3440 x 1440', 'Refresh': '175Hz', 'Panel': 'QD-OLED' },
    rating: 4.8,
    stock: 10
  },
  {
    id: '7',
    name: 'Ryzen 9 7950X Processor',
    category: 'Components',
    price: 88500,
    image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=800',
    description: 'Dominating performance for gamers and creators with 16 cores and 32 threads.',
    specs: { 'Cores': '16', 'Threads': '32', 'Boost': '5.7 GHz' },
    rating: 4.9,
    stock: 15
  },
  {
    id: '8',
    name: 'Astro-Capture 4K Card',
    category: 'Components',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800',
    description: 'Pro-level streaming capture card with 4K60 HDR10 passthrough.',
    specs: { 'Max Res': '4K60', 'Interface': 'PCIe', 'Encoding': 'HEVC' },
    rating: 4.5,
    stock: 20
  },
  {
    id: '9',
    name: 'Apex Throne Gaming Chair',
    category: 'Peripherals',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fce66?auto=format&fit=crop&q=80&w=800',
    description: 'Ergonomic lumbar support with 4D armrests and breathable premium fabric.',
    specs: { 'Material': 'Breathable Fabric', 'Weight Limit': '150kg', 'Recline': '165°' },
    rating: 4.7,
    stock: 6,
    isNew: true
  },
  {
    id: '10',
    name: 'StudioFlux XLR Mic',
    category: 'Audio',
    price: 28900,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800',
    description: 'Broadcast-grade condenser microphone for crystal clear commentary.',
    specs: { 'Type': 'Condenser', 'Pattern': 'Cardioid', 'Connection': 'XLR' },
    rating: 4.6,
    stock: 14
  },
  {
    id: '11',
    name: 'Phantom Edge 14',
    category: 'Laptops',
    price: 285000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-slim 14" powerhouse featuring a titanium chassis and vapor chamber cooling.',
    specs: { 'CPU': 'Ryzen 9 8945HS', 'GPU': 'RTX 4070', 'Screen': '14" Mini-LED 165Hz' },
    rating: 4.8,
    stock: 7,
    isNew: true
  },
  {
    id: '12',
    name: 'Nebula Pro 16',
    category: 'Laptops',
    price: 355000,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate creator laptop with dual-screen interface and color-accurate 4K panel.',
    specs: { 'CPU': 'Core i7-14700HX', 'RAM': '32GB DDR5', 'Storage': '2TB Gen5 NVMe' },
    rating: 4.7,
    stock: 4
  },
  {
    id: '13',
    name: 'GX Stealth Ultra',
    category: 'Laptops',
    price: 520000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
    description: 'Full desktop replacement in a portable frame. Liquid metal thermal paste pre-applied.',
    specs: { 'GPU': 'RTX 4090 (175W)', 'CPU': 'i9-14900HX', 'RAM': '96GB' },
    rating: 5.0,
    stock: 2,
    isNew: true
  },
  {
    id: '14',
    name: 'Echo-X Studio Buds',
    category: 'Audio',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    description: 'Gaming-grade low latency earbuds with ANC and 360 spatial mapping.',
    specs: { 'Latency': '20ms', 'Battery': '32h Total', 'Drivers': '12mm Graphene' },
    rating: 4.5,
    stock: 30
  },
  {
    id: '15',
    name: 'SonicBoom Soundbar',
    category: 'Audio',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800',
    description: 'Compact under-monitor soundbar with integrated subwoofer and RGB reactive lighting.',
    specs: { 'Output': '120W Peak', 'Channels': '2.1', 'Connectivity': 'Optical/USB-C/BT' },
    rating: 4.8,
    stock: 9
  },
  {
    id: '16',
    name: 'GlideMaster XL RGB',
    category: 'Peripherals',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=800',
    description: 'Extra-large micro-woven desk mat with 12-zone RGB edge lighting.',
    specs: { 'Size': '900x400mm', 'Surface': 'Speed-Texture', 'Base': 'Non-slip Rubber' },
    rating: 4.9,
    stock: 50
  },
  {
    id: '17',
    name: 'Pulse-Click Macropad',
    category: 'Peripherals',
    price: 12900,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
    description: 'Dedicated 12-key macropad for streamers and power users with aluminum dials.',
    specs: { 'Keys': '12 Mechanical', 'Dials': '2 Rotary', 'Backlight': 'Per-key RGB' },
    rating: 4.6,
    stock: 18
  },
  {
    id: '18',
    name: 'GX Liquid-Freeze 360',
    category: 'Components',
    price: 29500,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800',
    description: 'High-performance AIO cooler with a customizable LCD pump head.',
    specs: { 'Radiator': '360mm', 'LCD': '2.4" IPS', 'Socket': 'AM5/LGA1700' },
    rating: 4.7,
    stock: 11
  },
  {
    id: '19',
    name: 'Quantum-DDR5 64GB Kit',
    category: 'Components',
    price: 58000,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=800',
    description: 'Extreme speed memory modules with low-profile brushed aluminum heat spreaders.',
    specs: { 'Speed': '8000 MT/s', 'Capacity': '64GB (2x32)', 'CAS': 'CL34' },
    rating: 4.9,
    stock: 8,
    isNew: true
  },
  {
    id: '20',
    name: 'Hyper-NVMe 4TB Gen5',
    category: 'Components',
    price: 72000,
    image: 'https://images.unsplash.com/photo-1597872200370-499de466a106?auto=format&fit=crop&q=80&w=800',
    description: 'Blistering Gen5 storage speeds with an active cooling heatsink included.',
    specs: { 'Read': '14,000 MB/s', 'Write': '12,000 MB/s', 'Endurance': '3000 TBW' },
    rating: 5.0,
    stock: 6,
    isNew: true
  }
];

export const CATEGORIES = ['All', 'Components', 'Peripherals', 'Laptops', 'Audio'];
