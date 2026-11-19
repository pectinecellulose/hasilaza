// Parse the spare parts list and generate SQL insert statements
const pieces = [
  { name: "Robinet d'essence", compat: "200cc, 250cc et 300cc", stock: 100, price: 1000 },
  { name: "Bache devant", compat: "200cc, 250cc et 300cc", stock: 50, price: 25000 },
  { name: "Cable de frein", compat: "200cc, 250cc et 300cc", stock: 20, price: 1000 },
  { name: "Casque", compat: "200cc, 250cc et 300cc", stock: 50, price: 5000 },
  { name: "Joint de culasse", compat: "200cc, 250cc et 300cc", stock: 50, price: 500 },
  { name: "Arret d'huile", compat: "200cc, 250cc et 300cc", stock: 50, price: 500 },
  { name: "Ressort/Patte moteur", compat: "200cc, 250cc et 300cc", stock: 20, price: 1000 },
  { name: "Faisceau de cable", compat: "200cc, 250cc et 300cc", stock: 10, price: 10000 },
  { name: "Pignon pont 200CC", compat: "200 CC AIR", stock: 40, price: 15000, ref: "200CC" },
  { name: "Roulement pont complet 200CC", compat: "200 CC AIR", stock: 50, price: 12000, ref: "200CC" },
  { name: "Tambour de frein", compat: "200cc, 250cc et 300cc", stock: 10, price: 10000 },
  { name: "Maitre Cylindre principale", compat: "250cc et 300cc", stock: 20, price: 10000 },
  { name: "Maitre Cylindre", compat: "250cc et 300cc", stock: 50, price: 5000 },
  { name: "Filtre complet", compat: "200cc, 250cc et 300cc", stock: 50, price: 5000 },
  { name: "Clacson arriere", compat: "200cc, 250cc et 300cc", stock: 30, price: 1000 },
  { name: "Clacson devant", compat: "200cc, 250cc et 300cc", stock: 20, price: 5000 },
  { name: "Guidon 200CC", compat: "200 CC AIR", stock: 30, price: 5000, ref: "200CC" },
  { name: "Aile avant", compat: "200cc, 250cc et 300cc", stock: 20, price: 5000 },
  { name: "Carrenage / Pcs 200CC", compat: "200 CC AIR", stock: 20, price: 5000, ref: "200CC" },
  { name: "Reservoir d'essence 200CC", compat: "200 CC AIR", stock: 20, price: 30000, ref: "200CC" },
  { name: "Ressort a lames / pcs 200CC", compat: "200 CC AIR", stock: 20, price: 30000, ref: "200CC" },
  { name: "Tige pignon", compat: "200cc, 250cc et 300cc", stock: 20, price: 8000 },
  { name: "Boite pignon", compat: "200cc, 250cc et 300cc", stock: 20, price: 25000 },
  { name: "Vilebrequin 200CC", compat: "200 CC AIR", stock: 20, price: 20000, ref: "200CC" },
  { name: "Adaptateur Boite a vitesse", compat: "200cc, 250cc et 300cc", stock: 5, price: 5000 },
  { name: "Boite marche arriere", compat: "200cc, 250cc et 300cc", stock: 0, price: 15000 },
  { name: "Boite a vitesse / Adapteur", compat: "200cc, 250cc et 300cc", stock: 0, price: 20000 },
  { name: "Boite de vitesse complet", compat: "200cc, 250cc et 300cc", stock: 20, price: 25000 },
  { name: "Transmission", compat: "200cc, 250cc et 300cc", stock: 20, price: 12000 },
  { name: "Manette de Vitesse", compat: "200cc, 250cc et 300cc", stock: 50, price: 2000 },
  { name: "Comodo", compat: "200cc, 250cc et 300cc", stock: 30, price: 2000 },
  { name: "Cable de carbotage", compat: "200cc, 250cc et 300cc", stock: 30, price: 3000 },
  { name: "Cable accelerateur", compat: "200cc, 250cc et 300cc", stock: 10, price: 1000 },
  { name: "Tableau de bord", compat: "200cc, 250cc et 300cc", stock: 10, price: 12000 },
  { name: "Cable vitesse", compat: "200cc, 250cc et 300cc", stock: 20, price: 2000 },
  { name: "Kick Moto / Levier", compat: "200cc, 250cc et 300cc", stock: 10, price: 5000 },
  { name: "Chaise", compat: "200cc, 250cc et 300cc", stock: 50, price: 10000 },
  { name: "Demarreur Tricycle 200CC", compat: "200 CC AIR", stock: 12, price: 10000, ref: "200CC" },
  { name: "Contacteur d'allumage / Pcs", compat: "200cc, 250cc et 300cc", stock: 10, price: 5000 },
  { name: "Contacteur d'allumage complet", compat: "200cc, 250cc et 300cc", stock: 20, price: 10000 },
  { name: "Cable d'embrayage", compat: "200cc, 250cc et 300cc", stock: 20, price: 1000 },
  { name: "Disque d'embrayage / pcs", compat: "200cc, 250cc et 300cc", stock: 20, price: 1000 },
  { name: "Clignotant devant / paire", compat: "200cc, 250cc et 300cc", stock: 10, price: 5000 },
  { name: "Embrayage couvercle/bol 200CC", compat: "200 CC AIR", stock: 11, price: 12000, ref: "200CC" },
  { name: "Embrayage couvercle/bol 250-300CC", compat: "250cc et 300cc", stock: 10, price: 15000 },
  { name: "Amortisseur arriere 250-300CC", compat: "250cc et 300cc", stock: 10, price: 10000 },
  { name: "Culasse de Moteur 300CC", compat: "300 CC A EAU", stock: 10, price: 30000, ref: "300CC" },
  { name: "Culasse de Moteur 250CC", compat: "250 CC A EAU", stock: 10, price: 25000, ref: "250CC" },
  { name: "BLOC-cylindre 300CC", compat: "300 CC A EAU", stock: 12, price: 18000, ref: "300CC" },
  { name: "BLOC-cylindre 250CC", compat: "250 CC A EAU", stock: 0, price: 15000, ref: "250CC" },
  { name: "Chambre a air", compat: "200cc, 250cc et 300cc", stock: 10, price: 2000 },
  { name: "Clignotant arriere / paire 300CC", compat: "300 CC A EAU", stock: 20, price: 6000, ref: "300CC" },
  { name: "MOTEUR 250CC", compat: "250 CC A EAU", stock: 20, price: 270000, ref: "250CC" },
  { name: "Pont arriere complet 250CC", compat: "250 CC A EAU", stock: 22, price: 150000, ref: "250CC" },
  { name: "Pont arriere complet 300CC", compat: "300 CC A EAU", stock: 10, price: 180000, ref: "300CC" },
  { name: "Pont arriere complet 200CC", compat: "200 CC AIR", stock: 10, price: 120000, ref: "200CC" },
  { name: "DEMI-PONT / DIFFERENTIEL 300CC", compat: "300 CC A EAU", stock: 10, price: 80000, ref: "300CC" },
  { name: "DEMI-PONT / DIFFERENTIEL 250CC", compat: "250 CC A EAU", stock: 0, price: 60000, ref: "250CC" },
  { name: "DEMI-PONT / DIFFERENTIEL 200CC", compat: "200 CC AIR", stock: 0, price: 40000, ref: "200CC" },
  { name: "Piston et segment 250CC", compat: "250 CC A EAU", stock: 20, price: 13000, ref: "250CC" },
  { name: "Poignee de frein / Levier", compat: "200cc, 250cc et 300cc", stock: 5, price: 3000 },
  { name: "Bougie d'allumage", compat: "200cc, 250cc et 300cc", stock: 5, price: 1000 },
  { name: "Huile a Moteur", compat: "200cc, 250cc et 300cc", stock: 5, price: 3000 },
  { name: "Poignee d'embrayage", compat: "200cc, 250cc et 300cc", stock: 5, price: 1500 },
  { name: "BLOC-cylindre 200CC", compat: "200 CC AIR", stock: 5, price: 12000, ref: "200CC" },
  { name: "Batterie 200CC", compat: "200 CC AIR", stock: 5, price: 15000, ref: "200CC" },
  { name: "Demi essieu courte / Arbre", compat: "200cc, 250cc et 300cc", stock: 5, price: 8000 },
  { name: "Demi-essieu long / Cardan", compat: "200cc, 250cc et 300cc", stock: 5, price: 10000 },
  { name: "Culasse de Moteur 200CC", compat: "200 CC AIR", stock: 5, price: 20000, ref: "200CC" },
  { name: "Demarreur 200CC", compat: "200 CC AIR", stock: 5, price: 8000, ref: "200CC" },
  { name: "Lampe arriere / pcs 200CC", compat: "200 CC AIR", stock: 5, price: 2000, ref: "200CC" },
  { name: "Roulement", compat: "200cc, 250cc et 300cc", stock: 5, price: 1000 },
  { name: "Lampe V1/Q7", compat: "200cc, 250cc et 300cc", stock: 5, price: 10000 },
  { name: "Clignotant arriere / paire 200CC", compat: "200 CC AIR", stock: 5, price: 6000, ref: "200CC" },
  { name: "Paquet haute tension 200CC", compat: "200 CC AIR", stock: 5, price: 1500, ref: "200CC" },
  { name: "Relais de demarrage", compat: "200cc, 250cc et 300cc", stock: 5, price: 2000 },
  { name: "Serrure 200CC", compat: "200 CC AIR", stock: 5, price: 4000, ref: "200CC" },
  { name: "Bobine 12 - 200CC", compat: "200 CC AIR", stock: 5, price: 8000, ref: "200CC" },
  { name: "Bobine 11 - 200CC", compat: "200 CC AIR", stock: 5, price: 8000, ref: "200CC" },
  { name: "Bobine 8 - 200CC", compat: "200 CC AIR", stock: 5, price: 5000, ref: "200CC" },
  { name: "Regulateur/Redresseur de tension", compat: "200cc, 250cc et 300cc", stock: 5, price: 1500 },
  { name: "Cylindre 12 - 200CC", compat: "200 CC AIR", stock: 5, price: 11000, ref: "200CC" },
  { name: "Cylindre 11 - 200CC", compat: "200 CC AIR", stock: 5, price: 11000, ref: "200CC" },
  { name: "Cylindre 8 - 200CC", compat: "200 CC AIR", stock: 5, price: 10000, ref: "200CC" },
  { name: "Pneu tout-terrain / pcs", compat: "200cc, 250cc et 300cc", stock: 5, price: 23000 },
  { name: "Pneu exterieur", compat: "200cc, 250cc et 300cc", stock: 5, price: 13000 },
  { name: "Levier de vitesse", compat: "200cc, 250cc et 300cc", stock: 5, price: 3000 },
  { name: "Ligne d'embrayage 200CC", compat: "200 CC AIR", stock: 5, price: 1000, ref: "200CC" },
  { name: "Embrayage complet 200CC", compat: "200 CC AIR", stock: 5, price: 17000, ref: "200CC" },
  { name: "Allumage", compat: "200cc, 250cc et 300cc", stock: 5, price: 3000 },
  { name: "Ventilateur 200CC", compat: "200 CC AIR", stock: 5, price: 5000, ref: "200CC" },
  { name: "Jante", compat: "200cc, 250cc et 300cc", stock: 5, price: 10000 },
  { name: "Reservoir d'eau 250-300CC", compat: "250cc et 300cc", stock: 5, price: 10000 },
  { name: "Carbotage complet 200CC", compat: "200 CC AIR", stock: 5, price: 38000, ref: "200CC" },
  { name: "Tuyau / pcs 250-300CC", compat: "250cc et 300cc", stock: 5, price: 3000 },
  { name: "Radiateur", compat: "200cc, 250cc et 300cc", stock: 5, price: 30000 },
  { name: "Bache 200CC", compat: "200 CC AIR", stock: 5, price: 50000, ref: "200CC" },
  { name: "Levier de demarrage", compat: "200cc, 250cc et 300cc", stock: 5, price: 5000 },
  { name: "Frein / PCS 200CC", compat: "200 CC AIR", stock: 5, price: 2000, ref: "200CC" },
  { name: "Piston et segment 200CC", compat: "200 CC AIR", stock: 5, price: 10000, ref: "200CC" },
  { name: "Segment de piston 200CC", compat: "200 CC AIR", stock: 5, price: 2000, ref: "200CC" },
  { name: "Echappement", compat: "200cc, 250cc et 300cc", stock: 5, price: 15000 },
  { name: "Carburateur", compat: "200cc, 250cc et 300cc", stock: 5, price: 10000 },
  { name: "Retroviseur / PCS", compat: "200cc, 250cc et 300cc", stock: 5, price: 2500 },
  { name: "Clignotant arriere / paire 250CC", compat: "250 CC A EAU", stock: 5, price: 6000, ref: "250CC" },
  { name: "MOTEUR 200CC", compat: "200 CC AIR", stock: 20, price: 230000, ref: "200CC" },
  { name: "MOTEUR 300CC", compat: "300 CC A EAU", stock: 45, price: 300000, ref: "300CC" },
  { name: "CYLINDRE 300CC", compat: "300 CC A EAU", stock: 5, price: 22000, ref: "300CC" },
  { name: "Piston et segment 300CC", compat: "300 CC A EAU", stock: 10, price: 15000, ref: "300CC" },
  { name: "Amortisseur Complet Devant 200CC", compat: "200 CC AIR", stock: 25, price: 40000, ref: "200CC" },
];

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Generate SQL
const values = pieces.map(p => {
  const slug = slugify(p.name);
  const name = p.name.replace(/'/g, "''");
  const compat = p.compat.replace(/'/g, "''");
  const inStock = p.stock > 0;
  const specs = JSON.stringify({ "Compatibilite": p.compat, "Reference": p.ref || "N/A" }).replace(/'/g, "''");
  const features = `ARRAY['Compatible ${compat}']`;
  
  return `('${slug}', '${name}', 'piece', 'pieces-detachees', ${p.price}, 'Piece detachee pour tricycle Hasilaza. Compatible ${compat}.', '${name} - Compatible ${compat}', '${specs}'::jsonb, ${features}, ARRAY['/images/pieces/default-piece.jpg'], ${inStock}, false, 4.5, 0)`;
});

// Print in batches of 20
const batchSize = 20;
for (let i = 0; i < values.length; i += batchSize) {
  const batch = values.slice(i, i + batchSize);
  console.log(`-- Batch ${Math.floor(i/batchSize) + 1}`);
  console.log(`INSERT INTO products (slug, name, category, subcategory, price, description, short_description, specifications, features, images, in_stock, is_new, rating, reviews) VALUES`);
  console.log(batch.join(',\n') + ';');
  console.log('');
}

console.log(`Total pieces: ${pieces.length}`);
