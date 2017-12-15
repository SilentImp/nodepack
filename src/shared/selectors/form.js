import { formValueSelector } from 'redux-form';

export const getProductsSearhForm = formValueSelector('productsSearch');
export const getDidYouFindDescribeForm = formValueSelector('didYouFindDescribe');
export const getDidYouFindCommentForm = formValueSelector('didYouFindComment');
