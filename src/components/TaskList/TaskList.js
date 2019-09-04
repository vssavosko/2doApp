import React from 'react';
import PropTypes from 'prop-types';

import { Toast } from '../Toast/Toast';
import { Intent } from '@blueprintjs/core';

import './TaskList.scss';

export const TaskList = ({ taskList, toggleTask, changeTask, removeTask, theme }) => {
    const handleClickLi = e => {
        e.target.focus();
    };

    const handleClickInput = e => {
        e.target.classList.remove(`Task__input_border_isHide-${theme}`);
    };

    const handleKeyDown = e => {
        switch (e.key) {
            case 'Enter':
                e.target.blur();
                Toast.show({ intent: Intent.WARNING, message: 'Задача изменена!', timeout: 2000 });

                break;
            default:
                break;
        }
    };

    const handleBlur = e => {
        e.target.classList.add(`Task__input_border_isHide-${theme}`);
    };

    return (
        <div className="TaskList">
            {taskList.length > 0 ? (
                <ul className="TaskList__ul">
                    {taskList.map((item, index) => {
                        return (
                            <li
                                className="Task"
                                onClick={e => {
                                    handleClickLi(e);
                                }}
                                key={index}
                            >
                                <div
                                    className={
                                        item.completed
                                            ? `Task__checkbox Task__checkbox_theme_${theme} Task__checkbox_isChecked-${theme}`
                                            : `Task__checkbox Task__checkbox_theme_${theme}`
                                    }
                                    onClick={() => {
                                        toggleTask(index);
                                    }}
                                />
                                <input
                                    className={
                                        item.completed
                                            ? `Task__input Task__input_theme_${theme} Task__input_border_isHide-${theme} Task__input_isChecked-${theme}`
                                            : `Task__input Task__input_theme_${theme} Task__input_border_isHide-${theme}`
                                    }
                                    type="text"
                                    value={item.taskName}
                                    onClick={e => {
                                        handleClickInput(e);
                                    }}
                                    onChange={e => {
                                        changeTask(e.target.value, index);
                                    }}
                                    onKeyDown={e => {
                                        handleKeyDown(e);
                                    }}
                                    onBlur={e => {
                                        handleBlur(e);
                                    }}
                                    spellCheck="false"
                                />
                                <button
                                    className={`button TaskList__delete-button TaskList__delete-button_theme_${theme}`}
                                    onClick={e => {
                                        e.preventDefault();
                                        e.stopPropagation();

                                        removeTask(index);
                                        Toast.show({ intent: Intent.DANGER, message: 'Задача удалена!', timeout: 2000 });
                                    }}
                                >
                                    <i className="far fa-trash-alt icon-trash" />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className={`p TaskList__p TaskList__p_theme_${theme}`}>
                    Список задач пуст!
                    <br />
                    Добавь сюда что-нибудь
                    <span className="span TaskList__span" role="img" aria-label="Wink emoji">
                        &#128521;
                    </span>
                </p>
            )}
        </div>
    );
};

TaskList.propTypes = {
    taskList: PropTypes.array.isRequired,
    toggleTask: PropTypes.func.isRequired,
    changeTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
};
