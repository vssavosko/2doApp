import React from 'react';
import PropTypes from 'prop-types';

import './SwitchThemeButton.scss';

export const SwitchThemeButton = ({ themeChange, theme }) => {
    const switchTumbler = () => {
        let tumbler = document.querySelector('.SwitchThemeButton__tumbler');

        tumbler.classList.toggle('SwitchThemeButton__tumbler_switch');

        if (tumbler.classList.contains('SwitchThemeButton__tumbler_theme_light')) {
            themeChange('dark');
        } else {
            themeChange('light');
        }
    };

    return (
        <button className={`button SwitchThemeButton SwitchThemeButton_theme_${theme}`} aria-label='Switch button' onClick={switchTumbler}>
            <span className="SwitchThemeButton__light-icon">
                <i className="fas fa-sun"></i>
            </span>
            <span
                className={
                    theme === 'light'
                        ? 'SwitchThemeButton__tumbler SwitchThemeButton__tumbler_theme_light'
                        : 'SwitchThemeButton__tumbler SwitchThemeButton__tumbler_theme_dark SwitchThemeButton__tumbler_switch'
                }
            />
            <span className="SwitchThemeButton__dark-icon">
                <i className="fas fa-moon"></i>
            </span>
        </button>
    );
};

SwitchThemeButton.propTypes = {
    themeChange: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
};
