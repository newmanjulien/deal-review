import { useState } from "react";

type UploadSectionProps = {
  sectionId: string;
  uploadLabel?: string;
  uploadDescription?: string;
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
};

export function UploadSection({
  sectionId,
  uploadLabel = "Upload files",
  uploadDescription,
  acceptedFileTypes,
  allowMultipleFiles = true,
}: UploadSectionProps) {
  const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);
  const fileInputId = `${sectionId}-file-input`;
  const hasSelectedFiles = selectedFileNames.length > 0;

  return (
    <section className="rounded-md border border-zinc-100 bg-white px-3 py-3">
      <div className="space-y-1">
        <label
          htmlFor={fileInputId}
          className="text-xs font-medium tracking-wide text-zinc-900"
        >
          {uploadLabel}
        </label>
        {uploadDescription ? (
          <p className="text-xs leading-relaxed tracking-wide text-zinc-500">
            {uploadDescription}
          </p>
        ) : null}
      </div>
      <input
        id={fileInputId}
        type="file"
        accept={acceptedFileTypes}
        multiple={allowMultipleFiles}
        onChange={(event) =>
          setSelectedFileNames(
            Array.from(event.target.files ?? []).map((file) => file.name),
          )
        }
        className="mt-3 block w-full text-xs leading-relaxed tracking-wide text-zinc-600 file:mr-3 file:rounded-md file:border file:border-zinc-200 file:bg-white file:px-2.5 file:py-1.5 file:text-xs file:font-medium file:text-zinc-700 hover:file:bg-zinc-50"
      />
      {hasSelectedFiles ? (
        <p className="mt-2 text-xs leading-relaxed tracking-wide text-zinc-500">
          Selected: {selectedFileNames.join(", ")}
        </p>
      ) : null}
    </section>
  );
}
