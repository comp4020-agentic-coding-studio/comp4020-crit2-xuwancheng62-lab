// Real HOYTS Canberra/ACT locations, sourced from hoyts.com.au on 2026-08-10.
export interface Cinema {
  slug: string;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
  amenities: string[];
}

export const cinemas: Cinema[] = [
  {
    slug: "belconnen",
    name: "HOYTS Belconnen",
    address: "Level 3, Westfield Belconnen, Benjamin Way, Belconnen ACT 2617",
    phone: "(02) 6223 5300",
    mapUrl: "https://maps.google.com/?q=HOYTS+Belconnen+Benjamin+Way+Belconnen+ACT+2617",
    amenities: ["Xtremescreen", "D-BOX", "Recliners", "Open captioning"],
  },
  {
    slug: "woden",
    name: "HOYTS Woden",
    address: "Bradley Street, Phillip ACT 2606",
    phone: "(02) 6223 5310",
    mapUrl: "https://maps.google.com/?q=HOYTS+Woden+Bradley+Street+Phillip+ACT+2606",
    amenities: ["Recliners", "Open captioning"],
  },
];
