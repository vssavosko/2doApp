import React from 'react';
import PropTypes from 'prop-types';

import { Toast } from '../Toast/Toast';
import { Intent } from '@blueprintjs/core';

import './DeleteButton.scss';

export const DeleteButton = ({ taskList, removeAllCompleted, theme }) => {
    let countCompletedTasks = taskList.filter(task => task.completed);

    return (
        <button
            className={
                countCompletedTasks.length >= 2
                    ? `button DeleteButton DeleteButton_theme_${theme} DeleteButton_active-${theme}`
                    : `button DeleteButton DeleteButton_theme_${theme}`
            }
            aria-label='All delete button'
            onClick={() => {
                removeAllCompleted();
                Toast.show({ intent: Intent.DANGER, message: 'Задачи удалены!', timeout: 2000 });
            }}
        >
            <i className="fas fa-dumpster icon-trash" />
        </button>
    );
};

DeleteButton.propTypes = {
    taskList: PropTypes.array.isRequired,
    removeAllCompleted: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
};
