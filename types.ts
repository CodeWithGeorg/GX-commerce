
export interface Product {
  id: string;
  name: string;
  category: 'Components' | 'Peripherals' | 'Laptops' | 'Audio';
  price: number;
  image: string;
  description: string;
  specs: { [key: string]: string };
  rating: number;
  stock: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
