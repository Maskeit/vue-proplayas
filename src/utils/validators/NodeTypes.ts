const cookedTypes = ( rowType: string )=> [
    {row: 'sociedad_civil', cook: 'SOCIEDAD CIVIL'},
    {row: 'cientifico', cook: 'CIENTIFICO'},
    {row:'empresarial', cook: 'EMPRESARIAL'},
    {row:'funcion_publica', cook: 'FUNCION PUBLICA'},
    {row:'individual', cook: 'INDIVIDUAL'},
]

export const nodeType = (rowType: string) => {
    const type = cookedTypes(rowType).find((type) => type.row === rowType);
    if (type) {
        return type.cook;
    } else {
        return rowType;
    }
}
