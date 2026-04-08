import { allLangs, useTranslate, type LanguageValue } from "@/locales";
import { AnimatePresence, motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const fagsMock: Record<string, string> = {
  en: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1ec-1f1e7.svg",
  vi: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1fb-1f1f3.svg",
};

const listLangs = [
  {
    label: "English",
    value: "en",
    icon: fagsMock.en,
  },
  {
    label: "Tiếng Việt",
    value: "vi",
    icon: fagsMock.vi,
  },
];

interface SelectLangsProps {
  handleEnter: () => void;
  handleLeave: () => void;
  open: boolean;
}

export const SelectLangs = ({ handleEnter, handleLeave, open }: SelectLangsProps) => {
  const { onChangeLang } = useTranslate();

  const [selectedLang, setSelectedLang] = useState({
    value: listLangs[0].value,
    label: listLangs[0].label,
    icon: listLangs[0].icon,
  });

  useEffect(() => {
    const currentLang = localStorage.getItem("i18nextLng") || allLangs[0].value;
    const selected = allLangs.find((lang) => lang.value === currentLang);
    if (selected) {
      setSelectedLang({
        value: selected.value,
        label: selected.label,
        icon: fagsMock[selected.value] || "",
      });
    }
  }, []);

  const handleLanguages = (newLang: string) => {
    const selected = allLangs.find((lang) => lang.value === newLang);
    if (selected) {
      setSelectedLang({
        value: selected.value,
        label: selected.label,
        icon: fagsMock[selected.value] || "",
      });
      onChangeLang(newLang as LanguageValue);
      localStorage.setItem("i18nextLng", newLang);
    }
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative cursor-pointer"
    >
      <button
        className={twMerge(
          "flex w-10 h-10 justify-center items-center rounded-full transition-all duration-200",
          "hover:bg-gray-100 text-gray-600 cursor-pointer",
          open && "bg-gray-100 text-[#4a6fa5]"
        )}
      >
        <Languages size={20} strokeWidth={1.75} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-[100%] w-44 pt-2"
          >

            <div className="bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden z-50 p-1.5 shadow-2xl border border-gray-100">
              <div className="px-3 py-2 mb-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Ngôn ngữ</span>
              </div>

              {listLangs.map((lang) => {
                const isSelected = selectedLang.value === lang.value;
                return (
                  <div
                    key={lang.value}
                    onClick={() => {
                      handleLanguages(lang.value);
                      handleLeave();
                    }}
                    className={twMerge(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group",
                      isSelected
                        ? "bg-blue-50 text-[#4a6fa5]"
                        : "hover:bg-gray-50 text-gray-700"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={lang.icon}
                        alt={lang.label}
                        className="w-5 h-5 rounded-full object-cover shadow-sm border border-gray-100"
                      />
                      <p className={twMerge("text-sm transition-colors", isSelected ? "font-bold" : "font-medium")}>
                        {lang.label}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="w-1.5 h-1.5 bg-[#4a6fa5] rounded-full shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                    )}
                  </div>
                );
              })}

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};