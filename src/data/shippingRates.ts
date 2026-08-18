// Shipping rates — IMIR Logistics, "Tarif E-com Départ Alger"
// Source: tariff sheet provided by the store. Prices in DZD (H.T).
// Keyed by wilaya code (matches Wilaya.code in algeriaData.ts).
// `home` = توصيل إلى المنزل (Tarif à domicile)
// `desk` = التوصيل إلى مكتب الشركة (Tarif stop desk)
// A missing entry means this wilaya is not currently covered by the carrier.

export interface ShippingRate {
  home: number;
  desk: number;
}

export const SHIPPING_RATES: Record<string, ShippingRate> = {
  "01": { home: 1650, desk: 1000 }, // Adrar
  "02": { home: 800, desk: 450 },   // Chlef
  "03": { home: 900, desk: 500 },   // Laghouat
  "04": { home: 800, desk: 450 },   // Oum El Bouaghi
  "05": { home: 800, desk: 450 },   // Batna
  "06": { home: 800, desk: 450 },   // Béjaïa
  "07": { home: 800, desk: 450 },   // Biskra
  "08": { home: 1400, desk: 700 },  // Béchar
  "09": { home: 650, desk: 450 },   // Blida
  "10": { home: 800, desk: 450 },   // Bouira
  "11": { home: 1650, desk: 1000 }, // Tamanrasset
  "12": { home: 800, desk: 450 },   // Tébessa
  "13": { home: 800, desk: 450 },   // Tlemcen
  "14": { home: 800, desk: 450 },   // Tiaret
  "15": { home: 800, desk: 450 },   // Tizi Ouzou
  "16": { home: 450, desk: 350 },   // Alger
  "17": { home: 900, desk: 500 },   // Djelfa
  "18": { home: 800, desk: 450 },   // Jijel
  "19": { home: 800, desk: 450 },   // Sétif
  "20": { home: 800, desk: 450 },   // Saïda
  "21": { home: 800, desk: 450 },   // Skikda
  "22": { home: 800, desk: 450 },   // Sidi Bel Abbès
  "23": { home: 800, desk: 450 },   // Annaba
  "24": { home: 800, desk: 450 },   // Guelma
  "25": { home: 800, desk: 450 },   // Constantine
  "26": { home: 800, desk: 450 },   // Médéa
  "27": { home: 800, desk: 450 },   // Mostaganem
  "28": { home: 800, desk: 450 },   // M'Sila
  "29": { home: 800, desk: 450 },   // Mascara
  "30": { home: 900, desk: 500 },   // Ouargla
  "31": { home: 800, desk: 450 },   // Oran
  "32": { home: 1100, desk: 500 },  // El Bayadh
  "33": { home: 1800, desk: 1200 }, // Illizi
  "34": { home: 800, desk: 450 },   // Bordj Bou Arreridj
  "35": { home: 650, desk: 450 },   // Boumerdès
  "36": { home: 800, desk: 450 },   // El Tarf
  "37": { home: 1650, desk: 1000 }, // Tindouf
  "38": { home: 800, desk: 450 },   // Tissemsilt
  "39": { home: 900, desk: 500 },   // El Oued
  "40": { home: 800, desk: 450 },   // Khenchela
  "41": { home: 800, desk: 450 },   // Souk Ahras
  "42": { home: 650, desk: 450 },   // Tipaza
  "43": { home: 800, desk: 450 },   // Mila
  "44": { home: 800, desk: 450 },   // Aïn Defla
  "45": { home: 1100, desk: 500 },  // Naâma
  "46": { home: 800, desk: 450 },   // Aïn Témouchent
  "47": { home: 900, desk: 450 },   // Ghardaïa
  "48": { home: 800, desk: 450 },   // Relizane
  "49": { home: 1650, desk: 1000 }, // Timimoun
  // 50 Bordj Badji Mokhtar — not covered by carrier
  "51": { home: 900, desk: 500 },   // Ouled Djellal
  // 52 Béni Abbès — not covered by carrier
  "53": { home: 1650, desk: 700 },  // In Salah
  // 54 In Guezzam — not covered by carrier
  "55": { home: 900, desk: 500 },   // Touggourt
  // 56 Djanet — not covered by carrier
  "57": { home: 900, desk: 500 },   // El M'Ghair
  "58": { home: 1100, desk: 600 },  // El Meniaa
};

export function getShippingRate(wilayaCode: string): ShippingRate | null {
  return SHIPPING_RATES[wilayaCode] || null;
}
