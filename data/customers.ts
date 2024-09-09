// data/customers.ts

export interface Order {
  date: string;
  orderId: string;
  items: string;
  price: string;
  dateDelivered: string;
  status: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  lastActivity?: string;
  orders?: Order[];
  avatarUrl?: string;
}

export const customers: Customer[] = [
  {
      name: "Emeka Okoli",
      email: "EmekaOkoli@gmail.com",
      phone: "09123489764",
      address1: "Street Address 1",
      address2: "Street Address 2",
      city: "Lagos, Nigeria",
      country: "Nigeria",
      lastActivity: "31st July - 2024",
      avatarUrl: "/images/hehe.jpeg",
      orders: [
          { date: "20-07-2024", orderId: "#657892", items: "6 pieces", price: "₦48,000", dateDelivered: "20-07-2024", status: "Completed" },
          { date: "25-07-2024", orderId: "#657892", items: "10 cartons", price: "₦120,000", dateDelivered: "-----", status: "Cancelled" },
          { date: "12-08-2024", orderId: "#657892", items: "8 packs", price: "₦65,000", dateDelivered: "12-07-2024", status: "Completed" },
          { date: "19-08-2024", orderId: "#657892", items: "9 pieces", price: "₦80,000", dateDelivered: "19-07-2024", status: "Completed" },
          { date: "25-07-2024", orderId: "#657892", items: "10 cartons", price: "₦120,000", dateDelivered: "-----", status: "Processing" },
          { date: "12-08-2024", orderId: "#657892", items: "8 packs", price: "₦65,000", dateDelivered: "12-07-2024", status: "Completed" },
          { date: "19-08-2024", orderId: "#657892", items: "9 pieces", price: "₦80,000", dateDelivered: "19-07-2024", status: "Completed" },
      ]
  },
  { name: "Chinedu Okafor", email: "ChineduOkafor@gmail.com", phone: "09011542273" },
  { name: "Amaka Umeh", email: "AmakaUmeh@gmail.com", phone: "07065432109" },
  { name: "Chinedu Okafor", email: "ChineduOkafor@gmail.com", phone: "09011542273" },
    { name: "Amaka Umeh", email: "AmakaUmeh@gmail.com", phone: "07065432109" },
    { name: "Tochukwu Nwosu", email: "TochukwuNwosu@gmail.com", phone: "08098765432" },
    { name: "Adaora Okpala", email: "AdaoraOkpala@gmail.com", phone: "09087654321" },
    { name: "Emeka Nnamani", email: "EmekaNnamani@gmail.com", phone: "07012345678" },
    { name: "Ngozi Eze", email: "NgoziEze@gmail.com", phone: "08054321098" },
    { name: "Ikechukwu Okorie", email: "IkechukwuOkorie@gmail.com", phone: "09021098765" },
    { name: "Nneka Okafor", email: "NnekaOkafor@gmail.com", phone: "07098765432" },
    { name: "Kelechi Nwosu", email: "KelechiNwosu@gmail.com", phone: "08076543210" },
    { name: "Chioma Eze", email: "ChiomaEze@gmail.com", phone: "09023456789" },
    { name: "Obinna Umeh", email: "ObinnaUmeh@gmail.com", phone: "07054321098" },
    { name: "Amara Okorie", email: "AmaraOkorie@gmail.com", phone: "08098765432" },
    { name: "Nnamdi Nwosu", email: "NnamdiNwosu@gmail.com", phone: "09012345678" },
    { name: "Onyinye Okpala", email: "OnyinyeOkpala@gmail.com", phone: "07098765432" },
    { name: "Ugochukwu Eze", email: "UgochukwuEze@gmail.com", phone: "08054321098" },
    { name: "Nkechi Okafor", email: "NkechiOkafor@gmail.com", phone: "09021098765" },
    { name: "Chinonso Nnamani", email: "ChinonsoNnamani@gmail.com", phone: "07076543210" },
    { name: "Ebube Okorie", email: "EbubeOkorie@gmail.com", phone: "08023456789" },
    { name: "Uche Umeh", email: "UcheUmeh@gmail.com", phone: "09054321098" },
    { name: "Chidiebere Nwosu", email: "ChidiebereNwosu@gmail.com", phone: "07098765432" },
  // ... add all your other customers here
];