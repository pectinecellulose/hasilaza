-- Reset products table and insert Hasilaza catalog products
-- This script deletes all existing products and inserts only the 4 products from the PDF catalog

-- Delete all existing products
DELETE FROM public.products;

-- Insert products from Hasilaza catalog
INSERT INTO public.products (name, slug, description, short_description, price, category, subcategory, images, features, specifications, in_stock, is_best_seller, is_new, rating, reviews)
VALUES 
(
  'Tricycle 200CC Benne',
  'tricycle-200cc-benne',
  'Tricycle robuste avec benne basculante, idéal pour le transport de marchandises et matériaux. Moteur 200CC refroidi par eau pour une performance optimale. Ce véhicule polyvalent est parfait pour les entrepreneurs et les petites entreprises qui ont besoin d''un moyen de transport fiable et économique.',
  'Tricycle robuste 200CC avec benne basculante pour le transport de marchandises.',
  8500000,
  'tricycle',
  'Benne',
  ARRAY['/images/tricycle-200cc.jpg'],
  ARRAY['Moteur 200CC refroidi par eau', 'Benne basculante hydraulique', 'Charge utile importante', 'Robuste et fiable', 'Idéal transport marchandises', 'Faible consommation'],
  '[{"label": "Moteur", "value": "200CC refroidi par eau"}, {"label": "Nombre de roues", "value": "3"}, {"label": "Type", "value": "Benne basculante"}, {"label": "Usage", "value": "Transport de marchandises"}, {"label": "Capacité de charge", "value": "500kg"}, {"label": "Transmission", "value": "Manuelle"}]'::jsonb,
  true,
  true,
  true,
  4.8,
  24
),
(
  'Tricycle 250CC',
  'tricycle-250cc',
  'Tricycle polyvalent avec moteur 250CC refroidi par eau. Parfait pour les longues distances et le transport de charges lourdes. Conçu pour offrir un confort optimal au conducteur tout en maximisant la capacité de chargement.',
  'Tricycle polyvalent 250CC pour longues distances et charges lourdes.',
  9500000,
  'tricycle',
  'Transport',
  ARRAY['/images/tricycle-250cc.jpg'],
  ARRAY['Moteur 250CC refroidi par eau', 'Grande capacité de charge', 'Confort de conduite supérieur', 'Économique en carburant', 'Adapté longues distances', 'Suspension renforcée'],
  '[{"label": "Moteur", "value": "250CC refroidi par eau"}, {"label": "Nombre de roues", "value": "3"}, {"label": "Type", "value": "Transport"}, {"label": "Usage", "value": "Longues distances et charges lourdes"}, {"label": "Capacité de charge", "value": "800kg"}, {"label": "Transmission", "value": "Manuelle"}]'::jsonb,
  true,
  true,
  false,
  4.7,
  18
),
(
  'Tricycle 300CC 5 Roues',
  'tricycle-300cc-5-roues',
  'Tricycle haute capacité avec 5 roues et moteur 300CC refroidi par eau. Conçu pour les travaux lourds et le transport de matériaux de construction. La configuration à 5 roues offre une stabilité exceptionnelle même avec des charges très lourdes.',
  'Tricycle haute capacité 300CC avec 5 roues pour travaux lourds.',
  12000000,
  'tricycle',
  'Heavy Duty',
  ARRAY['/images/tricycle-300cc.jpg'],
  ARRAY['Moteur 300CC refroidi par eau', '5 roues pour stabilité maximale', 'Capacité de charge exceptionnelle', 'Idéal chantiers et construction', 'Structure renforcée', 'Freins à tambour'],
  '[{"label": "Moteur", "value": "300CC refroidi par eau"}, {"label": "Nombre de roues", "value": "5"}, {"label": "Type", "value": "Heavy duty"}, {"label": "Usage", "value": "Travaux lourds et construction"}, {"label": "Capacité de charge", "value": "1500kg"}, {"label": "Transmission", "value": "Manuelle"}]'::jsonb,
  true,
  true,
  true,
  4.9,
  31
),
(
  'Moto 150CC',
  'moto-150cc',
  'Moto polyvalente 150CC, parfaite pour les déplacements urbains et les livraisons. Économique et facile à entretenir. Design moderne et sportif qui allie performance et élégance.',
  'Moto polyvalente 150CC pour déplacements urbains et livraisons.',
  3500000,
  'moto',
  'Urbain',
  ARRAY['/images/moto-150cc.jpg'],
  ARRAY['Moteur 150CC performant', 'Économique en carburant', 'Idéal déplacements urbains', 'Facile à entretenir', 'Parfait pour livraisons', 'Design moderne'],
  '[{"label": "Moteur", "value": "150CC"}, {"label": "Nombre de roues", "value": "2"}, {"label": "Type", "value": "Sport/Utilitaire"}, {"label": "Usage", "value": "Déplacements urbains et livraisons"}, {"label": "Vitesse max", "value": "110 km/h"}, {"label": "Transmission", "value": "Manuelle 5 vitesses"}]'::jsonb,
  true,
  false,
  true,
  4.6,
  42
);
