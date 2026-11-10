
import { useEffect, useMemo, useState } from 'react';
import {
  RotateCcw,
  Layers,
  Filter,
  FlaskConical,
  Plus,
  Check,
  FileText,
  X,
  Hand,
  Cog,
  ChevronDown,
} from 'lucide-react';
import { products } from './data/products';
import { accessories } from './data/accessories';
import HygienePlan from './HygienePlan';

type FilterOption = {
  value: string;
  label: string;
  level?: number;
  bold?: boolean;
};

function phColor(ph: number): string {
  if (ph < 5) return 'bg-red-100 text-red-700 ring-red-200';
  if (ph < 6.9) return 'bg-orange-100 text-orange-700 ring-orange-200';
  if (ph < 7.1) return 'bg-emerald-100 text-emerald-700 ring-emerald-200';
  if (ph <= 10) return 'bg-sky-100 text-sky-700 ring-sky-200';
  return 'bg-indigo-100 text-indigo-700 ring-indigo-200';
}

function getProductLabel(count: number): string {
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
}

type FilterDropdownProps = {
  label: string;
  placeholder: string;
  selectedLabel: string;
  selectedValue: string;
  options: FilterOption[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  onClose: () => void;
};

function FilterDropdown({
  label,
  placeholder,
  selectedLabel,
  selectedValue,
  options,
  isOpen,
  onToggle,
  onSelect,
  onClose,
}: FilterDropdownProps) {
  return (
    <div className={`relative ${isOpen ? 'z-30' : 'z-0'}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-label={label}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between gap-3 rounded-lg border bg-white px-3 py-2.5 text-left text-sm shadow-sm transition ${
          isOpen
            ? 'border-slate-500 ring-2 ring-slate-100'
            : 'border-slate-300 hover:border-slate-400'
        }`}
      >
        <span className={selectedValue ? 'text-slate-800' : 'text-slate-400'}>
          {selectedValue ? selectedLabel : placeholder}
        </span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Zamknij listę"
            onClick={onClose}
            className="fixed inset-0 z-20 cursor-default"
          />

          <div className="absolute left-0 top-full z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            {options.length === 0 ? (
              <div className="px-3 py-3 text-sm text-slate-400">
                Brak dostępnych opcji
              </div>
            ) : (
              options.map((option) => {
                const isSelected = selectedValue === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onSelect(option.value);
                      onClose();
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${
                      option.level === 1 ? 'pl-7' : ''
                    } ${
                      isSelected
                        ? 'bg-slate-100 text-primary'
                        : 'text-slate-700 hover:bg-slate-100'
                    } ${option.bold ? 'font-semibold' : ''}`}
                  >
                    {option.level === 1 && (
                      <span className="text-slate-300">–</span>
                    )}

                    <span>{option.label}</span>

                    {isSelected && (
                      <Check className="ml-auto h-4 w-4 shrink-0 text-primary" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  const [selectedApplication, setSelectedApplication] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const [openFilter, setOpenFilter] = useState<
    'area' | 'task' | 'industry' | null
  >(null);

  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [frequencyValues, setFrequencyValues] = useState<
    Record<string, string>
  >({});

  const [selectedAccessoryIds, setSelectedAccessoryIds] =
    useState<Set<string>>(new Set());

  const [view, setView] = useState<'config' | 'plan'>('config');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 15;

const matchesArea = (
  product: (typeof products)[number],
  application: string,
  area: string,
) => {
  if (!application) return true;

  const productAreas = product.areas?.[application];

  if (productAreas === undefined) return false;

  if (!area) return true;

  return productAreas.includes(area);
};

  const matchesTask = (
    product: (typeof products)[number],
    task: string,
  ) => {
    if (!task) return true;
    return (product.tasks ?? []).includes(task);
  };

  const matchesIndustry = (
    product: (typeof products)[number],
    industry: string,
  ) => {
    if (!industry) return true;
    return (product.industries ?? []).includes(industry);
  };

  // OBSZARY
  // Dostępne sekcje i podobszary zależą od wybranej czynności i branży.

  const applicationGroups = useMemo(() => {
    const groups = new Map<string, Set<string>>();

    products
      .filter(
        (product) =>
          matchesTask(product, selectedTask) &&
          matchesIndustry(product, selectedIndustry),
      )
      .forEach((product) => {
        Object.entries(product.areas ?? {}).forEach(
          ([application, areas]) => {
            if (!application) return;

            if (!groups.has(application)) {
              groups.set(application, new Set());
            }

            areas.forEach((area) => {
              if (area) {
                groups.get(application)!.add(area);
              }
            });
          },
        );
      });

    return Array.from(groups.entries()).map(([application, areas]) => ({
      application,
      areas: Array.from(areas).sort((a, b) =>
        a.localeCompare(b, 'pl'),
      ),
    }));
  }, [selectedTask, selectedIndustry]);

  const areaOptions = useMemo<FilterOption[]>(() => {
    const options: FilterOption[] = [];
    options.push({
    value: '',
    label: 'Wszystkie obszary',
  });

    applicationGroups.forEach((group) => {
      options.push({
        value: JSON.stringify([group.application, '']),
        label: group.application,
        bold: true,
      });

      group.areas.forEach((area) => {
        options.push({
          value: JSON.stringify([group.application, area]),
          label: area,
          level: 1,
        });
      });
    });

    return options;
  }, [applicationGroups]);

  // CZYNNOŚCI
  // Dostępne czynności zależą od wybranego obszaru i branży.

  const tasks = useMemo(() => {
    return Array.from(
      new Set(
        products
          .filter(
            (product) =>
              matchesArea(product, selectedApplication, selectedArea) &&
              matchesIndustry(product, selectedIndustry),
          )
          .flatMap((product) => product.tasks ?? []),
      ),
    )
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, 'pl'));
  }, [selectedApplication, selectedArea, selectedIndustry]);

  const taskOptions = useMemo<FilterOption[]>(
  () => [
    {
      value: '',
      label: 'Wszystkie czynności',
    },
    ...tasks.map((task) => ({
      value: task,
      label: task,
    })),
  ],
  [tasks],
);

  // BRANŻE
  // Dostępne branże zależą od wybranego obszaru i czynności.

  const industries = useMemo(() => {
    return Array.from(
      new Set(
        products
          .filter(
            (product) =>
              matchesArea(product, selectedApplication, selectedArea) &&
              matchesTask(product, selectedTask),
          )
          .flatMap((product) => product.industries ?? []),
      ),
    )
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, 'pl'));
  }, [selectedApplication, selectedArea, selectedTask]);

  const industryOptions = useMemo<FilterOption[]>(
  () => [
    {
      value: '',
      label: 'Wszystkie branże',
    },
    ...industries.map((industry) => ({
      value: industry,
      label: industry,
    })),
  ],
  [industries],
);

  // FILTROWANIE PRODUKTÓW

  const filtered = useMemo(
    () =>
      products.filter(
        (product) =>
          matchesArea(product, selectedApplication, selectedArea) &&
          matchesTask(product, selectedTask) &&
          matchesIndustry(product, selectedIndustry),
      ),
    [
      selectedApplication,
      selectedArea,
      selectedTask,
      selectedIndustry,
    ],
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedApplication,
    selectedArea,
    selectedTask,
    selectedIndustry,
  ]);

  const hasFilters = Boolean(
    selectedApplication ||
      selectedArea ||
      selectedTask ||
      selectedIndustry,
  );

  const reset = () => {
    setSelectedApplication('');
    setSelectedArea('');
    setSelectedTask('');
    setSelectedIndustry('');
    setCurrentPage(1);
    setOpenFilter(null);
  };

  const selectArea = (value: string) => {
    if (!value) {
      setSelectedApplication('');
      setSelectedArea('');
      return;
    }

    const [application, area] = JSON.parse(value) as [string, string];

    setSelectedApplication(application);
    setSelectedArea(area);
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

  const updateFrequency = (productName: string, value: string) => {
    setFrequencyValues((prev) => ({
      ...prev,
      [productName]: value,
    }));
  };

  const clearSelection = () => setSelected(new Set());

  const toggleAccessory = (id: string) => {
    setSelectedAccessoryIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const clearAccessorySelection = () =>
    setSelectedAccessoryIds(new Set());

  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 4) pages.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 3) pages.push('...');

    pages.push(totalPages);
    return pages;
  };

  const selectedProducts = products.filter((p) => selected.has(p.name));

  const selectedAccessories = accessories.filter((a) =>
    selectedAccessoryIds.has(a.id),
  );

  const totalSelected = selected.size + selectedAccessoryIds.size;

  const selectedAreaValue = JSON.stringify([
    selectedApplication,
    selectedArea,
  ]);

  const selectedAreaLabel = selectedArea
    ? `${selectedApplication} · ${selectedArea}`
    : selectedApplication;

  if (view === 'plan') {
    return (
      <HygienePlan
        selected={selectedProducts}
        selectedAccessories={selectedAccessories}
        allAccessories={accessories}
        frequencyValues={frequencyValues}
        onFrequencyChange={updateFrequency}
        onToggleAccessory={toggleAccessory}
        onRemoveProduct={removeProduct}
        onBack={() => setView('config')}
      />
    );
  }

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
                Dobierz produkty czyszczące według stref i rodzaju czynności
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setView('plan');
              }}
              disabled={totalSelected === 0}
              className="group flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition hover:border-slate-300 hover:bg-white disabled:cursor-default disabled:opacity-60"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                {totalSelected}
              </span>

              <span className="hidden text-sm font-medium text-slate-700 sm:inline">
                {getProductLabel(totalSelected)} w planie
              </span>

              {totalSelected > 0 && (
                <FileText className="h-4 w-4 text-slate-500 transition group-hover:text-primary" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-5 flex items-center justify-between">
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

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                <Layers className="h-3.5 w-3.5" />
                Obszar
              </label>

              <FilterDropdown
                label="Obszar"
                placeholder="Wszystkie obszary"
                selectedLabel={selectedAreaLabel}
                selectedValue={selectedApplication ? selectedAreaValue : ''}
                options={areaOptions}
                isOpen={openFilter === 'area'}
                onToggle={() =>
                  setOpenFilter(openFilter === 'area' ? null : 'area')
                }
                onSelect={selectArea}
                onClose={() => setOpenFilter(null)}
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                <FlaskConical className="h-3.5 w-3.5" />
                Czynność
              </label>

              <FilterDropdown
                label="Czynność"
                placeholder="Wszystkie czynności"
                selectedLabel={selectedTask}
                selectedValue={selectedTask}
                options={taskOptions}
                isOpen={openFilter === 'task'}
                onToggle={() =>
                  setOpenFilter(openFilter === 'task' ? null : 'task')
                }
                onSelect={setSelectedTask}
                onClose={() => setOpenFilter(null)}
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                <Layers className="h-3.5 w-3.5" />
                Branża
              </label>

              <FilterDropdown
                label="Branża"
                placeholder="Wszystkie branże"
                selectedLabel={selectedIndustry}
                selectedValue={selectedIndustry}
                options={industryOptions}
                isOpen={openFilter === 'industry'}
                onToggle={() =>
                  setOpenFilter(openFilter === 'industry' ? null : 'industry')
                }
                onSelect={setSelectedIndustry}
                onClose={() => setOpenFilter(null)}
              />
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium text-slate-600">
              Rekomendowane produkty
            </h2>

            <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {filtered.length} {getProductLabel(filtered.length)}
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
            <div className="space-y-2">
              {paginatedProducts.map((p) => {
                const isSelected = selected.has(p.name);

                return (
                  <article
                    key={p.name}
                    className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-slate-300 hover:shadow-md sm:p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-16 w-16 shrink-0 rounded-lg object-contain sm:h-20 sm:w-20"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold text-primary">
                            {p.name}
                          </h3>

                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${phColor(p.ph)}`}
                          >
                            pH {p.phLabel}
                          </span>

                          {p.usageModes?.includes('manual') && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                              <Hand className="h-3.5 w-3.5" />
                              Mycie ręczne
                            </span>
                          )}

                          {p.usageModes?.includes('machine') && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                              <Cog className="h-3.5 w-3.5" />
                              Mycie maszynowe
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-500">
                          {Object.entries(p.areas ?? {}).map(
                            ([zone, areas]) => (
                              <span key={zone}>
                                {zone}
                                {areas.length > 0 && ` · ${areas.join(', ')}`}
                              </span>
                            ),
                          )}

                          {(p.type || p.dosage) && (
                            <span>
                              · {[p.type, p.dosage].filter(Boolean).join(' · ')}
                            </span>
                          )}

                          {p.tasks?.length > 0 && (
                            <span>· {p.tasks.join(', ')}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center sm:pl-2">
                        {isSelected ? (
                          <button
                            type="button"
                            onClick={() => removeProduct(p.name)}
                            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-100 sm:w-auto"
                          >
                            <Check className="h-3.5 w-3.5" />
                            W planie
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addProduct(p.name)}
                            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-medium text-white transition hover:bg-primary-dark sm:w-auto"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            Dodaj
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
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
              onClick={() => setCurrentPage((page) => page + 1)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm disabled:opacity-40"
            >
              Następna →
            </button>
          </div>
        )}
      </main>

      {totalSelected > 0 && (
        <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                {totalSelected}
              </span>

              <span className="text-sm font-medium text-slate-700">
                {selected.size}{' '}
                {selected.size === 1
                  ? 'środek'
                  : selected.size % 10 >= 2 &&
                      selected.size % 10 <= 4 &&
                      (selected.size % 100 < 12 ||
                        selected.size % 100 > 14)
                    ? 'środki'
                    : 'środków'}

                {selectedAccessoryIds.size > 0 && (
                  <>
                    {' · '}
                    {selectedAccessoryIds.size}{' '}
                    {selectedAccessoryIds.size === 1
                      ? 'akcesorium'
                      : selectedAccessoryIds.size % 10 >= 2 &&
                          selectedAccessoryIds.size % 10 <= 4 &&
                          (selectedAccessoryIds.size % 100 < 12 ||
                            selectedAccessoryIds.size % 100 > 14)
                        ? 'akcesoria'
                        : 'akcesoriów'}
                  </>
                )}
              </span>

              <button
                type="button"
                onClick={() => {
                  clearSelection();
                  clearAccessorySelection();
                }}
                className="hidden items-center gap-1 text-xs text-slate-500 transition hover:text-slate-700 sm:inline-flex"
              >
                <X className="h-3.5 w-3.5" />
                Wyczyść
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setView('plan');
              }}
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
