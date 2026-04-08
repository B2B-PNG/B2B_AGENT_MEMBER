import { useToastStore } from "@/zustand/useToastStore";

export const useCopy = () => {
    const { showToast } = useToastStore();
    const handleCopy = (value: string | number) => {
        try {
            navigator.clipboard.writeText(String(value));
            showToast("success", "Copied!");
        } catch (err) {
            showToast("error", "Copy failed");
        }
    };
    return { handleCopy };
};

export const shortId = (value?: string | null) => {
    if (!value) return "--";

    if (value.length <= 6) return value;

    return `${value.slice(0, 3)}...${value.slice(-3)}`;
};

