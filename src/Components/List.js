import React, { Component } from 'react';
import ListItems from './ListItems';

export default class List extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            items: []
        }

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.completeItem = this.completeItem.bind(this);
        this.getIndexByKey = this.getIndexByKey.bind(this);
    }

    getIndexByKey(key) {
        return this.state.items.findIndex((item) => {
            return (item.key === key);
        })
    }

    addItem(e) {
        let itemArr = this.state.items;

        if (this._inputElement.value !== "") {
            const oldElIndex = this.getIndexByKey(this._inputElement.key);
            const item = {
                text: this._inputElement.value,
                key: oldElIndex > -1 ? itemArr[oldElIndex].key : Date.now(),
                completed: oldElIndex > -1 ? itemArr[oldElIndex].completed : false
            }

            if (oldElIndex > -1) {
                itemArr[oldElIndex] = item;
            } else {
                itemArr.unshift(item);
            }

            this.setState({
                items: itemArr
            });

            this._inputElement.value = "";
            this._inputElement.key = "";
        }

        e.preventDefault();
    }

    deleteItem(key) {
        const filtered = this.state.items.filter((item) => {
            return (item.key !== key);
        })

        this.setState({
            items: filtered
        });
    }

    editItem(key) {
        const index = this.getIndexByKey(key)
        this._inputElement.focus();
        this._inputElement.value = this.state.items[index].text;
        this._inputElement.key = key;
    }

    completeItem(key) {
        const index = this.getIndexByKey(key);

        let items = this.state.items;
        items[index].completed = !items[index].completed;

        this.setState({
            items: items
        });
    }



    render() {
        return (
            <div className="list">
                <section>
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a}
                            type="text"
                            placeholder="Add task"
                            key=""
                        />
                    </form>
                </section>

                <ListItems
                    items={this.state.items}
                    delete={this.deleteItem}
                    edit={this.editItem}
                    complete={this.completeItem} />
            </div>
        )
    }
}