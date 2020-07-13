
export function searchBy(text: string, arr: any[]): any[] {
    return arr.filter(arrObj => {
        const term = text.toLowerCase();
        return arrObj.name.toLowerCase().includes(term);
    });
}
