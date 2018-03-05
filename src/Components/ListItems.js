import React, { Component } from 'react';

export default class ListItems extends Component {
    constructor(props, context) {
        super(props, context);

        this.addItem = this.addItem.bind(this);
    }

    addItem(item) {
        const itemClass = "list-item " + (item.completed ? "completed" : "");

        return <li className="list-item__wrapper" key={item.key}>
            <div className={itemClass}
                onClick={() => this.complete(item.key)}
                >{item.text}
            </div>
            <div className="list-item__actions">
                <a href="#" className="btn list-item__edit" onClick={(e) => this.edit(item.key, e)}>Edit</a>
                <a href="#" className="btn list-item__delete" onClick={(e) => this.delete(item.key, e)}>Delete</a>
            </div>
        </li>
    }

    delete(key, e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.delete(key)
    }

    edit(key, e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.edit(key)
    }

    complete(key) {
        this.props.complete(key)
    }

    render() {
        const items = this.props.items;
        const listItems = items.map(this.addItem);

        return (
            <ul className="todoList">
                {listItems}
            </ul>
        )
    }
}