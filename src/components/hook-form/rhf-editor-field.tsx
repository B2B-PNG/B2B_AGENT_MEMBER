import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill-new";

export const RHFEditorField = ({ name}: { name: string, label?: string }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                    className="bg-white min-h-50"
                />
            )}
        />
    );
};