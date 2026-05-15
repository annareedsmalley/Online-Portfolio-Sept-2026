import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface Ctx {
  title: string | null;
  setTitle: (t: string | null) => void;
}

const CaseStudyTitleContext = createContext<Ctx>({ title: null, setTitle: () => {} });

export const CaseStudyTitleProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState<string | null>(null);
  return (
    <CaseStudyTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </CaseStudyTitleContext.Provider>
  );
};

export const useCaseStudyTitle = () => useContext(CaseStudyTitleContext).title;

export const useSetCaseStudyTitle = (title: string) => {
  const { setTitle } = useContext(CaseStudyTitleContext);
  useEffect(() => {
    setTitle(title);
    return () => setTitle(null);
  }, [title, setTitle]);
};
