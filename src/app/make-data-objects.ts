import { groupBy } from "rxjs";
var test = [
    {
        position: 'Developer',
        salary: 50000,
        min: 50000,
        mid: 80000,
        max: 100000,
    },
    {
        position: 'Developer',
        salary: 70000,
        min: 50000,
        mid: 80000,
        max: 100000
    },
    {
        position: 'Manager',
        salary: 85000,
        min: 60000,
        mid: 100000,
        max: 125000
    },
    {
        position: 'Manager',
        salary: 80000,
        min: 60000,
        mid: 100000,
        max: 125000
    },
    {
        position: 'Tester',
        salary: 85000,
        min: 55000,
        mid: 85000,
        max: 105000
    },
    {
        position: 'Developer',
        salary: 70000,
        min: 50000,
        mid: 80000,
        max: 100000
    },
    {
        position: 'Solution Lead',
        salary: 95000,
        min: 45000,
        mid: 75000,
        max: 95000
    },
    {
        position: 'UX designer',
        salary: 85000,
        min: 40000,
        mid: 60000,
        max: 80000
    }];

export function makeDataObjects() {
    const data = [];

    const cols =  ["Below Min", "Min", "Min to Mid", "Mid", "Mid to Max", "Max", "Above Max"];

    var temp = test.reduce((acc, { position, salary }) => {
        const yearArray = (acc[position] ??= []);
      
        let cIndex = yearArray.findIndex(o => o.salary === salary);
        if (cIndex === -1) {
          cIndex = yearArray.push({ salary, count: 1 }) - 1;
        } else {
            yearArray[cIndex].count += 1;
        }

        return acc;
      }, {});

    for (let x = 0; x < cols.length; x++) {
        for (let y = 0; y < test.length; y++) {
            var xaxis = cols[x];
            var item = test[y];

            var bucket = '';
            var salary = item.salary;
            var count = temp[item.position].find(obj => {
                                return obj.salary === salary
                            }).count;

            switch (true) {
                case salary < item.min:
                    bucket = 'Below Min';
                    break;
                case salary === item.min:
                    bucket = 'Min';
                    break;
                case salary > item.min && salary < item.mid:
                    bucket = 'Min to Mid';
                    break;
                case salary === item.mid:
                    bucket = 'Mid';
                    break;
                case salary > item.mid && salary < item.max:
                    bucket = 'Mid to Max';
                    break;
                case salary === item.max:
                    bucket = 'Max';
                    break;
                default:
                    bucket = 'Above Max';
            }

            data.push([
                xaxis, 
                item.position,
                xaxis === bucket ? count : 0
            ]);

        }
    }

    return data;
}
