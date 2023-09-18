   export const DivisaFormater = ({value, currency = 'COP', format = 'es-CO', minFractionDigits = 0, thousandsSeparator = '.'}) => {
    const formatter = new Intl.NumberFormat(format, {
      style: 'currency',
      currency,
      minimumFractionDigits: minFractionDigits,
      useGrouping: true,
    });
    
    const formattedValue = formatter.format(value);
    return formattedValue.replace(',', thousandsSeparator);
   }