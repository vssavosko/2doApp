import { Toaster, Position } from '@blueprintjs/core';

import './Toast.scss';

export const Toast = Toaster.create({
    className: 'Toast__toaster',
    position: window.innerWidth >= 1000 ? Position.TOP_RIGHT : Position.TOP
});
