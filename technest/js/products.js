const PRODUCT_CATEGORIES = [
  { key: "phones", name: "Ухаалаг утас", icon: "bi-phone" },
  { key: "laptops", name: "Зөөврийн компьютер", icon: "bi-laptop" },
  { key: "headphones", name: "Чихэвч", icon: "bi-headphones" },
  { key: "smart-home", name: "Ухаалаг гэр", icon: "bi-house-gear" },
  { key: "gaming", name: "Тоглоом", icon: "bi-controller" },
  { key: "accessories", name: "Дагалдах хэрэгсэл", icon: "bi-usb-plug" },
];
const productSets = {
  phones: [
    ["iPhone 16 Pro", "Apple"],
    ["Galaxy S25 Ultra", "Samsung"],
    ["Redmi Note 14 Pro", "Xiaomi"],
    ["Pixel 9", "Google"],
    ["Galaxy Z Flip6", "Samsung"],
    ["iPhone 15", "Apple"],
    ["Xiaomi 14T", "Xiaomi"],
    ["OnePlus 13", "OnePlus"],
    ["Galaxy A56", "Samsung"],
    ["iPhone 16", "Apple"],
  ],
  laptops: [
    ["MacBook Air M3", "Apple"],
    ["Zenbook 14 OLED", "ASUS"],
    ["ThinkPad X1 Carbon", "Lenovo"],
    ["Galaxy Book4 Pro", "Samsung"],
    ["Legion 5 Pro", "Lenovo"],
    ["ROG Zephyrus G14", "ASUS"],
    ["MacBook Pro 14", "Apple"],
    ["Yoga Slim 7", "Lenovo"],
    ["RedmiBook Pro 16", "Xiaomi"],
    ["Vivobook S 15", "ASUS"],
  ],
  headphones: [
    ["WH-1000XM5", "Sony"],
    ["AirPods Pro 2", "Apple"],
    ["Galaxy Buds3 Pro", "Samsung"],
    ["QuietComfort Ultra", "Bose"],
    ["Tune 770NC", "JBL"],
    ["Redmi Buds 5 Pro", "Xiaomi"],
    ["Soundcore Liberty 4", "Anker"],
    ["Studio Pro", "Beats"],
    ["Momentum 4", "Sennheiser"],
    ["AirPods 4", "Apple"],
  ],
  "smart-home": [
    ["Nest Hub 2", "Google Nest"],
    ["Echo Dot 5", "Amazon"],
    ["Mi Smart Air Purifier 4", "Xiaomi"],
    ["Hue Starter Kit", "Philips"],
    ["Nest Cam", "Google Nest"],
    ["Smart Plug Mini", "TP-Link"],
    ["Robot Vacuum S10", "Xiaomi"],
    ["Smart LED Strip", "TP-Link"],
    ["Nest Thermostat", "Google Nest"],
    ["Echo Show 8", "Amazon"],
  ],
  gaming: [
    ["PlayStation 5 Slim", "Sony"],
    ["Xbox Series X", "Microsoft"],
    ["Nintendo Switch OLED", "Nintendo"],
    ["DualSense Edge", "Sony"],
    ["ROG Ally X", "ASUS"],
    ["Logitech G Pro X", "Logitech"],
    ["SteelSeries Arctis Nova 7", "SteelSeries"],
    ["Xbox Elite Controller", "Microsoft"],
    ["Razer BlackWidow V4", "Razer"],
    ["Meta Quest 3", "Meta"],
  ],
  accessories: [
    ["MagSafe Charger", "Apple"],
    ["Anker 737 Power Bank", "Anker"],
    ["MX Master 3S", "Logitech"],
    ["Samsung T7 Shield 1TB", "Samsung"],
    ["65W GaN Charger", "Anker"],
    ["USB-C Hub 8-in-1", "UGREEN"],
    ["AirTag 4-pack", "Apple"],
    ["Logitech Brio 4K", "Logitech"],
    ["Mi Band 9", "Xiaomi"],
    ["Baseus 100W Cable", "Baseus"],
  ],
};
const descriptions = [
  "Өдөр тутмын хэрэглээнд зориулсан өндөр гүйцэтгэл, найдвартай ажиллагаатай төхөөрөмж. Орчин үеийн технологи болон ухаалаг шийдлээр хэрэглээг илүү хялбар болгоно.",
  "Чанартай материал, нямбай хийцтэй энэхүү бүтээгдэхүүн таны хэрэгцээнд нийцнэ. Тохиромжтой ажиллагаа, бат бөх чанарыг нэг дор багтаасан.",
  "Шинэ үеийн функц, хурдан ажиллагаа, таатай хэрэглээг санал болгоно. Гэр болон ажилдаа өдөр бүр ашиглахад тохиромжтой.",
];
const PRODUCTS = [];
let productNumber = 1;
PRODUCT_CATEGORIES.forEach((category, ci) =>
  productSets[category.key].forEach((item, i) => {
    const id = "TN" + String(productNumber).padStart(3, "0");
    const price = [
      299000, 459000, 689000, 999000, 1499000, 2199000, 3299000, 4599000,
      5899000, 7299000,
    ][(i + ci * 2) % 10];
    PRODUCTS.push({
      id,
      name: item[0],
      category: category.key,
      brand: item[1],
      price: price + ci * 37000,
      image: `https://picsum.photos/seed/technest-${id}/400/400`,
      specs: {
        Үйлдвэрлэгч: item[1],
        Ангилал: category.name,
        Өнгө: ["Хар", "Цагаан", "Саарал", "Цэнхэр"][i % 4],
        Баталгаа: "12 сар",
        Загвар: item[0],
      },
      rating: [4.5, 4.7, 4.8, 4.6, 4.9][i % 5],
      description: descriptions[(i + ci) % 3],
    });
    productNumber++;
  }),
);
