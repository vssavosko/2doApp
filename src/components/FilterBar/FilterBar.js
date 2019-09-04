import React from 'react';
import PropTypes from 'prop-types';

import './FilterBar.scss';

export const FilterBar = ({ filterTasks, theme }) => {
    const handleClick = event => {
        let filterBarButtons = document.querySelectorAll('.FilterBar__button');
        let selectedFilter = event.target.dataset.filter;

        for (let button of filterBarButtons) {
            button.classList.remove('FilterBar__button_isActive-light', 'FilterBar__button_isActive-dark');
        }

        event.target.classList.add(`FilterBar__button_isActive-${theme}`);

        filterTasks(selectedFilter);
    };

    return (
        <div className="FilterBar">
            <button
                className={`FilterBar__button FilterBar__button_theme_${theme} FilterBar__button_isActive-${theme}`}
                data-filter="all"
                onClick={handleClick}
            >
                Все
            </button>
            <button className={`FilterBar__button FilterBar__button_theme_${theme}`} data-filter="active" onClick={handleClick}>
                Активные
            </button>
            <button className={`FilterBar__button FilterBar__button_theme_${theme}`} data-filter="completed" onClick={handleClick}>
                Выполненные
            </button>
        </div>
    );
};

FilterBar.propTypes = {
    filterTasks: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
};
