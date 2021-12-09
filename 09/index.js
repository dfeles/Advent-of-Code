const map = require("./data")
    .split("\n")
    .map(line => line.trim().split("").map(num => parseInt(num)))

console.log(map)

const lowPoints = map.reduce((result, line, y) => {
    const lowOnX = line.reduce((indexes, point, x) => {
        const low = (x === 0 || line[x - 1] > point) &&
            (x === line.length - 1 || line[x + 1] > point)
        if (low) indexes.push(x)
        return indexes
    }, [])

    const lowOnY = lowOnX.filter(x =>
        (y === 0 || map[y - 1][x] > line[x]) && (y === map.length - 1 || map[y + 1][x] > line[x]))

    if (lowOnY.length) {
        lowOnY.forEach(item => result.push({
            x: item,
            y
        }))
    }
    return result
}, [])

console.log(lowPoints)


var elements = [];

const findBasinAround = (point) => {
    let x = point.x
    let y = point.y

    var t, l, r, b;

    let top = {
        x: x,
        y: y - 1
    }
    if (top.y >= 0 &&
        !elements.filter(e => e.x === top.x && e.y === top.y).length > 0 &&
        map[top.y][top.x] != 9) {
            elements.push(top);
            findBasinAround(top);

    }

    let left = {
        x: x - 1,
        y: y
    }
    if (left.x >= 0 && !elements.filter(e => e.x === left.x &&
        e.y === left.y).length > 0 &&
        map[left.y][left.x] != 9) {
            elements.push(left);
            findBasinAround(left);

    }

    let bottom = {
        x: x,
        y: y + 1
    }
    if (bottom.y < map.length && !elements.filter(e => e.x === bottom.x &&
        e.y === bottom.y).length > 0 &&
        map[bottom.y][bottom.x] != 9) {
            elements.push(bottom);
            findBasinAround(bottom);

    }

    let right = {
        x: x + 1,
        y: y
    }
    if (right.x < map[0].length &&
        !elements.filter(e => e.x === right.x && e.y === right.y).length > 0 &&
        map[right.y][right.x] != 9) {
            elements.push(right);
            findBasinAround(right);
    }

}

var i = 0;

var sizes = []
lowPoints.forEach((p) => {
    elements = [];
    elements.push(p);
    findBasinAround(p);
    sizes.push(elements.length);
    i++;
})

sizes.sort((a, b) => a - b)
sizes.reverse()
console.log(sizes)

const largest = sizes.slice(0, 3)
console.log(largest)

const solution = largest.reduce((result, basin) => result * basin, 1)

console.log(solution)