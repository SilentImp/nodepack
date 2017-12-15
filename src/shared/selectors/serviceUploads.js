import { createSelector } from 'reselect';

export const getTopicsItems = state => state.uploads.topics.items;
export const isTopicsFetching = state => state.uploads.topics.isFetching;
export const isTopicsInitialized = state => state.uploads.topics.isInitialized;

export const getMainTopics = createSelector(getTopicsItems, topics =>
  topics.filter(topic => topic.depth === 1));

export const getPlatformTypesItems = state => state.uploads.platformTypes.items;
export const isPlatformTypesFetching = state => state.uploads.platformTypes.isFetching;
export const isPlatformTypesInitialized = state => state.uploads.platformTypes.isInitialized;
