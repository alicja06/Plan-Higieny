export interface Product {
  name: string;
  type: string;
  description: string;
  ph: number;
  phLabel: string;
  application: string;
  frequency: string[];
  usage: string;
  dosage: string;
}

export const products: Product[] = [
  {
    name: 'Alkaliczny koncentrat do mycia podłóg Biopur F301',
    type: 'Koncentrat',
    description: 'Zasadowy środek niskopienny do codziennego mycia podłóg',
    ph: 11,
    phLabel: '11',
    application: 'Mycie podłóg',
    frequency: ['Codziennie', 'Okresowo'],
    usage:
      'Mycie bieżące: 1% (100 ml / 10 l roztworu); doczyszczanie powierzchni: 1–5% (100–500 ml / 10 l roztworu); trudne zabrudzenia: 10–50% (1–5 l środka / 10 l roztworu). Umyj powierzchnię przygotowanym roztworem, a następnie dokładnie spłucz czystą wodą. W przypadku silniejszych zabrudzeń zalecamy powtórzenie czynności.',
    dosage: '100 ml / 10 l roztworu',
  },
  {
    name: 'Ekologiczny płyn do czyszczenia powierzchni szklanych Biopur E1',
    type: 'Gotowy do użycia',
    description: 'Alkoholowy płyn do codziennego mycia powierzchni szklanych na bazie naturalnych składników',
    ph: 7,
    phLabel: '7',
    application: 'Mycie szyb',
    frequency: ['Codziennie', 'Okresowo'],
    usage:
      'Spryskaj czystą ścierkę płynem. Wyczyść powierzchnię i wytrzyj ją do sucha. W przypadku silniejszych zabrudzeń powtórz czynność. ',
    dosage: 'Bez rozcieńczania',
  },
  {
    name: 'Ekologiczny płyn do mycia powierzchni Biopur E2',
    type: 'Gotowy do użycia',
    description: 'Ekologiczny płyn do codziennego mycia i pielęgnacji powierzchni odpornych na działanie wody',
    ph: 7,
    phLabel: '7',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Spryskaj raz płynem czystą ścierkę. Wyczyść powierzchnię i wytrzyj ją do sucha. W przypadku silniejszych zabrudzeń powtórz czynność.',
    dosage: 'Bez rozcieńczania',
  },
  {
    name: 'Ekologiczny uniwersalny koncentrat do mycia podłóg manualnie Biopur E6, 1l',
    type: 'Koncentrat',
    description: 'Ekologiczny, neutralny koncentrat do codziennego mycia podłóg oparty na naturalnych składnikach',
    ph: 7,
    phLabel: '7',
    application: 'Mycie podłóg',
    frequency: ['Codziennie'],
    usage:
      'Lekkie zabrudzenia: 0,25% (25 ml koncentratu / 10 l roztworu), średnie zabrudzenia: 0,5% (50 ml koncentratu / 10 l roztworu), trudne zabrudzenia: 2% (200 ml koncentratu / 10 l roztworu)',
    dosage: '25 ml / 10 l roztworu',
  },
  {
    name: 'do wypełnienia',
    type: 'Alkaliczny środek dezynfekujący',
    description: 'Alkaliczny środek myjąco-dezynfekujący do mycia i dezynfekcji powierzchni płaskich',
    ph: 12,
    phLabel: '12',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Przygotuj roztwór: 1–5% (100–500 ml na 10 l wody). Umyj i zdezynfekuj powierzchnię przygotowanym roztworem. Następnie spłucz obficie czystą wodą.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Alkaliczny środek myjący',
    description: 'Alkaliczny środek myjący do podłóg i powierzchni płaskich',
    ph: 11,
    phLabel: '11',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Przygotuj roztwór: 1–5% (100–500 ml na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz czystą wodą.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Alkaliczny środek myjący',
    description: 'Alkaliczny środek myjący do podłóg i powierzchni płaskich',
    ph: 11,
    phLabel: '11',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Przygotuj roztwór: 1–5% (100–500 ml na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz czystą wodą.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Alkaliczny środek myjący',
    description: 'Alkaliczny środek myjący do podłóg i powierzchni płaskich',
    ph: 11,
    phLabel: '11',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Przygotuj roztwór: 1–5% (100–500 ml na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz czystą wodą.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Alkaliczny środek myjący',
    description: 'Alkaliczny środek myjący do podłóg i powierzchni płaskich',
    ph: 11,
    phLabel: '11',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Przygotuj roztwór: 1–5% (100–500 ml na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz czystą wodą.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Kwasowy środek do sanitariatów',
    description: 'Kwasowy środek do mycia i dezynfekcji sanitariatów',
    ph: 2,
    phLabel: '2',
    application: 'Sanitariaty',
    frequency: ['Okresowo'],
    usage:
      'Przygotuj roztwór: 1–10% (100 ml – 1 l na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz obficie czystą wodą.',
    dosage: '100 ml – 1 l / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Alkaliczny środek myjący',
    description: 'Alkaliczny środek myjący do podłóg i powierzchni płaskich',
    ph: 11,
    phLabel: '11',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Przygotuj roztwór: 1–5% (100–500 ml na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz czystą wodą.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Alkaliczny środek myjący',
    description: 'Alkaliczny środek myjący do podłóg i powierzchni płaskich',
    ph: 11,
    phLabel: '11',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Przygotuj roztwór: 1–5% (100–500 ml na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz czystą wodą.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Alkaliczny środek myjący',
    description: 'Alkaliczny środek myjący do podłóg i powierzchni płaskich',
    ph: 11,
    phLabel: '11',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Przygotuj roztwór: 1–5% (100–500 ml na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz czystą wodą.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Alkaliczny środek myjący',
    description: 'Alkaliczny środek myjący do podłóg i powierzchni płaskich',
    ph: 11,
    phLabel: '11',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Przygotuj roztwór: 1–5% (100–500 ml na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz czystą wodą.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Alkaliczny środek myjący',
    description: 'Alkaliczny środek myjący do podłóg i powierzchni płaskich',
    ph: 11,
    phLabel: '11',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Przygotuj roztwór: 1–5% (100–500 ml na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz czystą wodą.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Alkaliczny środek myjący',
    description: 'Alkaliczny środek myjący do podłóg i powierzchni płaskich',
    ph: 11,
    phLabel: '11',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Przygotuj roztwór: 1–5% (100–500 ml na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz czystą wodą.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Alkaliczny środek myjący',
    description: 'Alkaliczny środek myjący do podłóg i powierzchni płaskich',
    ph: 11,
    phLabel: '11',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Przygotuj roztwór: 1–5% (100–500 ml na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz czystą wodą.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Ekologiczny płyn do czyszczenia powierzchni szklanych',
    description: 'Ekologiczny płyn do czyszczenia powierzchni szklanych, 1 l',
    ph: 7,
    phLabel: '7',
    application: 'Powierzchnie szklane',
    frequency: ['Codziennie'],
    usage:
      'Produkt nie wymaga rozcieńczania. Spryskaj czystą ścierkę płynem. Wyczyść powierzchnię i wytrzyj ją do sucha. W przypadku silniejszych zabrudzeń powtórz czynność.',
    dosage: 'Bez rozcieńczania',
  },
];
