/**
 * Akcesoria i artykuły higieniczne do konfiguratora planu higieny.
 *
 * Produkty są pogrupowane według kategorii sklepowych. Kategoria i zastosowania
 * są przypisane bezpośrednio do każdego rekordu — bez funkcji zmieniających dane.
 * Pusta tablica application oznacza, że nie przypisano produktu do obszaru
 * bez wystarczających informacji o jego przeznaczeniu.
 */

export type AccessoryApplication =
  | 'Kuchnia'
  | 'Mycie podłóg'
  | 'Mycie szyb'
  | 'Powierzchnie ponadpodłogowe'
  | 'Sanitariaty'
  | 'Teren zewnętrzny';

export interface Accessory {
  id: string;
  name: string;
  category: string;
  application: AccessoryApplication[];
}

export const accessories: Accessory[] = [
  // Ręczniki papierowe (13 produktów)
  {
    id: 'recznik-mak-biel-280m-1w-6-305034',
    name: 'CleanPRO-ręczn.Mak.Biel280m 1W(6)#305034',
    category: 'Ręczniki papierowe',
    application: ['Kuchnia', 'Sanitariaty'],
  },
  {
    id: 'recznik-mak-biel-150m-1w-6-305035',
    name: 'CleanPRO-ręczn.Mak.Biel150m 1W(6)#305035',
    category: 'Ręczniki papierowe',
    application: ['Kuchnia', 'Sanitariaty'],
  },
  {
    id: 'recznik-celuloza-280m-1w-6-305029',
    name: 'CleanPRO ręcznik celul 280m 1W(6)#305029',
    category: 'Ręczniki papierowe',
    application: ['Kuchnia', 'Sanitariaty'],
  },
  {
    id: 'recznik-celuloza-150m-1w-6-305030',
    name: 'CleanPRO ręcznik celul 150m 1W(6)#305030',
    category: 'Ręczniki papierowe',
    application: ['Kuchnia', 'Sanitariaty'],
  },
  {
    id: 'recznik-celuloza-lux-150m-1w-6-305033',
    name: 'CleanPRO ręcz.cel.LUX 150m 1W(6)#305033',
    category: 'Ręczniki papierowe',
    application: ['Kuchnia', 'Sanitariaty'],
  },
  {
    id: 'recznik-zz-1520-celuloza-25x23-2w-305003',
    name: 'CleanPRO ZZ-1520 celul.25x23cm 2W#305003',
    category: 'Ręczniki papierowe',
    application: ['Kuchnia', 'Sanitariaty'],
  },
  {
    id: 'recznik-zz-4000-celuloza-25x23-2w-305037',
    name: 'CleanPRO ZZ-4000 celul.25x23cm 2W#305037',
    category: 'Ręczniki papierowe',
    application: ['Kuchnia', 'Sanitariaty'],
  },
  {
    id: 'recznik-zz-4000-mak-biel-25x23-1w-305039',
    name: 'CleanPRO ZZ-4000 Mbiel.25x23cm 1W#305039',
    category: 'Ręczniki papierowe',
    application: ['Kuchnia', 'Sanitariaty'],
  },
  {
    id: 'recznik-zz-4000-mak-biel-22x23-1w-305040',
    name: 'CleanPRO ZZ-4000 Mbiel.22x23cm 1W#305040',
    category: 'Ręczniki papierowe',
    application: ['Kuchnia', 'Sanitariaty'],
  },
  {
    id: 'recznik-zz-4000-celuloza-21x23-2w-305038',
    name: 'CleanPRO ZZ-4000 Cel. 21x23cm 2W#305038',
    category: 'Ręczniki papierowe',
    application: ['Kuchnia', 'Sanitariaty'],
  },
  {
    id: 'recznik-zz-4000-zielony-25x23-1w',
    name: 'CleanPro Ręcznik ZZ 4000 zielony25x23 1W',
    category: 'Ręczniki papierowe',
    application: ['Kuchnia', 'Sanitariaty'],
  },
  {
    id: 'recznik-zz-4000-szary-25x23-1w',
    name: 'CleanPro Ręcznik ZZ 4000 szary 25x23 1W',
    category: 'Ręczniki papierowe',
    application: ['Kuchnia', 'Sanitariaty'],
  },
  {
    id: 'recznik-autocut-celuloza-1w-6x260m',
    name: 'Ręcznik w roli CleanPRO Autocut, 1w, celuloza, biały, 6x260m',
    category: 'Ręczniki papierowe',
    application: ['Kuchnia', 'Sanitariaty'],
  },

  // Papiery toaletowe (7 produktów)
  {
    id: 'papier-jumbo-celuloza-190m-1w-12',
    name: 'CleanPRO-Papier Jumbo celuloza190m1W(12)',
    category: 'Papiery toaletowe',
    application: ['Sanitariaty'],
  },
  {
    id: 'jumbo-mak-biel-190m-1w-12-305016',
    name: 'CleanPRO-Jumbo MakBiel190m 1W(12)#305016',
    category: 'Papiery toaletowe',
    application: ['Sanitariaty'],
  },
  {
    id: 'jumbo-mak-biel-190m-1w-6-305017',
    name: 'CleanPRO-Jumbo mak.biel190m 1W(6)#305017',
    category: 'Papiery toaletowe',
    application: ['Sanitariaty'],
  },
  {
    id: 'papier-jumbo-celuloza-150m-2w-12',
    name: 'CleanPRO-Papier Jumbo celuloza150m2W(12)',
    category: 'Papiery toaletowe',
    application: ['Sanitariaty'],
  },
  {
    id: 'papier-jumbo-celuloza-150m-2w-6',
    name: 'CleanPRO-Papier Jumbo celuloza150m 2W(6)',
    category: 'Papiery toaletowe',
    application: ['Sanitariaty'],
  },
  {
    id: 'papier-toaletowy-jumbo-cleanpro-2w-12x100m',
    name: 'Papier toaletowy w roli Jumbo CleanPRO, 2w, celuloza, biały, 12x100m',
    category: 'Papiery toaletowe',
    application: ['Sanitariaty'],
  },
  {
    id: 'papier-toaletowy-jumbo-szary-150m-12',
    name: 'CleanPro Papier toal.Jumbo szary150m(12)',
    category: 'Papiery toaletowe',
    application: ['Sanitariaty'],
  },

  // Wózki do sprzątania (14 produktów)
  {
    id: 'wozek-kentucky-1x20l-z-prasa',
    name: 'CleanPRO KENTUCKY Wózek 1x20l z prasą',
    category: 'Wózki do sprzątania',
    application: ['Mycie podłóg'],
  },
  {
    id: 'wozek-25l-prasa-uchwyt-niebieski',
    name: 'CleanPRO Wózek 25L prasa+uchwyt (nieb.)',
    category: 'Wózki do sprzątania',
    application: ['Mycie podłóg'],
  },
  {
    id: 'wozek-2x25l-z-prasa',
    name: 'CleanPRO Wózek 2x25L z prasą (2szt.)',
    category: 'Wózki do sprzątania',
    application: ['Mycie podłóg'],
  },
  {
    id: 'wozek-1x31l-z-prasa',
    name: 'CleanPRO Wózek 1x31l z prasą',
    category: 'Wózki do sprzątania',
    application: ['Mycie podłóg'],
  },
  {
    id: 'wozek-25l-prasa-uchwyt-czerwony',
    name: 'CleanPRO Wózek 25L (czerw) prasa+uchwyt',
    category: 'Wózki do sprzątania',
    application: ['Mycie podłóg'],
  },
  {
    id: 'wozek-2x17l-z-prasa-abs',
    name: 'CleanPRO Wózek 2x17l z prasą (2szt) ABS',
    category: 'Wózki do sprzątania',
    application: ['Mycie podłóg'],
  },
  {
    id: 'wozek-kentucky-niebieski-z-prasa',
    name: 'CleanPRO wózek KENTUCKY nieb. z prasą',
    category: 'Wózki do sprzątania',
    application: ['Mycie podłóg'],
  },
  {
    id: 'wozek-2x17l-prasa-koszyk-uchwyt',
    name: 'CleanPRO Wózek 2x17l prasa+koszyk+uchwyt',
    category: 'Wózki do sprzątania',
    application: ['Mycie podłóg'],
  },
  {
    id: 'prasa-zolta-do-wozka-352603',
    name: 'CleanPRO prasa żółta do wózka 352603',
    category: 'Wózki do sprzątania',
    application: ['Mycie podłóg'],
  },
  {
    id: 'wiadro-czerwone-do-wozka-352607',
    name: 'CleanPRO Wiadro czerw. do wózka 352607',
    category: 'Wózki do sprzątania',
    application: ['Mycie podłóg'],
  },
  {
    id: 'wiadro-czerwone-do-357965-358897',
    name: 'CleanPRO Wiadro czerw. do 357965;358897',
    category: 'Wózki do sprzątania',
    application: ['Mycie podłóg'],
  },
  {
    id: 'wiadro-niebieskie-do-wozka-352607',
    name: 'CleanPRO Wiadro nieb. do wózka 352607',
    category: 'Wózki do sprzątania',
    application: ['Mycie podłóg'],
  },
  {
    id: 'wiadro-niebieskie-do-357965-354313',
    name: 'CleanPRO Wiadro nieb. do 357965;354313',
    category: 'Wózki do sprzątania',
    application: ['Mycie podłóg'],
  },
  {
    id: 'wiadro-dwukomorowe-niebieskie',
    name: 'CleanPRO Wiadro dwukomorowe niebieskie',
    category: 'Wózki do sprzątania',
    application: ['Mycie podłóg'],
  },

  // Mopy (25 produktów)
  {
    id: 'duo-mop-11-40cm',
    name: 'CleanPRO DUO MOP 11 40cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-01-kieszeniowy-40cm',
    name: 'CleanPRO Mop 01 kieszeniowy 40cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-07-kieszeniowy-40cm',
    name: 'CleanPRO Mop 07 kieszeniowy 40cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-sznurkowy-200g',
    name: 'CLEANPRO MOP SZNURKOWY 200G',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-sznurkowy-gwint-280g',
    name: 'CLEANPRO MOP SZNURKOWY GWINT 280G',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'duo-mop-11-50cm',
    name: 'CleanPRO DUO MOP 11 50cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-mikrof-21-bialy-duo-40cm',
    name: 'CleanPro mop mikrof.21, biały duo 40cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-mikrof-15-niebieski-duo-40cm',
    name: 'CleanPRO mop mikrof.15, nieb duo 40cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-04-kieszeniowy-40cm-140g',
    name: 'CleanPRO Mop 04 kieszeniowy 40cm 140 g',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-paskowy-110g-gwint',
    name: 'CLEANPRO MOP PASKOWY 110G (GWINT)',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-04-40cm-mocowanie-2str',
    name: 'CleanPRO Mop 04 40cm mocowanie 2str',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'duo-mop-14-50cm',
    name: 'CleanPRO DUO MOP 14 50cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'duo-mop-06-40cm',
    name: 'CleanPRO DUO MOP 06 40cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-02-kieszeniowy-40cm',
    name: 'CleanPRO Mop 02 kieszeniowy 40cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-01-z-tasiemka-40cm',
    name: 'CleanPRO Mop 01 z tasiemką 40cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-03-kieszeniowy-40cm',
    name: 'CleanPRO Mop 03 kieszeniowy 40cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-01-40cm-mocowanie-2str',
    name: 'CleanPRO Mop 01 40cm mocowanie 2str',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-05-kieszeniowy-40cm',
    name: 'CleanPRO Mop 05 kieszeniowy 40cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'duo-mop-14-40cm',
    name: 'CleanPRO DUO MOP 14 40cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'kentucky-mop-sznurkowy-400g-lux',
    name: 'CleanPRO KENTUCKY Mop sznurkowy 400g lux',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'mop-04-z-tasiemka-40cm',
    name: 'CleanPRO Mop 04 z tasiemką 40cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'stelaz-mopa-40cm-mocowanie-2str',
    name: 'CleanPRO Stelaż mopa 40cm mocowanie 2str',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'stelaz-mopa-50cm-mocowanie-2str',
    name: 'CleanPRO stelaż mopa 50cm moc. 2 str.',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'stelaz-mopa-40-dwustronny-pelny',
    name: 'CleanPRO stelaż mopa 40 dwustronny pełny',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },
  {
    id: 'stelaz-mopa-40cm',
    name: 'CleanPRO Stelaż mopa 40cm',
    category: 'Mopy',
    application: ['Mycie podłóg'],
  },

  // Ścierki (45 produktów)
  {
    id: 'scierka-mikrofazy-niebieska-32x32',
    name: 'CleanPRO Ścierka z mikrofazy nieb. 32x32',
    category: 'Ścierki',
    application: [
  'Mycie szyb',
  'Powierzchnie ponadpodłogowe',],
  },
  {
    id: 'scierka-mikrofazy-czerwona-32x32',
    name: 'CleanPRO Ścierka z mikrofazy czerw 32x32',
    category: 'Ścierki',
    application: ['Sanitariaty',],
  },
  {
    id: 'scierka-mikrofazy-zolta-32x32',
    name: 'CleanPRO Ścierka z mikrofazy żółta 32x32',
    category: 'Ścierki',
    application: [
  'Kuchnia',
  'Powierzchnie ponadpodłogowe',],
  },
  {
    id: 'scierka-mikrofazy-zielona-32x32',
    name: 'CleanPRO Ścierka z mikrofazy ziel. 32x32',
    category: 'Ścierki',
    application: [
  'Kuchnia',
  'Powierzchnie ponadpodłogowe',],
  },
  {
    id: 'scierka-ultra-soft-blue-30x30',
    name: 'CleanPRO ścierka ultra soft 30x30 blue',
    category: 'Ścierki',
    application: [
  'Mycie szyb',
  'Powierzchnie ponadpodłogowe',],
  },
  {
    id: 'scierka-ultra-soft-red-30x30',
    name: 'CleanPRO ścierka ultra soft 30x30 red',
    category: 'Ścierki',
    application: ['Sanitariaty',],
  },
  {
    id: 'scierka-ultra-soft-green-30x30',
    name: 'CleanPRO ścierka ultra soft 30x30 green',
    category: 'Ścierki',
    application: [
  'Kuchnia',
  'Powierzchnie ponadpodłogowe',],
  },
  {
    id: 'scierka-ultra-soft-yellow-30x30',
    name: 'CleanPRO ścierka ultra soft 30x30 yellow',
    category: 'Ścierki',
    application: [
  'Kuchnia',
  'Powierzchnie ponadpodłogowe',],
  },
  {
    id: 'scierka-ultra-soft-orange-30x30',
    name: 'CleanPRO ścierka ultra soft 30x30 orange',
    category: 'Ścierki',
    application: [
  'Kuchnia',
  'Powierzchnie ponadpodłogowe',],
  },
  {
    id: 'scierka-mikrofaza-niebieska-40x40-320',
    name: 'CleanPRO Ścierka mikr.nieb.40x40 320g/m2',
    category: 'Ścierki',
    application: ['Mycie szyb',],
  },
  {
    id: 'scierka-mikrofaza-czerwona-40x40-320',
    name: 'CleanPRO Ścierka mikr.czer.40x40 320g/m2',
    category: 'Ścierki',
    application: ['Sanitariaty',],
  },
  {
    id: 'scierka-do-szyb-niebieska-40x40',
    name: 'CleanPRO Ścierka do szyb nieb. 40x40cm',
    category: 'Ścierki',
    application: ['Mycie szyb'],
  },
  {
    id: 'scierka-do-polerowania-32x32',
    name: 'CleanPRO ścierka do polerowania 32x32cm',
    category: 'Ścierki',
    application: ['Mycie szyb'],
  },
  {
    id: 'scierka-waflowa-niebieska-40x40',
    name: 'CleanPRO Ścierka waflowa nieb. 40x40cm',
    category: 'Ścierki',
    application: ['Mycie szyb'],
  },
  {
    id: 'scierka-mikrofaza-orange-50x60',
    name: 'CleanPRO Ścierka z mikrof. orange 50x60',
    category: 'Ścierki',
    application: ['Powierzchnie ponadpodłogowe'],
  },
  {
    id: 'scierka-mikrofaza-niebieska-50x60',
    name: 'CleanPRO ścierka z mikrof. nieb. 50x60',
    category: 'Ścierki',
    application: ['Mycie szyb'],
  },
  {
    id: 'scierka-mikrofazy-czerwona-30x30',
    name: 'CleanPRO Ścierka z mikrofazy czerw.30x30',
    category: 'Ścierki',
    application: ['Sanitariaty'],
  },
  {
    id: 'scierka-mikrofazy-niebieska-30x30',
    name: 'CleanPRO Ścierka z mikrofazy nieb. 30x30',
    category: 'Ścierki',
    application: [],
  },
  {
    id: 'scierka-mikrofibra-zolta-30x30',
    name: 'CleanPRO ścierka z mikrof. żółta 30x30',
    category: 'Ścierki',
    application: ['Kuchnia'],
  },
  {
    id: 'scierka-mikrofibra-zielona-30x30',
    name: 'CleanPRO ścierka z mikrof. zielona 30x30',
    category: 'Ścierki',
    application: ['Kuchnia'],
  },
  {
    id: 'scierka-mikrofaza-czerwona-40x40-220',
    name: 'CleanPRO ścierka mikr.czer.40x40 220g/m2',
    category: 'Ścierki',
    application: ['Sanitariaty'],
  },
  {
    id: 'scierka-mikrofaza-niebieska-40x40-220',
    name: 'CleanPRO ścierka mikr.nieb.40x40 220g/m2',
    category: 'Ścierki',
    application: ['Mycie szyb'],
  },
  {
    id: 'scierka-mikrofaza-zielona-40x40-220',
    name: 'CleanPRO ścierka mikr.ziel.40x40 220g/m2',
    category: 'Ścierki',
    application: ['Kuchnia', 'Powierzchnie ponadpodłogowe'],
  },
  {
    id: 'scierka-mikrofaza-zielona-40x40-320',
    name: 'CleanPRO Ścier z mikr ziel 40x40 320gsm',
    category: 'Ścierki',
    application: ['Kuchnia', 'Powierzchnie ponadpodłogowe'],
  },
  {
    id: 'scierka-mikrofaza-zolta-40x40-320',
    name: 'CleanPRO Ścier z mikr żółta 40x40 320gsm',
    category: 'Ścierki',
    application: ['Kuchnia'],
  },
  {
    id: 'scierka-mikro-50x60-niebieska-350',
    name: 'CleanPRO ścier.mikro.50x60 nieb.350 g/m2',
    category: 'Ścierki',
    application: ['Mycie szyb'],
  },
  {
    id: 'scierka-mikro-50x60-czerwona-350',
    name: 'CleanPRO ścier.mikro.50x60 czerw.350g/m2',
    category: 'Ścierki',
    application: ['Sanitariaty'],
  },
  {
    id: 'scierka-ultra-soft-red-32x32',
    name: 'CleanPRO ścierka ultra soft 32x32 red',
    category: 'Ścierki',
    application: ['Sanitariaty'],
  },
  {
    id: 'scierka-ultra-soft-blue-32x32',
    name: 'CleanPRO ścierka ultra soft 32x32, blue',
    category: 'Ścierki',
    application: ['Mycie szyb'],
  },
  {
    id: 'scierka-ultra-soft-grey-red-30x30',
    name: 'CleanPRO ścier ultra soft 30x30 grey/red',
    category: 'Ścierki',
    application: ['Sanitariaty'],
  },
  {
    id: 'scierka-ultra-soft-grey-red-32x32',
    name: 'CleanPRO ścier ultra soft 32x32 grey/red',
    category: 'Ścierki',
    application: ['Sanitariaty'],
  },
  {
    id: 'scierka-soft-red-32x32-320',
    name: 'CleanPRO ścierka soft 32x32, 320g red',
    category: 'Ścierki',
    application: ['Sanitariaty'
    ],
  },
  {
    id: 'scierka-soft-blue-32x32-320',
    name: 'CleanPRO ścierka soft 32x32, 320g blue',
    category: 'Ścierki',
    application: ['Mycie szyb'],
  },
  {
    id: 'scierka-soft-green-32x32-320',
    name: 'CleanPRO ścierka soft 32x32, 320g green',
    category: 'Ścierki',
    application: ['Kuchnia', 'Powierzchnie ponadpodłogowe'],
  },
  {
    id: 'scierka-soft-yellow-32x32-320',
    name: 'CleanPRO ścierka soft 32x32, 320g yellow',
    category: 'Ścierki',
    application: ['Kuchnia', 'Powierzchnie ponadpodłogowe'],
  },
  {
    id: 'scierka-mikrof-bb-niebieska-32x32',
    name: 'CleanPRO Ścierka mikrof. BB nieb. 32x32',
    category: 'Ścierki',
    application: ['Mycie szyb',],
  },
  {
    id: 'scierka-mikrof-bb-zielona-32x32',
    name: 'CleanPRO Ścierka mikrof. BB ziel. 32x32',
    category: 'Ścierki',
    application: ['Kuchnia', 'Powierzchnie ponadpodłogowe'],
  },
  {
    id: 'scierka-mikrof-bb-czerwona-32x32',
    name: 'CleanPRO Ścierka mikrof. BB czerw 32x32',
    category: 'Ścierki',
    application: ['Sanitariaty'],
  },
  {
    id: 'scierka-mikrof-bb-zolta-32x32',
    name: 'CleanPRO Ścierka mikrof. BB żółta 32x32',
    category: 'Ścierki',
    application: ['Kuchnia', 'Powierzchnie ponadpodłogowe',],
  },
  {
    id: 'scierka-soft-czerwona-40x40-220',
    name: 'CleanPRO ścierka soft 40x40 220g czerwon',
    category: 'Ścierki',
    application: ['Sanitariaty',],
  },
  {
    id: 'scierka-soft-niebieska-40x40-220',
    name: 'CleanPRO ścierka soft 40x40 220g niebies',
    category: 'Ścierki',
    application: ['Mycie szyb'],
  },
  {
    id: 'scierka-soft-zielona-40x40-220',
    name: 'CleanPRO ścierka soft 40x40 220g zielona',
    category: 'Ścierki',
    application: ['Kuchnia', 'Powierzchnie ponadpodłogowe',],
  },
  {
    id: 'scierka-soft-zolta-40x40-220',
    name: 'CleanPRO ścierka soft 40x40 220g żółta',
    category: 'Ścierki',
    application: ['Kuchnia', 'Powierzchnie ponadpodłogowe',],
  },
  {
    id: 'scierka-mikro-zolta-40x40-220',
    name: 'CleanPRO ścierka mikr.żółta40x40 220g/m2',
    category: 'Ścierki',
    application: ['Kuchnia', 'Powierzchnie ponadpodłogowe',],
  },
  {
    id: 'scierka-mikrofazy-biala-32x32',
    name: 'CleanPRO Ścierka z mikrofazy biała 32x32',
    category: 'Ścierki',
    application: ['Powierzchnie ponadpodłogowe',],
  },

  // Kije (4 produktów)
  {
    id: 'kij-aluminiowy-140cm-25mm',
    name: 'CleanPRO Kij 140cm aluminiowy śr 25mm',
    category: 'Kije',
    application: ['Mycie podłóg', 'Teren zewnętrzny'],
  },
  {
    id: 'kij-teleskopowy-140cm-22mm',
    name: 'CleanPRO Kij teleskop 140cm alum śr 22mm',
    category: 'Kije',
    application: ['Mycie podłóg', 'Teren zewnętrzny'],
  },
  {
    id: 'kij-aluminiowy-140cm-22mm',
    name: 'CleanPRO Kij aluminiowy 140cm śr 22mm',
    category: 'Kije',
    application: ['Mycie podłóg', 'Teren zewnętrzny'],
  },
  {
    id: 'kij-do-zamiataczy',
    name: 'CLEANPRO KIJ DO ZAMIATACZY',
    category: 'Kije',
    application: ['Teren zewnętrzny'],
  },

  // Ściągaczki (3 produktów)
  {
    id: 'sciagaczka-do-podlog-45cm',
    name: 'CleanPRO Ściągaczka do podł. plast. 45cm',
    category: 'Ściągaczki',
    application: ['Mycie podłóg'],
  },
  {
    id: 'sciagaczka-do-podlog-55cm',
    name: 'CleanPRO Ściągaczka do podł. plast. 55cm',
    category: 'Ściągaczki',
    application: ['Mycie podłóg'],
  },
  {
    id: 'sciagaczka-do-podlog-75cm',
    name: 'CleanPRO Ściągaczka do podł. plast. 75cm',
    category: 'Ściągaczki',
    application: ['Mycie podłóg'],
  },

  // Pozostałe (2 produktów)
  {
    id: 'tablica-sliska-podloga-bez-logo',
    name: 'CleanPRO Tablica Śliska podłoga bez logo',
    category: 'Pozostałe',
    application: ['Mycie podłóg'],
  },
  {
    id: 'tablica-sliska-podloga',
    name: 'CleanPRO Tablica Śliska podłoga',
    category: 'Pozostałe',
    application: ['Mycie podłóg'],
  },

  // Worki (20 produktów)
  {
    id: 'worki-ldpe-120l-bezbarwne-25',
    name: 'EN worki LDPE 120l (25) bezbarwne',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-ldpe-120l-biale-25',
    name: 'EN worki LDPE 120l (25) białe',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-ldpe-120l-brazowe-25',
    name: 'EN worki LDPE 120l (25) brązowe',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-ldpe-120l-czarne-25',
    name: 'EN worki LDPE 120l (25) czarne',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-ldpe-120l-czerwone-25',
    name: 'EN worki LDPE 120l (25) czerwone',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-ldpe-120l-niebieskie-25',
    name: 'EN worki LDPE 120l (25) niebieskie',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-ldpe-120l-zielone-25',
    name: 'EN worki LDPE 120l (25) zielone',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-ldpe-120l-zolte-25',
    name: 'EN worki LDPE 120l (25) żółte',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-cleanpro-160l-czarne-20',
    name: 'Worki na śmieci CleanPRO, 160l, czarne, LDPE, 20 sztuk',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-cleanpro-160l-czerwone-20',
    name: 'Worki na śmieci CleanPRO, 160l, czerwone, LDPE, 20 sztuk',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-cleanpro-160l-niebieskie-20',
    name: 'Worki na śmieci CleanPRO, 160l, niebieskie, LDPE, 20 sztuk',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-cleanpro-160l-zielone-20',
    name: 'Worki na śmieci CleanPRO, 160l, zielone, LDPE, 20 sztuk',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-cleanpro-160l-zolte-20',
    name: 'Worki na śmieci CleanPRO, 160l, żółte, LDPE, 20 sztuk',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-cleanpro-35l-czarne-50',
    name: 'Worki na śmieci CleanPRO, 35l, czarne, LDPE, 50 sztuk',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-cleanpro-35l-czerwone-50',
    name: 'Worki na śmieci CleanPRO, 35l, czerwone, LDPE, 50 sztuk',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-cleanpro-35l-niebieskie-50',
    name: 'Worki na śmieci CleanPRO, 35l, niebieskie, LDPE, 50 sztuk',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-ldpe-60l-czarne-50',
    name: 'EN worki LDPE 60l (50) czarne',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-ldpe-60l-czerwone-50',
    name: 'EN worki LDPE 60l (50) czerwone',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-ldpe-60l-niebieskie-50',
    name: 'EN worki LDPE 60l (50) niebieskie',
    category: 'Worki',
    application: [],
  },
  {
    id: 'worki-cleanpro-90l-czarne-25',
    name: 'Worki na śmieci CleanPRO, 90l, czarne, LDPE, 25 sztuk',
    category: 'Worki',
    application: [],
  },

  // Miotły i szczotki (4 produktów)
  {
    id: 'zamiatacz-ogrodowy-23cm',
    name: 'CLEANPRO ZAMIATACZ OGRODOWY 23CM',
    category: 'Miotły i szczotki',
    application: ['Teren zewnętrzny'],
  },
  {
    id: 'szczotka-do-szorowania-27cm',
    name: 'CLEANPRO SZCZOTKA DO SZOROWANIA 27CM',
    category: 'Miotły i szczotki',
    application: ['Mycie podłóg'],
  },
  {
    id: 'miotla-plastikowa-30cm',
    name: 'CLEANPRO MIOTŁA PLASTIKOWA 30CM',
    category: 'Miotły i szczotki',
    application: ['Mycie podłóg', 'Teren zewnętrzny'],
  },
  {
    id: 'zestaw-leniuch-niebieski',
    name: 'CLEANPRO ZESTAW LENIUCH NIEBIESKI KPL',
    category: 'Miotły i szczotki',
    application: ['Mycie podłóg'],
  },
];
