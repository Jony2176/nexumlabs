// services/googleSheetApi.ts

import toast from 'react-hot-toast';

const SPREADSHEET_ID = '1SgftB8eJX2arPeY8ys1H2fnd52Mp2M3ancbM8Jwn7hQ';
const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

/**
 * Transforms Google Sheets API data (array of arrays) into an array of objects.
 * Assumes the first row is the header row. Also converts headers to snake_case.
 * @param values The array of arrays from the API.
 * @returns An array of objects.
 */
function sheetValuesToObjects<T>(values: any[][]): T[] {
    if (!values || values.length < 2) {
        return [];
    }
    const [header, ...rows] = values;
    
    const toSnakeCase = (str: string) => {
        if (!str) return '';
        return str
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_]/g, '');
    };

    const keys = header.map(h => toSnakeCase(h));

    return rows.map(row => {
        const obj: any = {};
        keys.forEach((key, index) => {
            let value = row[index];
            if (value === undefined || value === null) {
                obj[key] = null;
                return;
            }

            const lowerValue = String(value).toLowerCase();
            if (lowerValue === 'true') {
                obj[key] = true;
            } else if (lowerValue === 'false') {
                obj[key] = false;
            } else if (value.trim() !== '' && !isNaN(Number(value.replace(',', '.')))) {
                const num = Number(value.replace(',', '.'));
                obj[key] = num;
            } else {
                obj[key] = value;
            }
        });
        return obj as T;
    });
}

/**
 * Fetches data from a specific sheet.
 * @param sheetName The name of the sheet (tab) to fetch.
 * @returns A promise that resolves to an array of objects.
 */
export async function fetchSheetData<T>(sheetName: string): Promise<T[]> {
    if (!API_KEY) {
        console.error("Google Sheets API key is not configured.");
        toast.error("La clave de API de Google no está configurada.");
        throw new Error("API key missing.");
    }
    
    const url = `${BASE_URL}/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Google Sheets API Error:', JSON.stringify(errorData, null, 2));
            throw new Error(`Failed to fetch sheet "${sheetName}". Status: ${response.status}`);
        }
        const data = await response.json();
        return sheetValuesToObjects<T>(data.values);
    } catch (error) {
        console.error(`Error fetching data from Google Sheet "${sheetName}":`, error);
        throw error;
    }
}