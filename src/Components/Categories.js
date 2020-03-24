import React, { Component } from 'react';
// import PieChart from './PieChart';

class Categories extends Component {

    constructor() {
        super();
        this.state = {
            categories: []
        }
    }

    getState() {
        const trans = this.props.trans
        let result = [];
        trans.reduce(function (res, value) {
            if (!res[value.category]) {
                res[value.category] = { label: value.category, y: 0};
                result.push(res[value.category])
            }
            res[value.category].y += value.amount;
            return res;
        }, {});
        return result
    }

    render() {
        let cate = this.getState()
        return (
            <div>
                {console.log(cate)}
                <h2 className="CategoriesHeader">Catagories</h2>
                {cate.map(m => <h3>{m.label}: {m.y}</h3>)}
            </div>
        );
    }
}
export default Categories