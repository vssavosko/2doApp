import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Toast } from '../Toast/Toast';
import { Intent } from '@blueprintjs/core';

import './AddBar.scss';

export class AddBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleFocus = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.addTaskInput = React.createRef();
    }

    handleFocus() {
        let addInput = document.querySelector('.AddBar__input');
        let addButton = document.querySelector('.AddBar__add-button');

        if (this.props.theme === 'light') {
            addInput.classList.add('AddBar__input_color_blue');
            addButton.classList.add('AddBar__add-button_color_white');
        } else {
            addInput.classList.add('AddBar__input_color_night-blue');
            addButton.classList.add('AddBar__add-button_color_night-blue');
        }
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleKeyDown(e) {
        switch (e.key) {
            case 'Enter':
                this.handleClick();

                break;
            default:
                break;
        }
    }

    handleBlur() {
        let addInput = document.querySelector('.AddBar__input');
        let addButton = document.querySelector('.AddBar__add-button');

        addInput.classList.remove('AddBar__input_color_blue', 'AddBar__input_color_night-blue');
        addButton.classList.remove('AddBar__add-button_color_white', 'AddBar__add-button_color_night-blue');
    }

    handleClick() {
        if (this.state.value !== '') {
            this.props.addTask({
                taskName: this.state.value,
                completed: false
            });

            this.setState({
                value: ''
            });

            this.addTaskInput.current.focus();
            Toast.show({ intent: Intent.SUCCESS, message: 'Задача добавлена!', timeout: 2000 });
        }
    }

    render() {
        let { theme } = this.props;
        let date = new Date();
        let options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        };
        let formattedDate = date.toLocaleString('ru', options);

        return (
            <div className="AddBar">
                <div className="date">
                    <span className={`date__days date__days_theme_${theme}`}>{formattedDate}</span>
                </div>
                <input
                    type="text"
                    className={`input AddBar__input AddBar__input_theme_${theme}`}
                    onFocus={this.handleFocus}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    onBlur={this.handleBlur}
                    value={this.state.value}
                    ref={this.addTaskInput}
                    aria-label="Add input"
                    spellCheck="false"
                    placeholder="Введите новую задачу"
                />
                <button
                    className={`button AddBar__add-button AddBar__add-button_theme_${theme}`}
                    aria-label="Delete button"
                    onMouseDown={e => {
                        e.preventDefault();
                        e.stopPropagation();

                        return false;
                    }}
                    onClick={this.handleClick}
                >
                    <i className="fas fa-plus" />
                </button>
            </div>
        );
    }
}

AddBar.propTypes = {
    addTask: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
};
