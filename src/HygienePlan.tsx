
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Download,
  Plus,
  X,
  ChevronRight,
  Check,
} from 'lucide-react';
import type { Product } from './data/products';
import type { Accessory } from './data/accessories';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';
import MontserratRegular from './assets/fonts/Montserrat-Regular.js';
import MontserratBoldUrl from './assets/fonts/Montserrat-Bold.ttf?url';

type Props = {
  selected: Product[];
  selectedAccessories: Accessory[];
  allAccessories: Accessory[];
  frequencyValues: Record<string, string>;
  onFrequencyChange: (productName: string, value: string) => void;
  onToggleAccessory: (id: string) => void;
  onRemoveProduct: (name: string) => void;
  onBack: () => void;
};

function phColor(ph: number): string {
  if (ph < 5) return 'bg-red-100 text-red-700 ring-red-200';
  if (ph < 6.9) return 'bg-orange-100 text-orange-700 ring-orange-200';
  if (ph < 7.1) return 'bg-emerald-100 text-emerald-700 ring-emerald-200';
  if (ph <= 10) return 'bg-sky-100 text-sky-700 ring-sky-200';
  return 'bg-indigo-100 text-indigo-700 ring-indigo-200';
}

function getAccessoryParameters(accessory: Accessory): string[] {
  return (accessory.parameters ?? [])
    .filter((parameter) => parameter.label.trim() && parameter.value.trim())
    .map((parameter) => `${parameter.label}: ${parameter.value}`);
}

function HygienePlan({
  selected,
  selectedAccessories,
  allAccessories,
  frequencyValues,
  onFrequencyChange,
  onToggleAccessory,
  onRemoveProduct,
  onBack,
}: Props) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState<Set<string>>(
    new Set(),
  );

  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [objectName, setObjectName] = useState('');
  const [preparedBy, setPreparedBy] = useState('');

  useEffect(() => {
    if (!expandedCategory) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedCategory(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expandedCategory]);

  const today = new Date().toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Zastosowania wybrane na podstawie dodanych do planu środków.
  const selectedApplications = useMemo(
    () => new Set(selected.flatMap((product) => product.application)),
    [selected],
  );

  // Pokazujemy wszystkie pasujące akcesoria, również już dodane do planu.
  const recommendedAccessories = useMemo(
    () =>
      allAccessories.filter((accessory) =>
        accessory.application.some((app) => selectedApplications.has(app)),
      ),
    [allAccessories, selectedApplications],
  );

  const accessoryCategories = useMemo(
    () =>
      Array.from(
        new Set(recommendedAccessories.map((accessory) => accessory.category)),
      ).sort((a, b) => a.localeCompare(b, 'pl')),
    [recommendedAccessories],
  );

  const toggleCategory = (category: string) => {
    setExpandedCategory((previous) =>
      previous === category ? null : category,
    );
  };

  const toggleShowAll = (category: string) => {
    setShowAllCategories((previous) => {
      const next = new Set(previous);

      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }

      return next;
    });
  };

  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  const handleLogoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const input = event.currentTarget;
    const file = input.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Wybierz plik graficzny.');
      input.value = '';
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    try {
      const image = await loadImage(objectUrl);

      const scale = Math.min(
        1,
        1600 / Math.max(image.width, image.height),
      );

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);

      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Nie udało się przetworzyć grafiki.');
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      setCustomLogo(canvas.toDataURL('image/png'));
    } catch (error) {
      console.error('Nie udało się wczytać logo:', error);
      alert('Nie udało się wczytać tego pliku graficznego.');
    } finally {
      URL.revokeObjectURL(objectUrl);
      input.value = '';
    }
  };

  const generatePDF = async () => {
    const pdf = new jsPDF('l', 'mm', 'a4');
      const boldFontResponse = await fetch(MontserratBoldUrl);
  const boldFontBuffer = await boldFontResponse.arrayBuffer();

  const boldFontBase64 = btoa(
    new Uint8Array(boldFontBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      '',
    ),
  );
    pdf.addFileToVFS('Montserrat-Regular.ttf', MontserratRegular);
    pdf.addFont('Montserrat-Regular.ttf', 'Montserrat', 'normal');

    pdf.addFileToVFS('Montserrat-Bold.ttf', boldFontBase64);
    pdf.addFont('Montserrat-Bold.ttf', 'Montserrat', 'bold');

    pdf.setFont('Montserrat', 'normal');

try {
  const logo = await loadImage(
    customLogo ?? '/images/logo-kawido.png',
  );

  // Logo mieści się w obszarze 45 × 25 mm.
  // Zachowujemy jego proporcje.
  const scale = Math.min(
    45 / logo.width,
    25 / logo.height,
  );

  const logoWidth = logo.width * scale;
  const logoHeight = logo.height * scale;

  // Wyrównanie do prawej krawędzi.
  pdf.addImage(
    logo,
    'PNG',
    282 - logoWidth,
    10,
    logoWidth,
    logoHeight,
  );
} catch (error) {
  console.error('Nie udało się dodać logo do PDF:', error);
}

    pdf.setFontSize(18);
    pdf.text('Plan higieny', 15, 35);

    pdf.setFontSize(10);
    pdf.text(`Wygenerowano: ${today}`, 15, 28);

    // Dane obiektu i osoby opracowującej plan.
    // Puste pola nie są drukowane.
    pdf.setFontSize(10);

    let nextY = 44;

    const addPdfDetail = (label: string, value: string) => {
      const trimmedValue = value.trim();

      if (!trimmedValue) return;

      const lines = pdf.splitTextToSize(
        `${label}: ${trimmedValue}`,
        190,
      );

      pdf.text(lines, 15, nextY);
      nextY += lines.length * 5;
    };

    addPdfDetail('Nazwa obiektu', objectName);
    addPdfDetail('Opracowanie', preparedBy);

    nextY = Math.max(nextY + 7, 63);

    if (selected.length > 0) {
      // Przypisujemy produkt do pierwszego zastosowania z jego danych.
      const groupedProducts = new Map<string, Product[]>();

  for (const product of selected) {
    const application = product.application[0] ?? 'Pozostałe';

    const group = groupedProducts.get(application) ?? [];
    group.push(product);
    groupedProducts.set(application, group);
  }

  // Przygotowujemy wiersze tabeli: nagłówki grup i produkty.
  const pdfRows: (
    | { type: 'group'; application: string }
    | { type: 'product'; product: Product }
  )[] = [];

  // Grupy zachowują kolejność pierwszego wystąpienia zastosowania w danych.
  for (const [application, products] of groupedProducts) {
    pdfRows.push({
      type: 'group',
      application,
    });

    for (const product of products) {
      pdfRows.push({
        type: 'product',
        product,
      });
    }
  }

  // Zapamiętujemy numery wierszy zawierających nagłówki grup
  // oraz przypisujemy produkty do właściwych wierszy tabeli.
  const groupRowIndexes = new Set<number>();
  const productRows = new Map<number, Product>();

  pdfRows.forEach((row, index) => {
    if (row.type === 'group') {
      groupRowIndexes.add(index);
    } else {
      productRows.set(index, row.product);
    }
  });

  // Generujemy kody QR przed utworzeniem tabeli.
  const qrCodes = new Map<number, string>();

      for (const [index, product] of productRows.entries()) {
        if (!product.safetyDataSheetUrl) continue;

        try {
          const qrCode = await QRCode.toDataURL(
            product.safetyDataSheetUrl,
            {
              errorCorrectionLevel: 'M',
              margin: 1,
              width: 160,
            },
          );

          qrCodes.set(index, qrCode);
        } catch (error) {
          console.error(
            `Nie udało się wygenerować kodu QR dla produktu ${product.name}:`,
            error,
          );
        }
      }

      pdf.setFontSize(12);
      pdf.text('Środki czyszczące', 15, nextY);

      autoTable(pdf, {
        startY: nextY + 5,
        head: [[
          '',
          'Produkt',
          'pH',
          'Dozowanie',
          'Zastosowanie',
          'Instrukcja użycia',
          'Częstotliwość',
          'Karta\ncharakterystyki',        
              ]],
body: pdfRows.map((row) => {
  if (row.type === 'group') {
    return [
      '',
      row.application,
      '',
      '',
      '',
      '',
      '',
      '',
    ];
  }

  const product = row.product;

  return [
    '',
    product.name,
    product.phLabel,
    product.dosage,
    product.application.join(', '),
    product.usage,
    frequencyValues[product.name] ?? product.frequency.join(', '),
    '',
  ];
}),
        styles: {
          font: 'Montserrat',
          fontStyle: 'normal',
          fontSize: 8,
          cellPadding: 3,
          overflow: 'linebreak',
          valign: 'top',
        },
        headStyles: {
          fillColor: [44, 90, 63],
          textColor: 255,
          font: 'Montserrat',
          fontStyle: 'normal',
          fontSize: 8,
          halign: 'left',
          valign: 'middle',
        },
        columnStyles: {
          0: { cellWidth: 18 },
          1: { cellWidth: 42 },
          2: { cellWidth: 12 },
          3: { cellWidth: 28 },
          4: { cellWidth: 38 },
          5: { cellWidth: 52 },
          6: { cellWidth: 34 },
          7: { cellWidth: 39 },
        },
        margin: { left: 10, right: 10 },
        pageBreak: 'auto',
        rowPageBreak: 'avoid',

        didParseCell: (data) => {
          if (data.section === 'head' && data.column.index === 7) {
            data.cell.text = ['Karta', 'charakterystyki'];
          }

          if (
            data.section === 'body' &&
            groupRowIndexes.has(data.row.index)
          ) {
            data.cell.styles.fillColor = [236, 243, 238];
            data.cell.styles.textColor = [44, 90, 63];
            data.cell.styles.fontSize = 8;
            data.cell.styles.minCellHeight = 8;
            data.cell.styles.fontStyle = 'bold';
          }

          if (
            data.section === 'body' &&
            data.column.index === 7 &&
            productRows.get(data.row.index)?.safetyDataSheetUrl
          ) {
            data.cell.styles.minCellHeight = 24;
          }
        },

        didDrawCell: (data) => {
          if (data.section !== 'body') return;

          const product = productRows.get(data.row.index);

          if (!product) return;

          // Zdjęcie produktu.
          if (data.column.index === 0 && product.image) {
            try {
              pdf.addImage(
                product.image,
                'JPEG',
                data.cell.x + 1,
                data.cell.y + 2,
                12,
                12,
              );
            } catch {
              // Pomijamy zdjęcie, jeśli nie można go dodać.
            }
          }

          // Kod QR i aktywny link do karty charakterystyki.
          if (data.column.index === 7) {
            if (!product.safetyDataSheetUrl) return;

            const qrCode = qrCodes.get(data.row.index);

            if (qrCode) {
              try {
                pdf.addImage(
                  qrCode,
                  'PNG',
                  data.cell.x + 2,
                  data.cell.y + 3,
                  18,
                  18,
                );
              } catch (error) {
                console.error(
                  'Nie udało się dodać kodu QR do PDF:',
                  error,
                );
              }
            }

            // Tekst aktywnego linku.
            pdf.setFont('Montserrat', 'normal');
            pdf.setFontSize(6.5);
            pdf.setTextColor(0, 90, 140);

            pdf.text(
              ['Otwórz', 'kartę'],
              data.cell.x + 22,
              data.cell.y + 10,
            );

            // Obszar klikalny linku.
            pdf.link(
              data.cell.x + 21,
              data.cell.y + 4,
              16,
              16,
              { url: product.safetyDataSheetUrl },
            );

            pdf.setFontSize(8);
            pdf.setTextColor(0, 0, 0);
          }
        },
      });

      nextY =
        (pdf as jsPDF & { lastAutoTable?: { finalY: number } })
          .lastAutoTable?.finalY ?? nextY;
      nextY += 12;
    }

    if (selectedAccessories.length > 0) {
      if (nextY > 175) {
        pdf.addPage();
        nextY = 20;
      }

      pdf.setFontSize(12);
      pdf.text('Akcesoria i artykuły higieniczne', 15, nextY - 3);

      // Wczytujemy zdjęcia akcesoriów przed utworzeniem tabeli PDF.
      const accessoryImages = new Map<string, HTMLImageElement>();

      for (const accessory of selectedAccessories) {
        if (!accessory.image) continue;

        try {
          const image = await loadImage(accessory.image);
          accessoryImages.set(accessory.id, image);
        } catch {
        }
      }

      autoTable(pdf, {
        startY: nextY,
        head: [[
          '',
          'Produkt',
          'Kategoria',
          'Parametry',
          'Zastosowanie',
        ]],
        body: selectedAccessories.map((accessory) => [
          '',
          accessory.name,
          accessory.category,
          getAccessoryParameters(accessory).join('\n'),
          accessory.application.join(', '),
        ]),
        styles: {
          font: 'Montserrat',
          fontStyle: 'normal',
          fontSize: 8,
          cellPadding: 3,
          overflow: 'linebreak',
          valign: 'middle',
        },
        headStyles: {
          fillColor: [44, 90, 63],
          textColor: 255,
          font: 'Montserrat',
          fontStyle: 'normal',
          fontSize: 8,
          halign: 'left',
          valign: 'middle',
        },
        bodyStyles: {
          minCellHeight: 22,
        },
        columnStyles: {
          0: { cellWidth: 18 },
          1: { cellWidth: 75 },
          2: { cellWidth: 45 },
          3: { cellWidth: 65 },
          4: { cellWidth: 60 },
        },
        margin: {
          left: 10,
          right: 10,
        },
        pageBreak: 'auto',
        rowPageBreak: 'avoid',
        didDrawCell: (data) => {
          if (data.section !== 'body' || data.column.index !== 0) {
            return;
          }

          const accessory = selectedAccessories[data.row.index];
          const image = accessoryImages.get(accessory.id);

          if (!image) return;

        try {
          const maxWidth = 12;
          const maxHeight = 16;

          const scale = Math.min(
            maxWidth / image.width,
            maxHeight / image.height,
          );

          const imageWidth = image.width * scale;
          const imageHeight = image.height * scale;

          const imageX =
            data.cell.x + (data.cell.width - imageWidth) / 2;

          const imageY =
            data.cell.y + (data.cell.height - imageHeight) / 2;

          pdf.addImage(
            image,
            'JPEG',
            imageX,
            imageY,
            imageWidth,
            imageHeight,
          );
        } catch {
          // Pomijamy zdjęcia w nieobsługiwanym formacie.
        }
        },
      });
    }

    pdf.save('plan-higieny.pdf');
  };

  const totalSelected = selected.length + selectedAccessories.length;

  const getProductLabel = (count: number): string => {
    if (count === 1) return 'produkt';

    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 12 && lastTwoDigits <= 14) {
      return 'produktów';
    }

    const lastDigit = count % 10;

    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'produkty';
    }

    return 'produktów';
  };

  const activeCategoryAccessories = expandedCategory
    ? recommendedAccessories.filter(
        (accessory) => accessory.category === expandedCategory,
      )
    : [];

  const isShowingAll = expandedCategory
    ? showAllCategories.has(expandedCategory)
    : false;

  const visibleAccessories = isShowingAll
    ? activeCategoryAccessories
    : activeCategoryAccessories.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-primary">
              Plan higieny
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Wygenerowano {today} · {totalSelected}{' '}
              {getProductLabel(totalSelected)}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Środki czyszczące: {selected.length} · Akcesoria:{' '}
              {selectedAccessories.length}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={generatePDF}
              disabled={totalSelected === 0}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Pobierz PDF
            </button>

            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Wróć
            </button>
          </div>
        </div>
      </header>

      <main
        id="hygiene-plan"
        className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-8"
      >
        {selected.length === 0 && selectedAccessories.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="text-sm text-slate-500">
              Brak produktów w planie. Wróć i dodaj produkty do planu higieny.
            </p>
          </div>
        )}
                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Uzupełnij dane
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Wszystkie pola są opcjonalne. Uzupełnione informacje zostaną
              umieszczone w pliku PDF.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="object-name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Nazwa obiektu
              </label>
              <input
                id="object-name"
                type="text"
                value={objectName}
                onChange={(event) => setObjectName(event.target.value)}
                placeholder="Wpisz nazwę obiektu"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="prepared-by"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Opracowanie
              </label>
              <input
                id="prepared-by"
                type="text"
                value={preparedBy}
                onChange={(event) => setPreparedBy(event.target.value)}
                placeholder="Imię i nazwisko"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Logo
              </label>

              <div className="flex flex-wrap items-center gap-3">
                {customLogo && (
                  <div className="flex h-12 w-24 items-center justify-center rounded-lg border border-slate-200 bg-white p-2">
                    <img
                      src={customLogo}
                      alt="Podgląd własnego logo"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}

                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                  {customLogo ? 'Zmień logo' : 'Wgraj własne logo'}

                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleLogoChange}
                  />
                </label>

                {customLogo && (
                  <button
                    type="button"
                    onClick={() => setCustomLogo(null)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
                  >
                    Przywróć logo Kawido
                  </button>
                )}

                {!customLogo && (
                  <span className="text-xs text-slate-500">
                    Domyślnie używane jest logo Kawido.
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {selected.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Chemia
              </h2>
            </div>

            <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-3 font-medium">Zdjęcie</th>
                    <th className="px-3 py-3 font-medium">Produkt</th>
                    <th className="px-3 py-3 font-medium">Powierzchnie</th>
                    <th className="px-3 py-3 font-medium">Zastosowanie</th>
                    <th className="px-3 py-3 font-medium">pH</th>
                    <th className="px-3 py-3 font-medium">Dozowanie</th>
                    <th className="px-3 py-3 font-medium">Instrukcja użycia</th>
                    <th className="px-3 py-3 font-medium">Częstotliwość</th>
                    <th className="px-3 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selected.map((product) => (
                    <tr key={product.name} className="align-top">
                      <td className="px-3 py-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-16 w-16 rounded object-contain"
                        />
                      </td>
                      <td className="px-3 py-3 font-medium text-primary">
                        <div>{product.name}</div>

                        {product.safetyDataSheetUrl && (
                          <a
                            href={product.safetyDataSheetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-block text-xs font-normal text-primary underline hover:text-primary-dark"
                          >
                            Karta charakterystyki (PDF)
                          </a>
                        )}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {product.surfaces.join(', ')}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {product.application.join(', ')}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${phColor(product.ph)}`}
                        >
                          {product.phLabel}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {product.dosage}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {product.usage}
                      </td>
                      <td className="px-3 py-3">
                        <input
                          type="text"
                          value={frequencyValues[product.name] ?? product.frequency.join(', ')}
                          onChange={(e) =>
                            onFrequencyChange(product.name, e.target.value)
                          }
                          placeholder="Wpisz częstotliwość"
                          className="w-full min-w-[150px] rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          onClick={() => onRemoveProduct(product.name)}
                          title="Usuń z planu"
                          className="rounded-md p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 lg:hidden">
              {selected.map((product) => (
                <article
                  key={product.name}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-20 w-20 shrink-0 rounded object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-primary">
                        {product.name}
                      </h3>

                      {product.safetyDataSheetUrl && (
                        <a
                          href={product.safetyDataSheetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-sm text-primary underline hover:text-primary-dark"
                        >
                          Karta charakterystyki (PDF)
                        </a>
                      )}
                      <span
                        className={`mt-2 inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${phColor(product.ph)}`}
                      >
                        pH {product.phLabel}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveProduct(product.name)}
                      aria-label={`Usuń ${product.name} z planu`}
                      className="rounded-md p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    <span className="font-medium">Powierzchnie: </span>
                    {product.surfaces.join(', ')}
                  </p>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div>
                      <dt className="text-slate-500">Zastosowanie</dt>
                      <dd>{product.application.join(', ')}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Dozowanie</dt>
                      <dd>{product.dosage}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Instrukcja użycia</dt>
                      <dd>{product.usage}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Częstotliwość wykonywania czynności</dt>
                      <dd className="mt-1">
                        <input
                          type="text"
                          value={frequencyValues[product.name] ?? product.frequency.join(', ')}
                          onChange={(e) =>
                            onFrequencyChange(product.name, e.target.value)
                          }
                          placeholder="Wpisz częstotliwość"
                          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        )}

        {selectedAccessories.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Akcesoria i artykuły higieniczne
              </h2>
            </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="hidden grid-cols-[80px_minmax(180px,1fr)_minmax(250px,1.5fr)_40px] gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs uppercase tracking-wide text-slate-500 sm:grid">
        <div className="font-medium">Zdjęcie</div>
        <div className="font-medium">Produkt</div>
        <div className="font-medium">Parametry</div>
        <div></div>
      </div>

        <ul className="divide-y divide-slate-100">
          {selectedAccessories.map((accessory) => (
            <li
              key={accessory.id}
              className="grid grid-cols-1 items-center gap-3 p-4 sm:grid-cols-[80px_minmax(180px,1fr)_minmax(250px,1.5fr)_40px] sm:gap-4"
            >
              <div className="flex items-center">
                {accessory.image ? (
                  <img
                    src={accessory.image}
                    alt={accessory.name}
                    className="h-14 w-14 rounded object-contain"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded bg-slate-50 text-xs text-slate-400">
                    Brak zdjęcia
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-primary">
                  {accessory.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {accessory.category} · {accessory.application.join(', ')}
                </p>
              </div>

              <div className="min-w-0">
                <p className="mb-1 text-xs font-medium text-slate-400 sm:hidden">
                  Parametry
                </p>
                {getAccessoryParameters(accessory).length > 0 ? (
                  <p className="text-sm text-slate-600">
                    {getAccessoryParameters(accessory).join(' · ')}
                  </p>
                ) : (
                  <span className="text-sm text-slate-400">—</span>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onToggleAccessory(accessory.id)}
                  className="rounded-md p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  aria-label={`Usuń ${accessory.name} z planu`}
                  title="Usuń z planu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
          </section>
        )}

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Uzupełnij plan o akcesoria i artykuły higieniczne
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Wybierz kategorię, aby zobaczyć pasujące akcesoria.
            </p>
          </div>

          {selected.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
              Najpierw dodaj środek czyszczący do planu, aby zobaczyć powiązane
              zastosowaniem akcesoria.
            </div>
          ) : recommendedAccessories.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
              Nie znaleziono akcesoriów przypisanych do zastosowań wybranych
              środków.
            </div>
          ) : (
            <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {accessoryCategories.map((category) => {
                const categoryAccessories = recommendedAccessories.filter(
                  (accessory) => accessory.category === category,
                );

                const categoryImage = categoryAccessories.find(
                  (accessory) => accessory.image,
                )?.image;

                const isExpanded = expandedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    aria-haspopup="dialog"
                    aria-expanded={isExpanded}
                    className={`group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      isExpanded ? 'ring-2 ring-primary/20' : ''
                    }`}
                  >
                    {categoryImage ? (
                      <img
                        src={categoryImage}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-4xl text-slate-400">
                        ▧
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-sm">
                      {categoryAccessories.length}
                    </span>

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
                      <span className="text-base font-semibold leading-snug text-white drop-shadow sm:text-lg">
                        {category}
                      </span>
                      <ChevronRight className="h-5 w-5 shrink-0 text-white" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-slate-400 sm:px-6">
          Konfigurator planu higieny Kawido
        </div>
      </footer>

      {/* Okno modalne z produktami wybranej kategorii */}
      {expandedCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setExpandedCategory(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessory-modal-title"
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl sm:max-h-[88vh]"
          >
            <header className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:px-6 sm:py-5">
              <div className="min-w-0">
                <h2
                  id="accessory-modal-title"
                  className="text-lg font-semibold text-slate-800 sm:text-xl"
                >
                  {expandedCategory}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setExpandedCategory(null)}
                aria-label="Zamknij okno wyboru produktów"
                title="Zamknij"
                className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="h-6 w-6" />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
              {activeCategoryAccessories.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">
                  Brak produktów w tej kategorii.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {visibleAccessories.map((accessory) => {
                      const isSelected = selectedAccessories.some(
                        (chosen) => chosen.id === accessory.id,
                      );

                      return (
                        <article
                          key={accessory.id}
                          className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
                        >
                          <div className="flex min-w-0 items-start gap-3">
                            {accessory.image ? (
                              <img
                                src={accessory.image}
                                alt={accessory.name}
                                loading="lazy"
                                className="h-16 w-16 shrink-0 rounded-lg bg-slate-50 object-contain p-1 sm:h-20 sm:w-20"
                              />
                            ) : (
                              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-center text-xs text-slate-400 sm:h-20 sm:w-20">
                                Brak zdjęcia
                              </div>
                            )}

                            <div className="min-w-0 flex-1">
                              <h3 className="break-words font-medium text-primary">
                                {accessory.name}
                              </h3>
                              <p className="mt-1 break-words text-xs text-slate-500">
                                {accessory.application.join(', ')}
                              </p>
                            </div>
                          </div>

                    {accessory.parameters && accessory.parameters.length > 0 && (
                      <dl className="mt-4 space-y-1.5 text-sm text-slate-600">
                        {accessory.parameters
                          .filter(
                            (parameter) =>
                              parameter.label.trim() && parameter.value.trim(),
                          )
                          .map((parameter, index) => (
                            <div
                              key={`${accessory.id}-${index}`}
                              className="flex justify-between gap-3"
                            >
                              <dt className="shrink-0">{parameter.label}</dt>
                              <dd className="text-right">{parameter.value}</dd>
                            </div>
                          ))}
                      </dl>
                    )}

                          <button
                            type="button"
                            onClick={() => onToggleAccessory(accessory.id)}
                            aria-pressed={isSelected}
                            className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                              isSelected
                                ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                : 'bg-primary text-white hover:bg-primary-dark'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check className="h-4 w-4" />
                                W planie
                              </>
                            ) : (
                              <>
                                <Plus className="h-4 w-4" />
                                Dodaj do planu
                              </>
                            )}
                          </button>
                        </article>
                      );
                    })}
                  </div>

                  {activeCategoryAccessories.length > 3 && (
                    <div className="mt-5 flex justify-center">
                      <button
                        type="button"
                        onClick={() => toggleShowAll(expandedCategory)}
                        className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-slate-100"
                      >
                        {isShowingAll
                          ? 'Pokaż mniej'
                          : `Pokaż więcej (${activeCategoryAccessories.length - 3})`}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
              <p className="text-sm text-slate-500">
                W planie:{' '}
                <span className="font-semibold text-slate-800">
                  {selectedAccessories.length}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setExpandedCategory(null)}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
              >
                Gotowe
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}

export default HygienePlan;
