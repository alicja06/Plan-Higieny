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
      'Mycie bieżące: 1% (100 ml / 10 l wody); doczyszczanie powierzchni: 1–5% (100–500 ml / 10 l wody); trudne zabrudzenia: 10–50% (1–5 l środka / 10 l wody). Umyj powierzchnię przygotowanym roztworem, a następnie dokładnie spłucz czystą wodą. W przypadku silniejszych zabrudzeń zalecamy powtórzenie czynności.',
    dosage: '100 ml / 10 l wody',
  },
  {
    name: 'Profimax F303',
    type: 'Chlorowy',
    description: 'Chlorowy środek myjąco-dezynfekujący do mycia i dezynfekcji powierzchni płaskich',
    ph: 12,
    phLabel: '12',
    application: 'Powierzchnie płaskie',
    frequency: ['Okresowo'],
    usage:
      'Przygotuj roztwór: do mycia bieżącego: 1–2% (100–200 ml na 10 l wody); do mycia i dezynfekcji powierzchni: 1–5% (100–500 ml na 10 l wody). Umyj powierzchnię przygotowanym roztworem, a następnie dokładnie spłucz czystą wodą. W przypadku silniejszych zabrudzeń zalecamy powtórzenie czynności.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'Profimax F314',
    type: 'Koncentrat odkamieniający',
    description: 'Koncentrat odkamieniający do mycia i usuwania zabrudzeń mineralnych z powierzchni płaskich',
    ph: 2,
    phLabel: '2',
    application: 'Powierzchnie płaskie',
    frequency: ['Okresowo'],
    usage:
      'Przygotuj roztwór: 1–10% (100 ml – 1 l na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz obficie czystą wodą.',
    dosage: '100 ml – 1 l / 10 L wody',
  },
  {
    name: 'Profimax F310',
    type: 'Płyn do nabłyszczania',
    description: 'Płyn do nabłyszczania naczyń w zmywarkach przemysłowych',
    ph: 3,
    phLabel: '3',
    application: 'Naczynia',
    frequency: ['Codziennie'],
    usage:
      'Używaj zgodnie z instrukcją zmywarki przemysłowej. Należy używać z automatem dozującym.',
    dosage: '0,5–2 g / l wody',
  },
  {
    name: 'Profimax F315',
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
    name: 'Profimax F312',
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
    name: 'Profimax F320',
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
    name: 'Profimax F316',
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
    name: 'Profimax F317',
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
    name: 'Profimax F313',
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
    name: 'Profimax F318',
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
    name: 'Profimax F319',
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
    name: 'Profimax F319',
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
    name: 'Profimax F308',
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
    name: 'Profimax F309',
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
    name: 'Profimax F310',
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
    name: 'Profimax F315',
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
    name: 'Biopur E1',
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
