import { ArrowLeft, Download } from 'lucide-react';
import type { Product } from './data/products';
import type { Accessory } from './data/accessories';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import MontserratRegular from './assets/fonts/Montserrat-Regular.js';

function phColor(ph: number): string {
  if (ph < 5) return 'bg-red-100 text-red-700 ring-red-200';
  if (ph < 6.9) return 'bg-orange-100 text-orange-700 ring-orange-200';
  if (ph < 7.1) return 'bg-emerald-100 text-emerald-700 ring-emerald-200';
  if (ph <= 10) return 'bg-sky-100 text-sky-700 ring-sky-200';
  return 'bg-indigo-100 text-indigo-700 ring-indigo-200';
}

type Props = {
  selectedChemistry: Product[];
  selectedAccessories: Accessory[];
  onBack: () => void;
};

function HygienePlan({ selectedChemistry, selectedAccessories, onBack }: Props) {
  const today = new Date().toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const totalSelected = selectedChemistry.length + selectedAccessories.length;

  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  const loadOptionalImage = async (
  src?: string
): Promise<HTMLImageElement | null> => {
  if (!src) return null;

  try {
    return await loadImage(src);
  } catch {
    return null;
  }
};

const getImageFormat = (src?: string): 'PNG' | 'JPEG' =>
  src?.toLowerCase().split('?')[0].endsWith('.png') ? 'PNG' : 'JPEG';

  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');

    pdf.addFileToVFS('Montserrat-Regular.ttf', MontserratRegular);
    pdf.addFont('Montserrat-Regular.ttf', 'Montserrat', 'normal');
    pdf.setFont('Montserrat', 'normal');

    try {
      const logo = await loadImage('/images/logo-kawido.png');
      const logoWidth = 45;
      const logoHeight = (logo.height * logoWidth) / logo.width;
      pdf.addImage(logo, 'PNG', 150, 10, logoWidth, logoHeight);
    } catch {
      // Logo jest elementem dekoracyjnym; jego brak nie powinien blokować PDF-u.
    }

    pdf.setFontSize(18);
    pdf.text('Plan higieny', 15, 35);
    pdf.setFontSize(10);
    pdf.text(`Wygenerowano: ${today}`, 15, 28);

    let nextY = 48;

  const chemistryImages = await Promise.all(
  selectedChemistry.map((p) => loadOptionalImage(p.image))
);

const accessoryImages = await Promise.all(
  selectedAccessories.map((p) => loadOptionalImage(p.image))
);

    if (selectedChemistry.length > 0) {
      pdf.setFontSize(13);
      pdf.text('Chemia', 15, nextY);
      autoTable(pdf, {
        startY: nextY + 4,
        head: [['Zdjęcie', 'Produkt', 'pH', 'Dozowanie', 'Zastosowanie', 'Powierzchnie', 'Instrukcja użycia']],
        body: selectedChemistry.map((p) => ['', p.name, p.phLabel, p.dosage, p.application.join(', '), p.surfaces.join(', '), p.usage]),
        styles: { font: 'Montserrat', fontStyle: 'normal', fontSize: 7, cellPadding: 2, overflow: 'linebreak', valign: 'top' },
        headStyles: { fillColor: [44, 90, 63], textColor: 255, font: 'Montserrat', fontStyle: 'normal', fontSize: 7, halign: 'center', valign: 'middle' },
        columnStyles: {
  0: { cellWidth: 14 },
  1: { cellWidth: 32 },
  2: { cellWidth: 10 },
  3: { cellWidth: 28 },
  4: { cellWidth: 30 },
  5: { cellWidth: 32 },
  6: { cellWidth: 34 },
},
        pageBreak: 'auto',
        rowPageBreak: 'avoid',
didDrawCell: (data) => {
  if (data.section === 'body' && data.column.index === 0) {
    const product = selectedChemistry[data.row.index];
    const image = chemistryImages[data.row.index];

    if (product?.image && image) {
      pdf.addImage(
        image,
        getImageFormat(product.image),
        data.cell.x + 1,
        data.cell.y + 1,
        12,
        12
      );
    }
  }
},
      });
      nextY = (pdf as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? nextY + 20;
      nextY += 12;
    }

    if (selectedAccessories.length > 0) {
      if (nextY > 255) {
        pdf.addPage();
        nextY = 20;
      }
      pdf.setFontSize(13);
      pdf.text('Akcesoria i artykuły higieniczne', 15, nextY);
autoTable(pdf, {
  startY: nextY + 4,
  tableWidth: 'wrap',
  head: [['Zdjęcie', 'Produkt', 'Kategoria', 'Zastosowanie']],
  body: selectedAccessories.map((p) => [
    '',
    p.name,
    p.category,
    p.application.join(', ') || 'Nie przypisano',
  ]),
  styles: {
    font: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 7,
    cellPadding: 2,
    overflow: 'linebreak',
    valign: 'middle',
  },
  headStyles: {
    fillColor: [44, 90, 63],
    textColor: 255,
    font: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 7,
    halign: 'center',
    valign: 'middle',
  },
  columnStyles: {
    0: { cellWidth: 18, minCellHeight: 18 },
    1: { cellWidth: 60 },
    2: { cellWidth: 40 },
    3: { cellWidth: 60 },
  },
  pageBreak: 'auto',
  rowPageBreak: 'avoid',
  didDrawCell: (data) => {
    if (data.section === 'body' && data.column.index === 0) {
      const product = selectedAccessories[data.row.index];
      const image = accessoryImages[data.row.index];

      if (product?.image && image) {
        pdf.addImage(
          image,
          getImageFormat(product.image),
          data.cell.x + 1,
          data.cell.y + 1,
          16,
          16
        );
      }
    }
  },
});
    }

    pdf.save('plan-higieny.pdf');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center">
  <img
    src="/images/logo-kawido1.png"
    alt="Kawido"
    className="h-full w-full object-contain"
  />
</div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-primary sm:text-xl">Plan higieny</h1>
                <p className="text-sm text-slate-500">Wygenerowano {today} · {totalSelected} {totalSelected === 1
  ? 'produkt'
  : totalSelected % 100 >= 12 && totalSelected % 100 <= 14
    ? 'produktów'
    : totalSelected % 10 >= 2 && totalSelected % 10 <= 4
      ? 'produkty'
      : 'produktów'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={generatePDF} className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"><Download className="h-3.5 w-3.5" /> Pobierz PDF</button>
              <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white transition hover:bg-primary-dark"><ArrowLeft className="h-3.5 w-3.5" /> Wróć</button>
            </div>
          </div>
        </div>
      </header>
      <main id="hygiene-plan" className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {totalSelected === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="text-sm text-slate-500">Brak produktów w planie. Wróć i dodaj produkty do planu higieny.</p>
            <button type="button" onClick={onBack} className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white"><ArrowLeft className="h-3.5 w-3.5" /> Wróć do konfiguratora</button>
          </div>
        ) : (
          <>
            {selectedChemistry.length > 0 && (
              <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3"><h2 className="font-semibold text-primary">Chemia</h2></div>
                <div className="hidden overflow-x-auto sm:block">
                  <table className="w-full text-left text-sm">
                    <thead><tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><th className="px-4 py-3 font-medium">Zdjęcie</th><th className="px-4 py-3 font-medium">Produkt</th><th className="px-4 py-3 font-medium">Zastosowanie</th><th className="px-4 py-3 font-medium">Powierzchnie</th><th className="px-4 py-3 font-medium">pH</th><th className="px-4 py-3 font-medium">Dozowanie</th><th className="px-4 py-3 font-medium">Instrukcja użycia</th><th className="px-4 py-3 font-medium">Częstotliwość</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedChemistry.map((p) => <tr key={p.name} className="align-top transition hover:bg-slate-50">
                        <td className="px-4 py-3"><img src={p.image} alt={p.name} className="h-20 w-20 rounded-lg object-contain" /></td>
                        <td className="px-4 py-3 font-medium text-primary">{p.name}</td><td className="px-4 py-3 text-slate-600">{p.application.join(', ')}</td><td className="max-w-xs px-4 py-3 text-slate-600">{p.surfaces.join(', ')}</td>
                        <td className="px-4 py-3"><span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${phColor(p.ph)}`}>{p.phLabel}</span></td><td className="px-4 py-3 text-slate-600">{p.dosage}</td><td className="max-w-xs px-4 py-3 text-slate-600">{p.usage}</td><td className="px-4 py-3 text-slate-600">{p.frequency.join(', ')}</td>
                      </tr>)}
                    </tbody>
                  </table>
                </div>
                <div className="divide-y divide-slate-100 sm:hidden">
                  {selectedChemistry.map((p) => <div key={p.name} className="p-4">
                    <img src={p.image} alt={p.name} className="mb-4 h-40 w-full rounded-lg object-contain" />
                    <div className="flex items-start justify-between gap-3"><h3 className="font-medium text-primary">{p.name}</h3><span className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${phColor(p.ph)}`}>pH {p.phLabel}</span></div>
                    <div className="mt-4 space-y-3 text-sm">
                      <div><div className="text-xs font-medium uppercase tracking-wide text-slate-500">Zastosowanie</div><div className="mt-1 text-slate-700">{p.application.join(', ')}</div></div>
                      <div><div className="text-xs font-medium uppercase tracking-wide text-slate-500">Powierzchnie</div><div className="mt-1 text-slate-700">{p.surfaces.join(', ')}</div></div>
                      <div><div className="text-xs font-medium uppercase tracking-wide text-slate-500">Dozowanie</div><div className="mt-1 text-slate-700">{p.dosage}</div></div>
                      <div><div className="text-xs font-medium uppercase tracking-wide text-slate-500">Instrukcja użycia</div><div className="mt-1 leading-relaxed text-slate-700">{p.usage}</div></div>
                      <div><div className="text-xs font-medium uppercase tracking-wide text-slate-500">Częstotliwość</div><div className="mt-1 text-slate-700">{p.frequency.join(', ')}</div></div>
                    </div>
                  </div>)}
                </div>
              </section>
            )}
            {selectedAccessories.length > 0 && (
              <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3"><h2 className="font-semibold text-primary">Akcesoria i artykuły higieniczne</h2></div>
                <div className="hidden overflow-x-auto sm:block">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <th className="px-4 py-3 font-medium">Zdjęcie</th>
                        <th className="px-4 py-3 font-medium">Produkt</th>
                        <th className="px-4 py-3 font-medium">Kategoria</th>
                        <th className="px-4 py-3 font-medium">Zastosowanie</th>
                      </tr>
                    </thead>
<tbody className="divide-y divide-slate-100">
  {selectedAccessories.map((p) => (
    <tr key={p.id} className="align-top hover:bg-slate-50">
      <td className="px-4 py-3">
        {p.image && (
          <img
            src={p.image}
            alt={p.name}
            className="h-16 w-16 rounded object-contain"
          />
        )}
      </td>
      <td className="px-4 py-3 font-medium text-primary">
        {p.name}
      </td>
      <td className="px-4 py-3 text-slate-600">
        {p.category}
      </td>
      <td className="px-4 py-3 text-slate-600">
        {p.application.length
          ? p.application.join(', ')
          : 'Nie przypisano'}
      </td>
    </tr>
  ))}
</tbody>
                  </table>
                </div>
<div className="divide-y divide-slate-100 sm:hidden">
  {selectedAccessories.map((p) => (
    <div key={p.id} className="p-4">
      {p.image && (
        <img
          src={p.image}
          alt={p.name}
          className="mb-3 h-32 w-full rounded-lg object-contain"
        />
      )}

      <h3 className="font-medium text-primary">{p.name}</h3>
      <p className="mt-1 text-xs text-slate-500">{p.category}</p>
      <p className="mt-3 text-sm text-slate-700">
        <span className="text-slate-500">Zastosowanie: </span>
        {p.application.length
          ? p.application.join(', ')
          : 'Nie przypisano'}
      </p>
    </div>
  ))}
</div>
              </section>
            )}
          </>
        )}
      </main>
      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-slate-400 sm:px-6">Konfigurator planu higieny Kawido</div></footer>
    </div>
  );
}

export default HygienePlan;
