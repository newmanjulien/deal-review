import type {
  DataDisplaySectionInstance,
  DataDisplayTableRow,
} from "@/components/data-display/data-display-types";

export function assertValidDataDisplaySections<
  Row extends DataDisplayTableRow,
>(
  mode: "page" | "detail",
  sections: DataDisplaySectionInstance<Row>[],
) {
  if (sections.length === 0) {
    throw new Error("DataDisplay requires at least one section instance.");
  }

  if (mode === "detail" && sections.some((section) => section.kind === "tiles")) {
    throw new Error("Detail mode does not allow tiles sections.");
  }
}
