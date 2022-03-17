export interface Product {
  title: string;
  id: number;
  price: number;
  image: string;
  description: string;
  quantity: number;
  onCartAdd: () => void;
}
