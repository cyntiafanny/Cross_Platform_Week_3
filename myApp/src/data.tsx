import {Recipe, User} from "./state";

export const dataRecipes: Recipe[] = [
  {
    id: 'r1',
    title: 'Nasi Goreng',
    imageUrl: 'https://www.seriouseats.com/2019/06/20190604-nasi-goreng-fried-rice-vicky-wasik-7-1500x1125.jpg',
    ingredients: ['Nasi', 'Bawang Putih', 'Kecap', 'Cabai']
  },
  {
    id: 'r2',
    title: 'Gado-gado',
    imageUrl: 'https://www.masakapahariini.com/wp-content/uploads/2019/01/gado-gado-MAHI-780x440.jpg',
    ingredients: ['Lontong', 'Tempe', 'Tahu', 'Timun']
  },
  {
    id: 'r3',
    title: 'Nasi Campur',
    imageUrl: 'https://img-global.cpcdn.com/recipes/110b2cfb3a70c791/400x400cq70/photo.jpg',
    ingredients: ['Nasi', 'Ayam', 'Sambal', 'Timun']
  }
];

export const dataUsers: User[] = [
  {
    id: 'u1',
    name: 'John Thor',
    imageUrl: 'https://pyxis.nymag.com/v1/imgs/55b/438/d732205198d1fc4b0aafc8bb302e4e68c2-john-wick.2x.rsocial.w600.jpg',
    email: ['john.thor@umn.ac.id','hello@johnthor.com'],
    phone: ['081122334455', '081234567890']
  },
  {
    id: 'u2',
    name: 'John Wick',
    imageUrl: 'https://pyxis.nymag.com/v1/imgs/a85/912/a5ef47190c966169cf6e9c6da815b0f0ad-07-john-wick-2-2.rhorizontal.w700.jpg',
    email: ['john.wick@umn.ac.id','john.wick@gmail.com'],
    phone: ['087812312300', '08151231415']
  }
]