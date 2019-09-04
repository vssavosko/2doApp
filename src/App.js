import React, { Component } from 'react';

import './App.scss';
import './_fonts.scss';

import { AddBar } from './components/AddBar/AddBar';
import { FilterBar } from './components/FilterBar/FilterBar';
import { TaskList } from './components/TaskList/TaskList';
import { SwitchThemeButton } from './components/SwitchThemeButton/SwitchThemeButton';
import { DeleteButton } from './components/DeleteButton/DeleteButton';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            theme: 'light'
        };
        this.addTask = this.addTask.bind(this);
        this.filterTasks = this.filterTasks.bind(this);
        this.toggleTask = this.toggleTask.bind(this);
        this.changeTask = this.changeTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.themeChange = this.themeChange.bind(this);
        this.removeAllCompleted = this.removeAllCompleted.bind(this);
    }

    componentDidMount() {
        let body = document.querySelector('.body');
        let taskList = document.querySelector('.TaskList');
        let taskListUl = document.querySelector('.TaskList__ul');

        if (window.localStorage.getItem('userTasks') && window.localStorage.getItem('userTheme')) {
            let userData = JSON.parse(localStorage.getItem('userTasks'));
            let userTheme = localStorage.getItem('userTheme');

            this.setState({
                tasks: userData,
                theme: userTheme
            });
        } else {
            window.localStorage.setItem('userTasks', JSON.stringify([]));
            window.localStorage.setItem('userTheme', 'light');
        }

        if (taskListUl) {
            taskList.style.height = window.getComputedStyle(taskListUl, null).height;
        } else {
            taskList.style.height = 61 + 'px';
        }

        switch (this.state.theme) {
            case 'light':
                body.classList.remove('body_theme_dark');
                body.classList.add('body_theme_light');

                break;
            case 'dark':
                body.classList.remove('body_theme_light');
                body.classList.add('body_theme_dark');

                break;
            default:
                break;
        }
    }

    componentDidUpdate() {
        let body = document.querySelector('.body');
        let taskList = document.querySelector('.TaskList');
        let taskListUl = document.querySelector('.TaskList__ul');

        if (taskListUl) {
            taskList.style.height = window.getComputedStyle(taskListUl, null).height;
        } else {
            taskList.style.height = 61 + 'px';
        }

        switch (this.state.theme) {
            case 'light':
                body.classList.remove('body_theme_dark');
                body.classList.add('body_theme_light');

                break;
            case 'dark':
                body.classList.remove('body_theme_light');
                body.classList.add('body_theme_dark');

                break;
            default:
                break;
        }
    }

    addTask(newTask) {
        this.setState({
            tasks: [...this.state.tasks, newTask]
        });

        window.localStorage.setItem('userTasks', JSON.stringify([...this.state.tasks, newTask]));
    }

    filterTasks(filter) {
        let userData = JSON.parse(localStorage.getItem('userTasks'));

        switch (filter) {
            case 'all':
                this.setState({
                    tasks: userData
                });

                break;
            case 'active':
                this.setState({
                    tasks: userData.filter(t => !t.completed)
                });

                break;
            case 'completed':
                this.setState({
                    tasks: userData.filter(t => t.completed)
                });

                break;
            default:
                break;
        }
    }

    toggleTask(taskIndex) {
        let updatedTasks = this.state.tasks.map((t, i) => {
            if (i === taskIndex) {
                return {
                    ...t,
                    completed: !t.completed
                };
            } else {
                return t;
            }
        });

        this.setState({
            tasks: updatedTasks
        });

        window.localStorage.setItem('userTasks', JSON.stringify(updatedTasks));
    }

    changeTask(newValue, taskIndex) {
        let updatedTasks = this.state.tasks.map((t, i) => {
            if (i === taskIndex) {
                return {
                    ...t,
                    taskName: newValue
                };
            } else {
                return t;
            }
        });

        this.setState({
            tasks: updatedTasks
        });

        window.localStorage.setItem('userTasks', JSON.stringify(updatedTasks));
    }

    removeTask(taskIndex) {
        let { theme } = this.state;
        let taskToDelete = document.querySelectorAll('.Task')[taskIndex];

        taskToDelete.classList.add('Task_isOut');
        taskToDelete.children[0].classList.remove(`Task__checkbox_isChecked-${theme}`);

        setTimeout(() => {
            let activeTasks = this.state.tasks.filter((t, i) => i !== taskIndex);

            this.setState({
                tasks: activeTasks
            });

            taskToDelete.classList.remove('Task_isOut');
            window.localStorage.setItem('userTasks', JSON.stringify(activeTasks));
        }, 300);
    }

    themeChange(userTheme) {
        this.setState({
            theme: userTheme
        });

        window.localStorage.setItem('userTheme', userTheme);
    }

    removeAllCompleted() {
        let { theme } = this.state;
        let tasksToDelete = document.querySelectorAll('.Task');
        let activeTasks = this.state.tasks.filter((t, i) => {
            if (t.completed) {
                tasksToDelete[i].classList.add('Task_isOut');
                tasksToDelete[i].children[0].classList.remove(`Task__checkbox_isChecked-${theme}`);
            }

            return !t.completed;
        });

        setTimeout(() => {
            this.setState({
                tasks: activeTasks
            });

            for (let task of tasksToDelete) {
                task.classList.remove('Task_isOut');
            }

            window.localStorage.setItem('userTasks', JSON.stringify(activeTasks));
        }, 300);
    }

    render() {
        let { theme } = this.state;

        return (
            <div className="App">
                <div className="wrapper">
                    <div className={`separator App__header-card App__header-card_theme_${theme}`}>
                        <AddBar addTask={this.addTask} theme={theme} />
                        <FilterBar filterTasks={this.filterTasks} theme={theme} />
                    </div>
                    <div className={`separator App__tasks-card App__tasks-card_theme_${theme}`}>
                        <TaskList
                            taskList={this.state.tasks}
                            toggleTask={this.toggleTask}
                            changeTask={this.changeTask}
                            removeTask={this.removeTask}
                            theme={theme}
                        />
                    </div>
                    <SwitchThemeButton themeChange={this.themeChange} theme={theme} />
                    <DeleteButton taskList={this.state.tasks} removeAllCompleted={this.removeAllCompleted} theme={theme} />
                </div>
            </div>
        );
    }
}
