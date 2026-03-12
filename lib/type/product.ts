export type ProductResponse = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: category;
  images: [];
};

export type ProductRequest = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};

export type UploadResponse = {
  originalname: string;
  filename: string;
  location: string;
};

export type Category = {
  id: number;
  name: string;
  image: string;
};
