export const convertLocaleToDBFormat = (locale = 'en') => {
  if (locale === 'ua') {
    return 'uk';
  } else if (locale === 'pt-br') {
    return 'pt';
  } else if (locale === 'cn') {
    return 'zh';
  } else if (locale === 'cz') {
    return 'cs';
  } else if (locale === 'se') {
    return 'sv';
  }

  return locale;
};

export default convertLocaleToDBFormat;
