import { useEffect, useMemo, useState } from 'react';
import { RotateCcw, FlaskConical, Layers, Clock, Filter, Plus, Check, FileText, X } from 'lucide-react';
import { products, type Product } from './data/products';
import HygienePlan from './HygienePlan';

type PhRangeKey = 'all' | 'acidic' | 'neutral' | 'alkaline';

const PH_RANGES: { key: PhRangeKey; label: string; min: number; max: number }[] = [
  { key: 'all', label: 'Wszystkie', min: 0, max: 14 },
  { key: 'acidic', label: 'Kwaśne (pH < 7)', min: 0, max: 6.9 },
  { key: 'neutral', label: 'Neutralne (pH 7)', min: 6.9, max: 7.1 },
  { key: 'alkaline', label: 'Zasadowe (pH > 7)', min: 7.1, max: 14 },
];

function phColor(ph: number): string {
  if (ph < 5) return 'bg-red-100 text-red-700 ring-red-200';
  if (ph < 6.9) return 'bg-orange-100 text-orange-700 ring-orange-200';
  if (ph < 7.1) return 'bg-emerald-100 text-emerald-700 ring-emerald-200';
  if (ph <= 10) return 'bg-sky-100 text-sky-700 ring-sky-200';
  return 'bg-indigo-100 text-indigo-700 ring-indigo-200';
}

function App() {
  const applications = useMemo(
    () => Array.from(new Set(products.map((p) => p.application))).sort(),
    [],
  );
  const FREQUENCIES = useMemo(() => ['Codziennie', 'Okresowo', 'W razie potrzeby'], []);

  const [application, setApplication] = useState('');
  const [frequency, setFrequency] = useState('');
  const [phRange, setPhRange] = useState<PhRangeKey>('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [view, setView] = useState<'config' | 'plan'>('config');
  
  const ITEMS_PER_PAGE = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const activeRange = PH_RANGES.find((r) => r.key === phRange)!;

  const filtered: Product[] = useMemo(() => {
    return products.filter((p) => {
      if (application && p.application !== application) return false;
      if (frequency && !p.frequency.includes(frequency)) return false;
      if (phRange !== 'all' && (p.ph < activeRange.min || p.ph > activeRange.max)) return false;
      return true;
    });
  }, [application, frequency, phRange, activeRange]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  return filtered.slice(start, start + ITEMS_PER_PAGE);
}, [filtered, currentPage]);

useEffect(() => {
  setCurrentPage(1);
}, [application, frequency, phRange]);

  const hasFilters = application !== '' || frequency !== '' || phRange !== 'all';

  const selectedProducts = useMemo(
    () => products.filter((p) => selected.has(p.name)),
    [selected],
  );

  const reset = () => {
  setApplication('');
  setFrequency('');
  setPhRange('all');
  setCurrentPage(1);
};

  const addProduct = (name: string) => {
    setSelected((prev) => new Set(prev).add(name));
  };

  const removeProduct = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());

  if (view === 'plan') {
    return <HygienePlan selected={selectedProducts} onBack={() => setView('config')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-primary sm:text-xl">
                  Konfigurator planu higieny
                </h1>
                <p className="text-sm text-slate-500">
                  Dobierz produkty czyszczące według zastosowania, częstotliwości i odczynu pH
                </p>
              </div>
            </div>

            {/* Plan counter */}
            <button
              type="button"
              onClick={() => selected.size > 0 && setView('plan')}
              disabled={selected.size === 0}
              className="group flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition hover:border-slate-300 hover:bg-white disabled:cursor-default disabled:opacity-60"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                {selected.size}
              </span>
              <span className="hidden text-sm font-medium text-slate-700 sm:inline">
                {selected.size === 1 ? 'produkt w planie' : 'produkty w planie'}
              </span>
              {selected.size > 0 && (
                <FileText className="h-4 w-4 text-slate-500 transition group-hover:text-primary" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Filters */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Filter className="h-4 w-4 text-slate-400" />
              Filtry
            </div>
            <button
              type="button"
              onClick={reset}
              disabled={!hasFilters}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Application */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                <Layers className="h-3.5 w-3.5" />
                Zastosowanie
              </label>
              <select
                value={application}
                onChange={(e) => setApplication(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm transition focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="">Wszystkie</option>
                {applications.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Frequency */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                Częstotliwość
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm transition focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="">Wszystkie</option>
                {FREQUENCIES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* pH */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                <FlaskConical className="h-3.5 w-3.5" />
                Odczyn pH
              </label>
              <select
                value={phRange}
                onChange={(e) => setPhRange(e.target.value as PhRangeKey)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm transition focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                {PH_RANGES.map((r) => (
                  <option key={r.key} value={r.key}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium text-slate-600">
              Rekomendowane produkty
            </h2>
            <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {filtered.length} {filtered.length === 1 ? 'produkt' : 'produktów'}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <p className="text-sm text-slate-500">
                Brak produktów spełniających wybrane kryteria.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white transition hover:bg-primary-dark"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Wyczyść filtry
              </button>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:block">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <th className="px-4 py-3 font-medium">Produkt</th>
                      <th className="px-4 py-3 font-medium">Zastosowanie</th>
                      <th className="px-4 py-3 font-medium">pH</th>
                      <th className="px-4 py-3 font-medium">Dozowanie</th>
                      <th className="px-4 py-3 font-medium">Rodzaj</th>
                      <th className="px-4 py-3 font-medium">Częstotliwość</th>
                      <th className="px-4 py-3 text-right font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedProducts.map((p) => {
                      const isSelected = selected.has(p.name);
                      return (
                        <tr key={p.name} className="transition hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-primary">{p.name}</td>
                          <td className="px-4 py-3 text-slate-600">{p.application}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${phColor(p.ph)}`}
                            >
                              {p.phLabel}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-600">{p.dosage}</td>
                          <td className="px-4 py-3 text-slate-600">{p.type}</td>
                          <td className="px-4 py-3 text-slate-600">{p.frequency.join(', ')}</td>
                          <td className="px-4 py-3 text-right">
                            {isSelected ? (
                              <button
                                type="button"
                                onClick={() => removeProduct(p.name)}
                                className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-100"
                              >
                                <Check className="h-3.5 w-3.5" />
                                W planie
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => addProduct(p.name)}
                                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white transition hover:bg-primary-dark"
                              >
                                <Plus className="h-3.5 w-3.5" />
                                Dodaj do planu
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="space-y-3 sm:hidden">
                {paginatedProducts.map((p) => {
                  const isSelected = selected.has(p.name);
                  return (
                    <div
                      key={p.name}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-primary">{p.name}</h3>
                        <span
                          className={`inline-flex shrink-0 items-center justify-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${phColor(p.ph)}`}
                        >
                          pH {p.phLabel}
                        </span>
                      </div>
                      <dl className="mt-3 space-y-1.5 text-sm">
                        <div className="flex justify-between gap-3">
                          <dt className="text-slate-500">Zastosowanie</dt>
                          <dd className="text-right text-slate-700">{p.application}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-slate-500">Dozowanie</dt>
                          <dd className="text-right text-slate-700">{p.dosage}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-slate-500">Rodzaj</dt>
                          <dd className="text-right text-slate-700">{p.type}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-slate-500">Częstotliwość</dt>
                          <dd className="text-right text-slate-700">{p.frequency.join(', ')}</dd></div>
                      </dl>
                      <div className="mt-3">
                        {isSelected ? (
                          <button
                            type="button"
                            onClick={() => removeProduct(p.name)}
                            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-100"
                          >
                            <Check className="h-4 w-4" />
                            W planie — usuń
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addProduct(p.name)}
                            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
                          >
                            <Plus className="h-4 w-4" />
                            Dodaj do planu higieny
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
        
        {totalPages > 1 && (
  <div className="mt-6 flex items-center justify-center gap-2">
    <button
      type="button"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
      className="rounded-md border border-slate-300 px-3 py-2 text-sm disabled:opacity-40"
    >
      ← Poprzednia
    </button>

    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        type="button"
        onClick={() => setCurrentPage(i + 1)}
        className={`h-9 w-9 rounded-md text-sm font-medium transition ${
          currentPage === i + 1
            ? 'bg-primary text-white'
            : 'border border-slate-300 bg-white hover:bg-slate-100'
        }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      type="button"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
      className="rounded-md border border-slate-300 px-3 py-2 text-sm disabled:opacity-40"
    >
      Następna →
    </button>
  </div>
)}
      </main>

      {/* Selection bar */}
      {selected.size > 0 && (
        <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                {selected.size}
              </span>
              <span className="text-sm font-medium text-slate-700">
                {selected.size === 1 ? 'produkt w planie' : 'produkty w planie'}
              </span>
              <button
                type="button"
                onClick={clearSelection}
                className="hidden items-center gap-1 text-xs text-slate-500 transition hover:text-slate-700 sm:inline-flex"
              >
                <X className="h-3.5 w-3.5" />
                Wyczyść
              </button>
            </div>
            <button
              type="button"
              onClick={() => setView('plan')}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
            >
              <FileText className="h-4 w-4" />
              Generuj plan higieny
            </button>
          </div>
        </div>
      )}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-slate-400 sm:px-6">
          Konfigurator planu higieny Kawido
        </div>
      </footer>
    </div>
  );
}

export default App;
