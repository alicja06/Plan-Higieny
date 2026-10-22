
import { useEffect, useMemo, useState } from 'react';
import {
  RotateCcw,
  FlaskConical,
  Layers,
  Clock,
  Filter,
  Plus,
  Check,
  FileText,
  X,
  Package,
} from 'lucide-react';
import { products, type Product } from './data/products';
import { accessories, type Accessory } from './data/accessories';
import HygienePlan from './HygienePlan';

type PhRangeKey = 'all' | 'acidic' | 'neutral' | 'alkaline';
type ProductGroup = 'chemistry' | 'accessories';

const PH_RANGES: {
  key: PhRangeKey;
  label: string;
  min: number;
  max: number;
}[] = [
  { key: 'all', label: 'Wszystkie', min: 0, max: 14 },
  { key: 'acidic', label: 'Kwaśne (pH < 7)', min: 0, max: 6.9 },
  { key: 'neutral', label: 'Neutralne (pH 7)', min: 6.9, max: 7.1 },
  { key: 'alkaline', label: 'Zasadowe (pH > 7)', min: 7.1, max: 14 },
];

const APPLICATIONS = [
  'Kuchnia',
  'Mycie podłóg',
  'Mycie szyb',
  'Powierzchnie ponadpodłogowe',
  'Sanitariaty',
  'Teren zewnętrzny',
] as const;

const FREQUENCIES = ['Codziennie', 'Okresowo', 'W razie potrzeby'];
const ITEMS_PER_PAGE = 15;

function phColor(ph: number): string {
  if (ph < 5) return 'bg-red-100 text-red-700 ring-red-200';
  if (ph < 6.9) return 'bg-orange-100 text-orange-700 ring-orange-200';
  if (ph < 7.1) return 'bg-emerald-100 text-emerald-700 ring-emerald-200';
  if (ph <= 10) return 'bg-sky-100 text-sky-700 ring-sky-200';
  return 'bg-indigo-100 text-indigo-700 ring-indigo-200';
}

function getAccessorySize(p: Accessory): string | null {
  const text = `${p.name} ${p.id}`;

  if (p.category === 'Ścierki') {
    const match = text.match(/(\d{2,3})\s*[x×]\s*(\d{2,3})/i);

    return match ? `${match[1]} × ${match[2]} cm` : null;
  }

  if (p.category === 'Mopy') {
    const match = text.match(/(\d{2,3})\s*cm\b/i);

    return match ? `${match[1]} cm` : null;
  }

  return null;
}

function App() {
  const [group, setGroup] = useState<ProductGroup | null>(null);
  const [application, setApplication] = useState('');
  const [frequency, setFrequency] = useState('');
  const [phRange, setPhRange] = useState<PhRangeKey>('all');

  const [accessoryCategory, setAccessoryCategory] = useState('');
  const [accessoryApplication, setAccessoryApplication] =
    useState<Accessory['application'][number] | ''>('');

  const [paperType, setPaperType] = useState('');
  const [paperMaterial, setPaperMaterial] = useState('');
  const [rollDiameter, setRollDiameter] = useState('');
  const [bagCapacity, setBagCapacity] = useState('');
  const [bagColor, setBagColor] = useState('');
  const [accessorySize, setAccessorySize] = useState('');

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [view, setView] = useState<'config' | 'plan'>('config');
  const [currentPage, setCurrentPage] = useState(1);

  const activeRange = PH_RANGES.find((r) => r.key === phRange)!;

  const chemistryApplications = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.application))).sort(),
    [],
  );

  const accessoryCategories = useMemo(
    () =>
      accessoryApplication
        ? Array.from(
            new Set(
              accessories
                .filter((p) =>
                  p.application.includes(accessoryApplication),
                )
                .map((p) => p.category),
            ),
          ).sort()
        : [],
    [accessoryApplication],
  );

  const accessorySizes = useMemo(
  () =>
    Array.from(
      new Set(
        accessories
          .filter(
            (p) =>
              p.category === accessoryCategory &&
              (!accessoryApplication ||
                p.application.includes(accessoryApplication)),
          )
          .map(getAccessorySize)
          .filter((size): size is string => size !== null),
      ),
    ).sort((a, b) =>
      a.localeCompare(b, 'pl', { numeric: true }),
    ),
  [accessoryCategory, accessoryApplication],
);

  const filteredChemistry: Product[] = useMemo(
    () =>
      products.filter((p) => {
        if (application && !p.application.includes(application)) {
          return false;
        }

        if (frequency && !p.frequency.includes(frequency)) {
          return false;
        }

        if (
          phRange !== 'all' &&
          (p.ph < activeRange.min || p.ph > activeRange.max)
        ) {
          return false;
        }

        return true;
      }),
    [application, frequency, phRange, activeRange],
  );

  const filteredAccessories: Accessory[] = useMemo(
    () =>
      accessories.filter((p) => {
        if (
          accessoryApplication &&
          !p.application.includes(accessoryApplication)
        ) {
          return false;
        }

        if (accessoryCategory && p.category !== accessoryCategory) {
          return false;
        }

        if (accessorySize && getAccessorySize(p) !== accessorySize) {
          return false;
        }

        const isPaperTowel =
          accessoryCategory === 'Ręczniki papierowe';
        const isToiletPaper =
          accessoryCategory === 'Papiery toaletowe';
        const isPaperCategory = isPaperTowel || isToiletPaper;

        if (isPaperCategory) {
          if (paperType && p.type !== paperType) {
            return false;
          }

          if (paperMaterial && p.material !== paperMaterial) {
            return false;
          }

          if (
            rollDiameter &&
            String(p.rollDiameter ?? '') !== rollDiameter
          ) {
            return false;
          }
        }

        if (accessoryCategory === 'Worki') {
          if (
            bagCapacity &&
            String(p.capacity ?? '') !== bagCapacity
          ) {
            return false;
          }

          if (bagColor && p.color !== bagColor) {
            return false;
          }
        }

        return true;
      }),
      [
      accessoryApplication,
      accessoryCategory,
      accessorySize,
      paperType,
      paperMaterial,
      rollDiameter,
      bagCapacity,
      bagColor,
    ],
  );

  const filteredCount =
    group === 'accessories'
      ? filteredAccessories.length
      : filteredChemistry.length;

  const totalPages = Math.ceil(filteredCount / ITEMS_PER_PAGE);

  const paginatedChemistry = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredChemistry.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredChemistry, currentPage]);

  const paginatedAccessories = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAccessories.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAccessories, currentPage]);

  const selectedChemistry = useMemo(
    () => products.filter((p) => selected.has(`chem:${p.name}`)),
    [selected],
  );

  const selectedAccessories = useMemo(
    () => accessories.filter((p) => selected.has(`acc:${p.id}`)),
    [selected],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    group,
    application,
    frequency,
    phRange,
    accessoryApplication,
    accessoryCategory,
    accessorySize,
    paperType,
    paperMaterial,
    rollDiameter,
    bagCapacity,
    bagColor,
  ]);

  const resetChemistryFilters = () => {
    setApplication('');
    setFrequency('');
    setPhRange('all');
    setCurrentPage(1);
  };

  const resetAccessoryFilters = () => {
    setAccessoryApplication('');
    setAccessoryCategory('');
    setAccessorySize('');
    setPaperType('');
    setPaperMaterial('');
    setRollDiameter('');
    setBagCapacity('');
    setBagColor('');
    setCurrentPage(1);
  };

  const addProduct = (key: string) => {
    setSelected((prev) => new Set(prev).add(key));
  };

  const removeProduct = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push('...');
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push('...');
    }

    pages.push(totalPages);
    return pages;
  };

  if (view === 'plan') {
    return (
      <HygienePlan
        selectedChemistry={selectedChemistry}
        selectedAccessories={selectedAccessories}
        onBack={() => setView('config')}
      />
    );
  }

  if (group === null) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <h1 className="text-lg font-semibold tracking-tight text-primary sm:text-xl">
              Konfigurator planu higieny
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Wybierz grupę produktów, od której chcesz rozpocząć.
            </p>
          </div>
        </header>

        <main className="mx-auto grid max-w-4xl grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6">
          <button
            type="button"
            onClick={() => setGroup('chemistry')}
            className="rounded-xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:border-primary hover:shadow-md"
          >
            <FlaskConical className="mb-4 h-8 w-8 text-primary" />
            <h2 className="text-lg font-semibold text-primary">Chemia</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Dobierz środki czystości według zastosowania, częstotliwości i
              odczynu pH.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setGroup('accessories')}
            className="rounded-xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:border-primary hover:shadow-md"
          >
            <Package className="mb-4 h-8 w-8 text-primary" />
            <h2 className="text-lg font-semibold text-primary">
              Akcesoria i artykuły higieniczne
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Dobierz akcesoria do sprzątania i artykuły higieniczne.
            </p>
          </button>

          {selected.size > 0 && (
            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={() => setView('plan')}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
              >
                <FileText className="h-4 w-4" />
                Otwórz plan ({selected.size})
              </button>
            </div>
          )}
        </main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-slate-400 sm:px-6">
            Konfigurator planu higieny Kawido
          </div>
        </footer>
      </div>
    );
  }

  const isChemistry = group === 'chemistry';

    const hasFilters = isChemistry
    ? application !== '' || frequency !== '' || phRange !== 'all'
    : accessoryApplication !== '' ||
      accessoryCategory !== '' ||
      accessorySize !== '' ||
      paperType !== '' ||
      paperMaterial !== '' ||
      rollDiameter !== '' ||
      bagCapacity !== '' ||
      bagColor !== '';

  const reset = isChemistry
    ? resetChemistryFilters
    : resetAccessoryFilters;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-primary sm:text-xl">
                Konfigurator planu higieny
              </h1>
              <p className="text-sm text-slate-500">
                {isChemistry
                  ? 'Dobierz środki czystości według zastosowania, częstotliwości i odczynu pH'
                  : 'Wybierz obszar zastosowania, a następnie kategorię produktów'}
              </p>
            </div>

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
                {selected.size === 1
                  ? 'produkt w planie'
                  : selected.size % 100 >= 12 &&
                      selected.size % 100 <= 14
                    ? 'produktów w planie'
                    : selected.size % 10 >= 2 &&
                        selected.size % 10 <= 4
                      ? 'produkty w planie'
                      : 'produktów w planie'}
              </span>

              {selected.size > 0 && (
                <FileText className="h-4 w-4 text-slate-500 transition group-hover:text-primary" />
              )}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setGroup('chemistry')}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                isChemistry
                  ? 'bg-primary text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <FlaskConical className="mr-1.5 inline h-4 w-4" />
              Chemia
            </button>

            <button
              type="button"
              onClick={() => setGroup('accessories')}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                !isChemistry
                  ? 'bg-primary text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Package className="mr-1.5 inline h-4 w-4" />
              Akcesoria i artykuły higieniczne
            </button>

            <button
              type="button"
              onClick={() => setGroup(null)}
              className="ml-auto rounded-md px-3 py-2 text-sm text-slate-500 hover:bg-slate-100"
            >
              Wybór grupy
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
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

          {isChemistry ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                  <Layers className="h-3.5 w-3.5" />
                  Zastosowanie
                </label>
                <select
                  value={application}
                  onChange={(e) => setApplication(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="">Wszystkie</option>
                  {chemistryApplications.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  Częstotliwość
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="">Wszystkie</option>
                  {FREQUENCIES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                  <FlaskConical className="h-3.5 w-3.5" />
                  Odczyn pH
                </label>
                <select
                  value={phRange}
                  onChange={(e) =>
                    setPhRange(e.target.value as PhRangeKey)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  {PH_RANGES.map((r) => (
                    <option key={r.key} value={r.key}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div>
              {!accessoryApplication ? (
                <>
                  <p className="mb-3 text-sm text-slate-600">
                    1. Wybierz obszar zastosowania
                  </p>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {APPLICATIONS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => {
                          setAccessoryApplication(a);
                          setAccessoryCategory('');
                          setAccessorySize('');
                          setPaperType('');
                          setPaperMaterial('');
                          setRollDiameter('');
                          setBagCapacity('');
                          setBagColor('');
                        }}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-4 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:border-primary hover:bg-slate-50 hover:text-primary"
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </>
              ) : !accessoryCategory ? (
                <>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm text-slate-600">
                      2. Wybierz kategorię produktów dla:{' '}
                      <strong>{accessoryApplication}</strong>
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setAccessoryApplication('');
                        setAccessoryCategory('');
                        setPaperType('');
                        setPaperMaterial('');
                        setRollDiameter('');
                        setBagCapacity('');
                        setBagColor('');
                      }}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      ← Zmień obszar
                    </button>
                  </div>

                  {accessoryCategories.length ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {accessoryCategories.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setAccessoryCategory(c);
                            setPaperType('');
                            setPaperMaterial('');
                            setRollDiameter('');
                            setBagCapacity('');
                            setBagColor('');
                            setAccessorySize('');
                          }}
                          className="rounded-lg border border-slate-200 bg-white px-4 py-4 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:border-primary hover:bg-slate-50 hover:text-primary"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
                      Nie przypisano jeszcze produktów do tego obszaru.{' '}
                      <button
                        type="button"
                        onClick={() => setAccessoryApplication('')}
                        className="font-medium text-primary hover:underline"
                      >
                        Wybierz inny obszar
                      </button>
                      .
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <p className="text-slate-600">
                      Obszar: <strong>{accessoryApplication}</strong>
                      <span className="mx-1 text-slate-300">/</span>
                      Kategoria: <strong>{accessoryCategory}</strong>
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setAccessoryCategory('');
                        setPaperType('');
                        setPaperMaterial('');
                        setRollDiameter('');
                        setBagCapacity('');
                        setBagColor('');
                        setAccessorySize('');
                      }}
                      className="font-medium text-primary hover:underline"
                    >
                      ← Zmień kategorię
                    </button>
                  </div>

                  {(accessoryCategory === 'Ręczniki papierowe' ||
                    accessoryCategory === 'Papiery toaletowe') && (
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {/* Typ */}
                      <div>
                        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
                          Typ
                        </label>
                        <select
                          value={paperType}
                          onChange={(e) => {
                            const nextType = e.target.value;
                            setPaperType(nextType);

                            if (nextType === 'składane') {
                              setRollDiameter('');
                            }
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                        >
                          <option value="">Wszystkie</option>

                          {accessoryCategory === 'Ręczniki papierowe' && (
                            <>
                              <option value="składane">Składane</option>
                              <option value="w roli">W roli</option>
                              <option value="systemowe">Systemowe</option>
                            </>
                          )}

                          {accessoryCategory === 'Papiery toaletowe' && (
                            <option value="Jumbo">Jumbo</option>
                          )}
                        </select>
                      </div>

                      {/* Materiał */}
                      <div>
                        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
                          Materiał
                        </label>
                        <select
                          value={paperMaterial}
                          onChange={(e) => setPaperMaterial(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                        >
                          <option value="">Wszystkie</option>
                          <option value="celuloza">Celuloza</option>
                          <option value="makulatura">Makulatura</option>
                        </select>
                      </div>

                      {/* Średnica rolki */}
                      {(accessoryCategory === 'Papiery toaletowe' ||
                        (accessoryCategory === 'Ręczniki papierowe' &&
                          paperType !== 'składane')) && (
                        <div>
                          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
                            Średnica rolki
                          </label>

                          <select
                            value={rollDiameter}
                            onChange={(e) =>
                              setRollDiameter(e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                          >
                            <option value="">Wszystkie</option>

                            {accessoryCategory === 'Ręczniki papierowe' && (
                              <>
                                <option value="18">18 cm</option>
                                <option value="19">19 cm</option>
                              </>
                            )}

                            {accessoryCategory === 'Papiery toaletowe' && (
                              <>
                                <option value="15">15 cm</option>
                                <option value="18">18 cm</option>
                                <option value="18.5">18,5 cm</option>
                                <option value="19">19 cm</option>
                              </>
                            )}
                          </select>

                          <p className="mt-1.5 text-xs text-slate-500">
                            Porównaj wymiar z parametrami posiadanego dozownika.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

                                {accessoryCategory === 'Worki' && (
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
                          Pojemność
                        </label>
                        <select
                          value={bagCapacity}
                          onChange={(e) => setBagCapacity(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                        >
                          <option value="">Wszystkie</option>
                          <option value="35">35 l</option>
                          <option value="60">60 l</option>
                          <option value="90">90 l</option>
                          <option value="120">120 l</option>
                          <option value="160">160 l</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
                          Kolor
                        </label>
                        <select
                          value={bagColor}
                          onChange={(e) => setBagColor(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                        >
                          <option value="">Wszystkie</option>
                          <option value="bezbarwny">Bezbarwne</option>
                          <option value="biały">Białe</option>
                          <option value="brązowy">Brązowe</option>
                          <option value="czarny">Czarne</option>
                          <option value="czerwony">Czerwone</option>
                          <option value="niebieski">Niebieskie</option>
                          <option value="zielony">Zielone</option>
                          <option value="żółty">Żółte</option>
                        </select>
                      </div>
                    </div>
                  )}

                                {(accessoryCategory === 'Ścierki' ||
                accessoryCategory === 'Mopy') && (
                <div className="mt-5 max-w-md">
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
                    Rozmiar
                  </label>

                  <select
                    value={accessorySize}
                    onChange={(e) => setAccessorySize(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="">Wszystkie rozmiary</option>

                    {accessorySizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </section>

        {(isChemistry || (accessoryApplication && accessoryCategory)) && (
          <section className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-slate-600">
                {isChemistry
                  ? 'Rekomendowane produkty'
                  : 'Produkty: ' + accessoryCategory}
              </h2>

              <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                {filteredCount}{' '}
                {filteredCount === 1 ? 'produkt' : 'produktów'}
              </span>
            </div>

            {filteredCount === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
                <p className="text-sm text-slate-500">
                  Brak produktów spełniających wybrane kryteria.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-dark"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Wyczyść filtry
                </button>
              </div>
            ) : isChemistry ? (
              <>
                <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm sm:block">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <th className="px-4 py-3 font-medium">Zdjęcie</th>
                        <th className="px-4 py-3 font-medium">Produkt</th>
                        <th className="px-4 py-3 font-medium">Zastosowanie</th>
                        <th className="px-4 py-3 font-medium">Powierzchnie</th>
                        <th className="px-4 py-3 font-medium">pH</th>
                        <th className="px-4 py-3 font-medium">Dozowanie</th>
                        <th className="px-4 py-3 font-medium">Rodzaj</th>
                        <th className="px-4 py-3 font-medium">Częstotliwość</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {paginatedChemistry.map((p) => {
                        const key = `chem:${p.name}`;
                        const isSelected = selected.has(key);

                        return (
                          <tr
                            key={p.name}
                            className="transition hover:bg-slate-50"
                          >
                            <td className="px-4 py-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="h-16 w-16 rounded object-contain"
                              />
                            </td>
                            <td className="px-4 py-3 font-medium text-primary">
                              {p.name}
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {p.application.join(', ')}
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {p.surfaces.join(', ')}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${phColor(p.ph)}`}
                              >
                                {p.phLabel}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {p.dosage}
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {p.type}
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {p.frequency.join(', ')}
                            </td>
                            <td className="px-4 py-3 text-right">
                              {isSelected ? (
                                <button
                                  type="button"
                                  onClick={() => removeProduct(key)}
                                  className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  W planie
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => addProduct(key)}
                                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-dark"
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

                <div className="space-y-3 sm:hidden">
                  {paginatedChemistry.map((p) => {
                    const key = `chem:${p.name}`;
                    const isSelected = selected.has(key);

                    return (
                      <div
                        key={p.name}
                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="mb-3 h-32 w-full rounded-lg object-contain"
                        />

                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-medium text-primary">
                            {p.name}
                          </h3>
                          <span
                            className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${phColor(p.ph)}`}
                          >
                            pH {p.phLabel}
                          </span>
                        </div>

                        <dl className="mt-3 space-y-1.5 text-sm">
                          <div className="flex justify-between gap-3">
                            <dt className="text-slate-500">Zastosowanie</dt>
                            <dd className="text-right text-slate-700">
                              {p.application.join(', ')}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="text-slate-500">Powierzchnie</dt>
                            <dd className="text-right text-slate-700">
                              {p.surfaces.join(', ')}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="text-slate-500">Dozowanie</dt>
                            <dd className="text-right text-slate-700">
                              {p.dosage}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="text-slate-500">Rodzaj</dt>
                            <dd className="text-right text-slate-700">
                              {p.type}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="text-slate-500">Częstotliwość</dt>
                            <dd className="text-right text-slate-700">
                              {p.frequency.join(', ')}
                            </dd>
                          </div>
                        </dl>

                        {isSelected ? (
                          <button
                            type="button"
                            onClick={() => removeProduct(key)}
                            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
                          >
                            <Check className="h-4 w-4" />
                            W planie — usuń
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addProduct(key)}
                            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white"
                          >
                            <Plus className="h-4 w-4" />
                            Dodaj do planu higieny
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:block">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <th className="px-4 py-3 font-medium">Zdjęcie</th>
                        <th className="px-4 py-3 font-medium">Produkt</th>
                        <th className="px-4 py-3 font-medium">Kategoria</th>
                        <th className="px-4 py-3 font-medium">Zastosowanie</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {paginatedAccessories.map((p) => {
                        const key = `acc:${p.id}`;
                        const isSelected = selected.has(key);

                        
                        return (
                          <tr
                            key={p.id}
                            className="transition hover:bg-slate-50"
  >
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
                            <td className="px-4 py-3 text-right">
                              {isSelected ? (
                                <button
                                  type="button"
                                  onClick={() => removeProduct(key)}
                                  className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  W planie
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => addProduct(key)}
                                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-dark"
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

                <div className="space-y-3 sm:hidden">
                  {paginatedAccessories.map((p) => {
                    const key = `acc:${p.id}`;
                    const isSelected = selected.has(key);

                    return (
                      
                    <div
                      key={p.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                    {p.image && (
                      <img
                      src={p.image}
                      alt={p.name}
                      className="mb-3 h-32 w-full rounded-lg object-contain"
                    />
                    )}

  <h3 className="font-medium text-primary">{p.name}</h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {p.category}
                        </p>

                        <div className="mt-3 text-sm">
                          <span className="text-slate-500">
                            Zastosowanie:{' '}
                          </span>
                          <span className="text-slate-700">
                            {p.application.length
                              ? p.application.join(', ')
                              : 'Nie przypisano'}
                          </span>
                        </div>

                        {isSelected ? (
                          <button
                            type="button"
                            onClick={() => removeProduct(key)}
                            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
                          >
                            <Check className="h-4 w-4" />
                            W planie — usuń
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addProduct(key)}
                            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white"
                          >
                            <Plus className="h-4 w-4" />
                            Dodaj do planu
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </section>
        )}

        {(isChemistry || (accessoryApplication && accessoryCategory)) &&
          totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm disabled:opacity-40"
              >
                ← Poprzednia
              </button>

              {getVisiblePages().map((page, index) =>
                page === '...' ? (
                  <span
                    key={`dots-${index}`}
                    className="px-2 text-slate-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page as number)}
                    className={`h-9 w-9 rounded-md text-sm font-medium transition ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'border border-slate-300 bg-white hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

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

      {selected.size > 0 && (
        <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                {selected.size}
              </span>

              <span className="text-sm font-medium text-slate-700">
                {selected.size === 1
                  ? 'produkt w planie'
                  : selected.size % 100 >= 12 &&
                      selected.size % 100 <= 14
                    ? 'produktów w planie'
                    : selected.size % 10 >= 2 &&
                        selected.size % 10 <= 4
                      ? 'produkty w planie'
                      : 'produktów w planie'}
              </span>

              <button
                type="button"
                onClick={clearSelection}
                className="hidden items-center gap-1 text-xs text-slate-500 hover:text-slate-700 sm:inline-flex"
              >
                <X className="h-3.5 w-3.5" />
                Wyczyść
              </button>
            </div>

            <button
              type="button"
              onClick={() => setView('plan')}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
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
