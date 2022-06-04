export const normalizeDate = (date: any) => {
    const dateString = String(date);
  
    if (dateString.length > 8) {
      return {
        value: dateString,
        isError: true,
        textError: 'Número de telefone inválido',
      };
    } else {
      return {
        value: dateString.replace(
          /^([0-9]{2})([0-9]{2})([0-9]{4})$/,
          '$1/$2/$3'
        ),
        isError: false,
        textError: '',
      };
    }
  }