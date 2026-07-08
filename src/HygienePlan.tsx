import { ArrowLeft, Download, Droplets } from 'lucide-react';import type { Product } from './data/products';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = async () => {
  const element = document.getElementById('hygiene-plan');

  if (!element) return;

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');

  const pdfWidth = 210;
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('plan-higieny.pdf');
};

function phColor(ph: number): string {
  if (ph < 5) return 'bg-red-100 text-red-700 ring-red-200';
  if (ph < 6.9) return 'bg-orange-100 text-orange-700 ring-orange-200';
  if (ph < 7.1) return 'bg-emerald-100 text-emerald-700 ring-emerald-200';
  if (ph <= 10) return 'bg-sky-100 text-sky-700 ring-sky-200';
  return 'bg-indigo-100 text-indigo-700 ring-indigo-200';
}

type Props = {
  selected: Product[];
  onBack: () => void;
};

function HygienePlan({ selected, onBack }: Props) {
  const today = new Date().toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <Droplets className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-primary sm:text-xl">
                  Plan higieny
                </h1>
                <p className="text-sm text-slate-500">
                  Wygenerowano {today} · {selected.length}{' '}
                  {selected.length === 1 ? 'produkt' : 'produktów'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={generatePDF}
                className="hidden items-center gap-1.5 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:inline-flex"
              >
                <Download className="h-3.5 w-3.5" />
                Pobierz PDF
              </button>
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white transition hover:bg-primary-dark"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Wróć
              </button>
            </div>
          </div>
        </div>
      </header>

      <main
  id="hygiene-plan"
  className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8"
>
        {selected.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="text-sm text-slate-500">
              Brak produktów w planie. Wróć i dodaj produkty do planu higieny.
            </p>
            <button
              type="button"
              onClick={onBack}
              className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white transition hover:bg-primary-dark"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Wróć do konfiguratora
            </button>
          </div>
        ) : (
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Desktop table */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3 font-medium">Produkt</th>
                    <th className="px-4 py-3 font-medium">Opis</th>
                    <th className="px-4 py-3 font-medium">Zastosowanie</th>
                    <th className="px-4 py-3 font-medium">pH</th>
                    <th className="px-4 py-3 font-medium">Dozowanie</th>
                    <th className="px-4 py-3 font-medium">Instrukcja użycia</th>
                    <th className="px-4 py-3 font-medium">Częstotliwość</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selected.map((p) => (
                    <tr key={p.name} className="align-top transition hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-primary">{p.name}</td>
                      <td className="max-w-xs px-4 py-3 text-slate-600">{p.description}</td>
                      <td className="px-4 py-3 text-slate-600">{p.application.join(', ')}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${phColor(p.ph)}`}
                        >
                          {p.phLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{p.dosage}</td>
                      <td className="max-w-xs px-4 py-3 text-slate-600">{p.usage}</td>
                      <td className="px-4 py-3 text-slate-600">{p.frequency.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="divide-y divide-slate-100 sm:hidden">
              {selected.map((p) => (
                <div key={p.name} className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-primary">{p.name}</h3>
                    <span
                      className={`inline-flex shrink-0 items-center justify-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${phColor(p.ph)}`}
                    >
                      pH {p.phLabel}
                    </span>
                  </div>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Opis
                      </dt>
                      <dd className="mt-0.5 text-slate-600">{p.description}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">Zastosowanie</dt>
                      <dd className="text-right text-slate-700">{p.application.join(', ')}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">Dozowanie</dt>
                      <dd className="text-right text-slate-700">{p.dosage}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Instrukcja użycia
                      </dt>
                      <dd className="mt-0.5 text-slate-600">{p.usage}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">Częstotliwość</dt>
                      <dd className="text-right text-slate-700">{p.frequency.join(', ')}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-slate-400 sm:px-6">
          Konfigurator planu higieny — dane przykładowe, inspirowane rozwiązaniem Lakma
        </div>
      </footer>
    </div>
  );
}

export default HygienePlan;
