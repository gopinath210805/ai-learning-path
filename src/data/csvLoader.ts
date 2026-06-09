import Papa from "papaparse";

export async function loadCSV(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load CSV: ${path}`);
  }

  const csvText = await response.text();

  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data;
}