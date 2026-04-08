import { refs } from './refs';

export function showLoaderFeedback() {
  return refs.loaderFeedback.classList.add('loader');
}

export function hideLoaderFeedback() {
  return refs.loaderFeedback.classList.remove('loader');
}
