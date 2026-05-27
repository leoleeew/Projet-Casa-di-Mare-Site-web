'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  description: string;
  images: string[];
  imageAlts: string[];
}

interface Category {
  id: string;
  label: string;
  rooms: Room[];
}

const categories: Category[] = [
  {
    id: 'maison1',
    label: 'La Maison Principale',
    rooms: [
      {
        id: 'salon',
        name: 'Salon',
        /* EN: The living room is the heart of the house. Bright and open onto the terrace, it invites relaxation in the afternoon cool, while the song of the cicadas drifts through the shutters. */
        description:
          'Le salon est le cœur de la maison. Lumineux et ouvert sur la terrasse, il invite à la détente dans la fraîcheur de l\'après-midi, tandis que le chant des cigales traverse les volets.',
        images: [
          '/images/salon/IMG_4938.jpeg',
          '/images/salon/IMG_4667.jpeg',
          '/images/salon/IMG_4670.jpeg',
          '/images/salon/IMG_5025.jpeg',
          '/images/salon/IMG_2133.jpeg',
          '/images/salon/IMG_2533.jpeg',
          '/images/salon/IMG_2537.jpeg',
        ],
        imageAlts: [
          'Coin salon baigné de lumière méditerranéenne',
          'Salon lumineux avec vue sur terrasse et mer',
          'Détail salon, mobilier naturel et clair',
          'Salon ouvert sur l\'extérieur',
          'Vue d\'ensemble du salon de la maison principale',
          'Salon, ambiance douce et chaleureuse',
          'Détail salon, matériaux naturels',
        ],
      },
      {
        id: 'cuisine',
        name: 'Cuisine',
        /* EN: Fully equipped, the kitchen opens directly onto the outdoor dining area. Summer meals begin at the Porto-Vecchio market and end at the large table, between rosé and laughter. */
        description:
          'Entièrement équipée, la cuisine s\'ouvre directement sur l\'espace repas extérieur. Les repas d\'été commencent au marché de Porto-Vecchio et se terminent autour de la grande table, entre rosé et éclats de rire.',
        images: [
          '/images/cuisine/IMG_4672.jpeg',
          '/images/cuisine/IMG_4673.jpeg',
          '/images/cuisine/IMG_4676.jpeg',
          '/images/cuisine/IMG_4677.jpeg',
          '/images/cuisine/IMG_2529.jpeg',
          '/images/cuisine/IMG_2550.jpeg',
        ],
        imageAlts: [
          'Cuisine équipée moderne et lumineuse',
          'Détail cuisine, matériaux naturels',
          'Plan de travail cuisine',
          'Cuisine ouverte sur l\'espace de vie',
          'Cuisine vue d\'ensemble',
          'Rangements et équipements cuisine',
        ],
      },
      {
        id: 'chambre1',
        name: 'Chambre 1',
        /* EN: The first bedroom, peaceful and bright, wakes you up with Corsican light filtering through the shutters. A double bed, quality linen, and silence — the real luxury of vacation. */
        description:
          'La première chambre, calme et lumineuse, vous réveille avec la lumière de Corse filtrant à travers les volets. Un grand lit, du linge de qualité, et le silence — le vrai luxe des vacances.',
        images: [
          '/images/chambre1/1a4f73ea-dc41-4a6a-8548-0c1f0f029177.JPG',
          '/images/chambre1/4349c04e-1231-4d56-97ad-299d5521f05c.JPG',
          '/images/chambre1/ba2cf02e-61c1-4bf7-bd90-3a6cdfc80ee5.JPG',
        ],
        imageAlts: [
          'Chambre 1, lit double avec lumière naturelle',
          'Chambre 1, détail literie blanche',
          'Chambre 1, vue d\'ensemble',
        ],
      },
      {
        id: 'chambre2',
        name: 'Chambre 2',
        /* EN: The second bedroom, with its garden view, offers a cool retreat during the heat of the day. Ideal for children or a second couple seeking privacy. */
        description:
          'La deuxième chambre, avec sa vue sur le jardin, offre une retraite fraîche pendant la chaleur de la journée. Idéale pour les enfants ou un second couple en quête d\'intimité.',
        images: [
          '/images/chambre2/912f7894-f8ac-4efc-a09b-7156c4a24165.JPG',
          '/images/chambre2/c19c8dab-c710-41ae-9ac6-4d3c959040a0.JPG',
          '/images/chambre2/c9548ab4-ba9c-4ded-bc8a-d30ce85e6ae0.JPG',
          '/images/chambre2/f5124f60-016b-4ee6-850c-58c18631af78.JPG',
        ],
        imageAlts: [
          'Chambre 2 avec vue jardin',
          'Chambre 2, ambiance lumineuse',
          'Chambre 2, détail',
          'Chambre 2, vue d\'ensemble',
        ],
      },
      {
        id: 'sdb1',
        name: 'Salle de bain',
        /* EN: Bright bathroom with quality finishes. After a day at Palombaggia, a cool shower is a simple ceremony. */
        description:
          'Salle de bain lumineuse aux finitions soignées. Après une journée à Palombaggia, une douche fraîche devient une cérémonie toute simple.',
        images: [
          '/images/sdb1/ca6fde8c-9a00-4064-be03-a678d182999f.JPG',
          '/images/sdb1/b2f57b8a-c8df-4126-9ce5-008becf65697.JPG',
          '/images/sdb1/c793dd15-394e-447c-907e-559f3470e41f.JPG',
          '/images/sdb1/cd6f8434-8ef9-4225-b8a7-29ff3488234b.JPG',
          '/images/sdb1/de1d78ca-5bc1-4ffc-8ddd-09cddce60989.JPG',
        ],
        imageAlts: [
          'Détail salle de bain',
          'Salle de bain maison principale',
          'Douche salle de bain, carrelage clair',
          'Salle de bain, vue d\'ensemble',
          'Salle de bain, équipements',
        ],
      },
    ],
  },
  {
    id: 'gite',
    label: 'Seconde Maison',
    rooms: [
      {
        id: 'chambre-parentale',
        name: 'Suite Parentale',
        /* EN: The master bedroom of the second house is a haven of peace. Generous space, quality bedding, and a private bathroom — a corner reserved for adults who want to rest. */
        description:
          'La suite parentale du seconde maison est un havre de paix. Espace généreux, literie de qualité, salle de bain privative — un coin réservé aux adultes qui veulent se ressourcer.',
        images: [
          '/images/chambre-parentale/IMG_5883.jpeg',
          '/images/chambre-parentale/IMG_5884.jpeg',
          '/images/chambre-parentale/IMG_5887.jpeg',
          '/images/chambre-parentale/IMG_5888.jpeg',
          '/images/chambre-parentale/IMG_5891.jpeg',
          '/images/chambre-parentale/IMG_6146.jpeg',
          '/images/chambre-parentale/IMG_6543.jpeg',
        ],
        imageAlts: [
          'Suite parentale seconde maison, lit double confortable',
          'Suite parentale, ambiance lumineuse et reposante',
          'Chambre parentale, décoration naturelle',
          'Suite parentale, détail literie',
          'Chambre parentale, vue d\'ensemble',
          'Suite parentale, fenêtre et lumière',
          'Chambre parentale, coin cosy',
        ],
      },
      {
        id: 'dortoir',
        name: 'Dortoir',
        /* EN: The dormitory is the children's kingdom: bunk beds and a holiday spirit guaranteed. They will have their independence while staying close to the pool. */
        description:
          'Le dortoir est le royaume des enfants : lits superposés et esprit de grande vadrouille assurés. Ils auront leur indépendance tout en restant à deux pas de la piscine.',
        images: [
          '/images/dortoir/IMG_6153.jpeg',
          '/images/dortoir/IMG_6154.jpeg',
          '/images/dortoir/IMG_6155.jpeg',
          '/images/dortoir/IMG_9192.jpeg',
        ],
        imageAlts: [
          'Dortoir avec lits superposés',
          'Dortoir seconde maison, ambiance enfants',
          'Détail dortoir, espace de rangement',
          'Dortoir vue d\'ensemble',
        ],
      },
      {
        id: 'sdb2',
        name: 'Salle de bain',
        /* EN: The second house's bathroom, bright and functional, serves the master suite and the dormitory. Simple, clean, everything you need. */
        description:
          'La salle de bain du seconde maison, lumineuse et fonctionnelle, dessert la suite parentale et le dortoir. Simple, nette, tout ce qu\'il faut.',
        images: [
          '/images/sdb2/b786cf54-f52c-4887-ace7-7f5d3dec62c4.JPG',
          '/images/sdb2/7f11a843-5d21-4e7d-92ac-89ae2a79d7ce.JPG',
          '/images/sdb2/a9052866-43d4-4fd1-91ec-fdd552a82dba.JPG',
          '/images/sdb2/c19297fa-62c1-4f8e-9db7-5a6e5daa0928.JPG',
          '/images/sdb2/c35cf0bf-5549-42ac-82a3-65a75a9afc11.JPG',
          '/images/sdb2/ea131da4-d4e9-405f-9faf-c93e6ada404b.JPG',
        ],
        imageAlts: [
          'Détail salle de bain seconde maison',
          'Salle de bain seconde maison',
          'Douche salle de bain seconde maison',
          'Salle de bain seconde maison, vue d\'ensemble',
          'Salle de bain seconde maison, équipements',
          'Détail salle de bain seconde maison',
        ],
      },
    ],
  },
  {
    id: 'exterieurs',
    label: 'Les Extérieurs',
    rooms: [
      {
        id: 'piscine',
        name: 'La Piscine',
        /* EN: The centerpiece of the property. Bordered by stone and facing the sea, the pool is the stage for every beautiful moment: noon dives, golden afternoons, twilights that never seem to end. */
        description:
          'La pièce maîtresse de la maison. Bordée de pierre et face à la mer, la piscine est la scène de tous les beaux moments : plongeons de midi, après-midis dorés, crépuscules qui n\'en finissent pas.',
        images: [
          '/images/piscine/IMG_3976.JPG',
          '/images/piscine/IMG_4870.JPG',
          '/images/piscine/IMG_4484.JPG',
          '/images/piscine/IMG_3415.JPG',
          '/images/piscine/IMG_7356.jpeg',
        ],
        imageAlts: [
          'Piscine privée avec vue panoramique sur la mer de Palombaggia',
          'Piscine au coucher du soleil, reflets dorés',
          'Baignade dans la piscine, vue mer turquoise',
          'Piscine vue du jardin et du maquis',
          'Piscine, plongeon et soleil corse',
        ],
      },
      {
        id: 'terrasses',
        name: 'Les Terrasses',
        /* EN: The terraces are where life really happens. Breakfast in the shade of the pergola, an afternoon nap, apéro watching the last boats come in — the terrace sets the rhythm of the day. */
        description:
          'Les terrasses sont là où la vie se passe vraiment. Petit-déjeuner à l\'ombre de la pergola, sieste au soleil, apéro en regardant les derniers bateaux rentrer — la terrasse donne le rythme de la journée.',
        images: [
          '/images/terrasse/IMG_5111.jpeg',
          '/images/terrasse/IMG_5097.jpeg',
          '/images/terrasse/IMG_5015.jpeg',
          '/images/terrasse/IMG_5020.jpeg',
          '/images/terrasse/IMG_4994.jpeg',
          '/images/terrasse/IMG_5561.jpeg',
          '/images/terrasse/IMG_1582.jpeg',
          '/images/terrasse/IMG_2496.jpeg',
          '/images/terrasse/IMG_6222.jpeg',
          '/images/terrasse/24FC4E24F4DA43FF694B5894D95E097F.jpg',
        ],
        imageAlts: [
          'Terrasse principale avec vue mer panoramique',
          'Terrasse ensoleillée, espace de vie extérieur',
          'Coin détente terrasse, transats et ombre',
          'Terrasse avec table de repas extérieure',
          'Vue terrasse vers la piscine et la mer',
          'Terrasse de nuit, lumières douces et ambiance',
          'Terrasse matin, café face à la mer',
          'Vue terrasse, jardin et maquis corse',
          'Terrasse vue mer panoramique',
          'Pergola et espace repas extérieur',
        ],
      },
      {
        id: 'coin-repas',
        name: 'Coin Repas',
        /* EN: Dining outdoors in Corsica is not a choice — it is a way of life. The large outdoor table, sheltered under the pergola, is the beating heart of summer evenings around shared dishes. */
        description:
          'Manger dehors en Corse n\'est pas un choix, c\'est un mode de vie. La grande table extérieure, abritée sous la pergola, est le cœur battant des soirées d\'été autour des plats partagés.',
        images: [
          '/images/coin-repas/IMG_5722.jpeg',
          '/images/coin-repas/IMG_6355.jpeg',
          '/images/coin-repas/IMG_6357.jpeg',
          '/images/coin-repas/IMG_6363.jpeg',
          '/images/coin-repas/IMG_4503.jpeg',
          '/images/coin-repas/IMG_3447.JPG',
          '/images/coin-repas/IMG_2081.jpeg',
          '/images/coin-repas/IMG_0544.jpeg',
          '/images/coin-repas/0EAC3763-D44E-4814-890A-D838FB9C7F96.jpg',
        ],
        imageAlts: [
          'Coin repas extérieur, table dressée sous la pergola',
          'Repas en plein air, coucher de soleil',
          'Table extérieure, apéro corse',
          'Dîner en terrasse, ambiance estivale',
          'Coin repas, vue mer en arrière-plan',
          'Déjeuner en plein air, lumière dorée',
          'Table extérieure, convivialité et partage',
          'Coin repas matin, café et viennoiseries',
          'Espace repas extérieur, pergola et nature',
        ],
      },
      {
        id: 'vue',
        name: 'La Vue',
        description:
          'Certaines vues appartiennent aux cartes postales. Celle-ci est la vôtre pendant tout l\'été. Palombaggia, la mer, les pins, le maquis — un tableau qui change à chaque heure du jour.',
        images: [
          '/images/la-vue/IMG_6375.jpeg',
          '/images/la-vue/IMG_7663.jpeg',
          '/images/la-vue/IMG_7666.jpeg',
          '/images/la-vue/IMG_6276.jpeg',
          '/images/la-vue/IMG_6074.jpeg',
          '/images/la-vue/IMG_5943.jpeg',
          '/images/la-vue/IMG_5428.jpeg',
          '/images/la-vue/IMG_4290.jpeg',
          '/images/la-vue/IMG_4047.jpeg',
          '/images/la-vue/IMG_2496.jpeg',
          '/images/la-vue/IMG_1949.jpeg',
          '/images/la-vue/IMG_1903.jpeg',
          '/images/la-vue/IMG_0808.JPG',
          '/images/la-vue/IMG_0810.JPG',
        ],
        imageAlts: [
          'Vue panoramique sur la mer depuis la maison',
          'Mer turquoise et ciel bleu de Corse',
          'Vue côtière, pins parasols et mer',
          'Vue mer depuis le jardin',
          'Mer et maquis, vue depuis la terrasse',
          'Maquis corse et mer bleue, vue imprenable',
          'Vue sur la côte sud corse',
          'Coucher de soleil sur Palombaggia',
          'Vue extérieure sur le golfe',
          'Paysage naturel de Corse du Sud',
          'Nature et mer turquoise',
          'Vue côtière corse',
          'Paysage corse, azur et maquis',
          'Vue mer depuis la maison',
        ],
      },
      {
        id: 'coins-caches',
        name: 'Coins Cachés',
        /* EN: Beyond the pool and the terraces, the property hides secret corners — a shaded path, a rock in the maquis, a view that only those who wander a little further will discover. */
        description:
          'Au-delà de la piscine et des terrasses, la maison cache des recoins secrets — un chemin ombragé, un rocher dans le maquis, une vue que seuls ceux qui s\'aventurent un peu plus loin découvriront.',
        images: [
          '/images/exterieur/IMG_6313.jpeg',
          '/images/exterieur/IMG_6379.jpeg',
          '/images/exterieur/IMG_5927.jpeg',
          '/images/exterieur/IMG_5932.jpeg',
          '/images/exterieur/IMG_5946.jpeg',
          '/images/exterieur/IMG_6135.jpeg',
          '/images/exterieur/IMG_6041.JPG',
          '/images/exterieur/IMG_2481.jpeg',
        ],
        imageAlts: [
          'Coin caché, vue sur la baie de Palombaggia',
          'Recoin du jardin, maquis et mer',
          'Chemin ombragé dans le maquis corse',
          'Vue depuis un rocher, mer turquoise',
          'Coin secret de la maison, végétation dense',
          'Paysage corse au lever du soleil',
          'Horizon méditerranéen depuis la maison',
          'Recoins naturels autour de la maison',
        ],
      },
    ],
  },
  {
    id: 'extra',
    label: 'Galerie Extra',
    rooms: [
      {
        id: 'ambiance',
        name: 'Ambiance & Détails',
        /* EN: Beyond the rooms and the view, it is the small everyday moments that make a stay unforgettable. These photos capture the spirit of the house, its light, its textures, its life. */
        description:
          'Au-delà des pièces et de la vue, ce sont les petits moments du quotidien qui rendent un séjour inoubliable. Ces photos capturent l\'esprit de la maison, sa lumière, ses textures, sa vie.',
        images: [
          '/images/extra/IMG_1569.jpeg',
          '/images/extra/IMG_1627.jpeg',
          '/images/extra/IMG_1638.jpeg',
          '/images/extra/IMG_1639.JPG',
          '/images/extra/IMG_1695.jpeg',
          '/images/extra/IMG_1702.jpeg',
          '/images/extra/IMG_1705.JPG',
          '/images/extra/IMG_1708.JPG',
          '/images/extra/IMG_2227.jpeg',
          '/images/extra/IMG_3497.jpeg',
          '/images/extra/IMG_3806.jpeg',
          '/images/extra/IMG_4302.jpeg',
          '/images/extra/IMG_5298.jpeg',
          '/images/extra/IMG_5342.jpeg',
          '/images/extra/IMG_6105.jpeg',
          '/images/extra/IMG_6335.jpeg',
          '/images/extra/IMG_6343.jpeg',
          '/images/extra/IMG_6346.jpeg',
          '/images/extra/3237281D371987CDC62CA1A11F9A5963.jpg',
        ],
        imageAlts: [
          'Ambiance Casa di Mare, détail naturel',
          'Vie de la maison, lumière corse',
          'Détail architecture et matériaux naturels',
          'Moment de vie à la maison',
          'Textures et matières de la maison',
          'Ambiance estivale, couleurs corses',
          'Détail décoration naturelle',
          'Coin cosy de la maison',
          'Lumière du matin dans la maison',
          'Vie quotidienne à Casa di Mare',
          'Détail extérieur, pierre et végétation',
          'Ambiance maison, chaleur méditerranéenne',
          'Moment de pause, terrasse et soleil',
          'Détail intérieur, authenticité corse',
          'Vue de la maison, vie au grand air',
          'Ambiance soirée, lumières douces',
          'Détail jardin, fleurs et maquis',
          'Vie de la maison en été',
          'Casa di Mare, esprit des lieux',
        ],
      },
    ],
  },
];

export default function RoomTour() {
  const [activeCatId, setActiveCatId] = useState<string>(categories[0].id);
  const [activeRoomId, setActiveRoomId] = useState<string>(categories[0].rooms[0].id);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const activeCategory = categories.find((c) => c.id === activeCatId)!;
  const activeRoom = activeCategory.rooms.find((r) => r.id === activeRoomId) ?? activeCategory.rooms[0];

  const selectCategory = (catId: string) => {
    const cat = categories.find((c) => c.id === catId)!;
    setActiveCatId(catId);
    setActiveRoomId(cat.rooms[0].id);
    setActiveImageIdx(0);
  };

  const selectRoom = (roomId: string) => {
    setActiveRoomId(roomId);
    setActiveImageIdx(0);
  };

  return (
    <section id="tour" className="py-24 md:py-32 px-6" ref={ref} style={{ background: 'rgba(237, 229, 216, 0.82)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 bg-terracotta" />
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
              {/* EN: Room by room */}
              Pièce par pièce
            </p>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
            {/* EN: Explore the property */}
            Explorer la maison
          </h2>
        </motion.div>

        {/* Category tabs */}
        <div className="flex gap-1 mb-0 overflow-x-auto pb-0" style={{ scrollbarWidth: 'none' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => selectCategory(cat.id)}
              className="whitespace-nowrap px-5 py-3 text-xs uppercase tracking-[0.18em] transition-all duration-200 flex-shrink-0"
              style={{
                background: activeCatId === cat.id ? '#7A9E52' : '#DDD4C4',
                color: activeCatId === cat.id ? '#F5EFE6' : 'rgba(28,28,28,0.55)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main tour panel */}
        <div
          className="grid md:grid-cols-[200px_1fr]"
          style={{ background: '#F5EFE6', border: '1px solid rgba(28,28,28,0.08)' }}
        >
          {/* Room list */}
          <ul className="border-b md:border-b-0 md:border-r border-charcoal/10 flex md:flex-col overflow-x-auto md:overflow-visible" style={{ scrollbarWidth: 'none' }}>
            {activeCategory.rooms.map((room) => (
              <li key={room.id} className="flex-shrink-0">
                <button
                  onClick={() => selectRoom(room.id)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-2 transition-colors duration-150"
                  style={{
                    background: activeRoomId === room.id ? '#EDE5D8' : 'transparent',
                    color: activeRoomId === room.id ? '#7A9E52' : 'rgba(28,28,28,0.55)',
                    borderLeft: activeRoomId === room.id ? '2px solid #7A9E52' : '2px solid transparent',
                  }}
                >
                  <span className="text-sm whitespace-nowrap">{room.name}</span>
                  {activeRoomId === room.id && (
                    <ChevronRight size={13} className="hidden md:block flex-shrink-0" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Room content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoom.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8"
            >
              {/* Photo principale — swipeable */}
              <motion.div
                className="relative w-full mb-4 overflow-hidden group cursor-grab active:cursor-grabbing select-none"
                style={{ background: '#EDE5D8', height: '400px' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50 && activeImageIdx < activeRoom.images.length - 1) {
                    setActiveImageIdx(activeImageIdx + 1);
                  } else if (info.offset.x > 50 && activeImageIdx > 0) {
                    setActiveImageIdx(activeImageIdx - 1);
                  }
                }}
              >
                <Image
                  key={`${activeRoom.id}-${activeImageIdx}`}
                  src={activeRoom.images[activeImageIdx]}
                  alt={activeRoom.imageAlts[activeImageIdx]}
                  fill
                  sizes="(max-width: 768px) 100vw, 70vw"
                  className="object-contain pointer-events-none"
                  loading="lazy"
                  draggable={false}
                />

                {/* Flèche gauche */}
                <button
                  onClick={(e) => { e.stopPropagation(); if (activeImageIdx > 0) setActiveImageIdx(activeImageIdx - 1); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{
                    background: 'rgba(28,28,28,0.5)',
                    color: '#F5EFE6',
                    opacity: activeImageIdx > 0 ? 1 : 0.2,
                    cursor: activeImageIdx > 0 ? 'pointer' : 'default',
                  }}
                >
                  <ChevronLeft size={20} strokeWidth={1.5} />
                </button>

                {/* Flèche droite */}
                <button
                  onClick={(e) => { e.stopPropagation(); if (activeImageIdx < activeRoom.images.length - 1) setActiveImageIdx(activeImageIdx + 1); }}
                  className="absolute right-12 top-1/2 -translate-y-1/2 z-10 p-2 transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{
                    background: 'rgba(28,28,28,0.5)',
                    color: '#F5EFE6',
                    opacity: activeImageIdx < activeRoom.images.length - 1 ? 1 : 0.2,
                    cursor: activeImageIdx < activeRoom.images.length - 1 ? 'pointer' : 'default',
                  }}
                >
                  <ChevronRight size={20} strokeWidth={1.5} />
                </button>

                {/* Compteur */}
                <div
                  className="absolute bottom-3 right-3 text-xs px-2 py-1 z-10"
                  style={{ background: 'rgba(28,28,28,0.55)', color: '#F5EFE6', letterSpacing: '0.1em' }}
                >
                  {activeImageIdx + 1} / {activeRoom.images.length}
                </div>

                {/* Hint swipe — mobile uniquement, disparaît après 1ère interaction */}
                {activeRoom.images.length > 1 && activeImageIdx === 0 && (
                  <div
                    className="absolute bottom-3 left-3 text-xs px-2 py-1 md:hidden"
                    style={{ background: 'rgba(28,28,28,0.45)', color: 'rgba(245,239,230,0.7)' }}
                  >
                    ← Glisser →
                  </div>
                )}
              </motion.div>

              {/* Miniatures — grille sur 2 lignes */}
              {activeRoom.images.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeRoom.images.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className="relative flex-shrink-0 w-14 h-11 overflow-hidden transition-all duration-150"
                      style={{
                        outline: activeImageIdx === idx ? '2px solid #7A9E52' : '2px solid transparent',
                        outlineOffset: '1px',
                        opacity: activeImageIdx === idx ? 1 : 0.55,
                      }}
                    >
                      <Image
                        src={src}
                        alt={activeRoom.imageAlts[idx]}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Info */}
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">{activeRoom.name}</h3>
              <p className="leading-relaxed max-w-xl" style={{ color: 'rgba(28,28,28,0.65)' }}>
                {activeRoom.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
