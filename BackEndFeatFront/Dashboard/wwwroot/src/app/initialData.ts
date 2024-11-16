import {ICategory} from "./shared/models/category.model";
import {IProduct} from "./shared/models/product.model";


export const initialProducts: IProduct[] = [
  {
    id: 1,
    name: 'گوشی موبایل سامسونگ',
    description: 'گوشی موبایل سامسونگ گلکسی با ویژگی‌های برتر',
    price: 10000000,
    categoryId: 2, // موبایل و تبلت
    image: 'samsung_galaxy.jpg',
    gallery: [
      { id: 1, url: 'samsung_galaxy_1.jpg' },
      { id: 2, url: 'samsung_galaxy_2.jpg' }
    ],
    stock: 10
  },
  {
    id: 2,
    name: 'تلویزیون ال‌جی',
    description: 'تلویزیون ال‌جی با کیفیت 4K و صفحه نمایش بزرگ',
    price: 20000000,
    categoryId: 3, // صوتی و تصویری
    image: 'lg_tv.jpg',
    gallery: [
      { id: 3, url: 'lg_tv_1.jpg' },
      { id: 4, url: 'lg_tv_2.jpg' }
    ],
    stock: 5
  },
  {
    id: 3,
    name: 'لپ‌تاپ ایسوس',
    description: 'لپ‌تاپ ایسوس با پردازنده قدرتمند و حافظه SSD',
    price: 15000000,
    categoryId: 4, // لپ‌تاپ و کامپیوتر
    image: 'asus_laptop.jpg',
    gallery: [
      { id: 5, url: 'asus_laptop_1.jpg' }
    ],
    stock: 8
  },
  {
    id: 4,
    name: 'دوربین عکاسی کانن',
    description: 'دوربین عکاسی کانن با لنز قابل تعویض و کیفیت بالا',
    price: 30000000,
    categoryId: 5, // دوربین و تجهیزات عکاسی
    image: 'canon_camera.jpg',
    gallery: [
      { id: 6, url: 'canon_camera_1.jpg' },
      { id: 7, url: 'canon_camera_2.jpg' }
    ],
    stock: 12
  },
  {
    id: 5,
    name: 'هدفون بی‌سیم سونی',
    description: 'هدفون بی‌سیم سونی با کیفیت صدای بی‌نظیر',
    price: 2500000,
    categoryId: 6, // هدفون و اسپیکر
    image: 'sony_headphone.jpg',
    gallery: [
      { id: 8, url: 'sony_headphone_1.jpg' }
    ],
    stock: 7
  },
  {
    id: 6,
    name: 'ماشین لباسشویی بوش',
    description: 'ماشین لباسشویی بوش با مصرف انرژی کم و ظرفیت بالا',
    price: 18000000,
    categoryId: 7, // لوازم خانگی
    image: 'bosch_washing_machine.jpg',
    gallery: [
      { id: 9, url: 'bosch_washing_machine_1.jpg' }
    ],
    stock: 9
  },
  {
    id: 7,
    name: 'جاروبرقی فیلیپس',
    description: 'جاروبرقی فیلیپس با قدرت مکش بالا و فیلتر HEPA',
    price: 11000000,
    categoryId: 7, // لوازم خانگی
    image: 'philips_vacuum.jpg',
    gallery: [
      { id: 10, url: 'philips_vacuum_1.jpg' },
      { id: 11, url: 'philips_vacuum_2.jpg' }
    ],
    stock: 15
  },
  {
    id: 8,
    name: 'کتری برقی دلونگی',
    description: 'کتری برقی دلونگی با سرعت جوش بالا و طراحی زیبا',
    price: 1600000,
    categoryId: 7, // لوازم خانگی
    image: 'delonghi_kettle.jpg',
    gallery: [
      { id: 12, url: 'delonghi_kettle_1.jpg' }
    ],
    stock: 20
  },
  {
    id: 9,
    name: 'آبمیوه‌گیری پارس خزر',
    description: 'آبمیوه‌گیری پارس خزر با کارایی بالا و کم صدا',
    price: 900000,
    categoryId: 7, // لوازم خانگی
    image: 'pars_khazar_juicer.jpg',
    gallery: [
      { id: 13, url: 'pars_khazar_juicer_1.jpg' },
      { id: 14, url: 'pars_khazar_juicer_2.jpg' }
    ],
    stock: 18
  },
  {
    id: 10,
    name: 'کت و شلوار مردانه',
    description: 'کت و شلوار مردانه با پارچه مرغوب و طراحی مدرن',
    price: 2200000,
    categoryId: 8, // مد و پوشاک
    image: 'mens_suit.jpg',
    gallery: [
      { id: 15, url: 'mens_suit_1.jpg' }
    ],
    stock: 14
  },
  {
    id: 11,
    name: 'ساعت مچی رولکس',
    description: 'ساعت مچی رولکس با طراحی کلاسیک و کیفیت بالا',
    price: 27000000,
    categoryId: 8, // مد و پوشاک
    image: 'rolex_watch.jpg',
    gallery: [
      { id: 16, url: 'rolex_watch_1.jpg' }
    ],
    stock: 3
  },
  {
    id: 12,
    name: 'کفش ورزشی نایک',
    description: 'کفش ورزشی نایک با طراحی ارگونومیک و کیفیت بالا',
    price: 1400000,
    categoryId: 9, // ورزش و سفر
    image: 'nike_shoes.jpg',
    gallery: [
      { id: 17, url: 'nike_shoes_1.jpg' }
    ],
    stock: 6
  },
  {
    id: 13,
    name: 'چمدان مسافرتی دلسی',
    description: 'چمدان مسافرتی دلسی با ظرفیت بالا و طراحی شیک',
    price: 1900000,
    categoryId: 9, // ورزش و سفر
    image: 'delsey_suitcase.jpg',
    gallery: [
      { id: 18, url: 'delsey_suitcase_1.jpg' }
    ],
    stock: 11
  },
  {
    id: 14,
    name: 'دوچرخه کوهستان جاینت',
    description: 'دوچرخه کوهستان جاینت با فریم مقاوم و دنده‌های کارآمد',
    price: 13000000,
    categoryId: 9, // ورزش و سفر
    image: 'giant_bike.jpg',
    gallery: [
      { id: 19, url: 'giant_bike_1.jpg' }
    ],
    stock: 16
  },
  {
    id: 15,
    name: 'کتاب ناطور دشت',
    description: 'رمان ناطور دشت نوشته جی. دی. سلینجر',
    price: 170000,
    categoryId: 10, // کتاب و لوازم التحریر
    image: 'catcher_in_the_rye.jpg',
    gallery: [
      { id: 20, url: 'catcher_in_the_rye_1.jpg' }
    ],
    stock: 4
  }
];


export const initialCategories: ICategory[] = [
  {
    id: 1,
    name: 'الکترونیک و دستگاه‌های صوتی',
    children: [
      {
        id: 2,
        name: 'موبایل و تبلت',
        children: []
      },
      {
        id: 3,
        name: 'صوتی و تصویری',
        children: []
      }
    ]
  },
  {
    id: 4,
    name: 'کامپیوتر و نرم‌افزار',
    children: []
  },
  {
    id: 5,
    name: 'دوربین و تجهیزات عکاسی',
    children: []
  },
  {
    id: 6,
    name: 'هدفون و اسپیکر',
    children: []
  },
  {
    id: 7,
    name: 'لوازم خانگی',
    children: []
  },
  {
    id: 8,
    name: 'مد و پوشاک',
    children: []
  },
  {
    id: 9,
    name: 'ورزش و سفر',
    children: []
  },
  {
    id: 10,
    name: 'کتاب و لوازم التحریر',
    children: []
  }
];
