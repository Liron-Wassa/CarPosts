module.exports = {
    filterByCondition: function(car, query, key) {
        return query[key] === car[key];
    },
    filterByModelName: function(car, query, key) {
        return query[key] === car[key];
    
    },
    filterByModelType: function(car, query, key) {
        return query[key] === car[key];
    },
    filterByDate: function(car, query, key) {
        const dateInYear = JSON.parse(query[key]);
        if(dateInYear.from && !dateInYear.to) {
            return Number(car[key]) >= Number(dateInYear.from);
        }
        else if(dateInYear.to && !dateInYear.from) {
            return Number(car[key]) <= Number(dateInYear.to);
        }
        else {
            return Number(car[key]) >= Number(dateInYear.from) && Number(car[key]) <= Number(dateInYear.to);
        }
    },
    filterByPrice: function(car, query, key) {
        const price = JSON.parse(query[key]);
        if(price.from && !price.to) {
            return Number(car[key]) >= Number(price.from);
        }
        else if(price.to && !price.from) {
            return Number(car[key]) <= Number(price.to);
        }
        else {
            return Number(car[key]) >= Number(price.from) && Number(car[key]) <= Number(price.to);
        }
    }
};