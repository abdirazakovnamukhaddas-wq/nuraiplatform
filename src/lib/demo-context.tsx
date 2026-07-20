import { createContext, useContext, useState, type ReactNode } from "react";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  openDemo: () => void;
};

const DemoContext = createContext<Ctx | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <DemoContext.Provider value={{ open, setOpen, openDemo: () => setOpen(true) }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
