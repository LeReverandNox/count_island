var fs = require("fs");
var file = process.argv[2];
var grid = [];
var islandCounter = -1;

function checkParam() {
    "use strict";
    if (file === undefined) {
        console.log("Veuillez fournir un fichier !");
        process.exit();
    }
}

function parseFile(callback) {
    "use strict";
    fs.readFile(file, "utf-8", function (err, data) {
        if (err) {
            console.log("Impossible de lire le fichier !");
            process.exit();
        }

        data.trim().split("\n").map(function (line) {
            grid.push(line.split(""));
        });
        callback();
    });
}

function findNeighbors(x, y) {
    "use strict";
    grid[y][x] = islandCounter;

    if (grid[y][x + 1] === "X") {
        findNeighbors(x + 1, y);
    }
    if (grid[y][x - 1] === "X") {
        findNeighbors(x - 1, y);
    }
    if (grid[y + 1] !== undefined && grid[y + 1][x] === "X") {
        findNeighbors(x, y + 1);
    }

    if (grid[y - 1] !== undefined && grid[y - 1][x] === "X") {
        findNeighbors(x, y - 1);
    }
}

function findIsland() {
    "use strict";
    var x, y;
    for (y = 0; y < grid.length; y += 1) {
        for (x = 0; x < grid[y].length; x += 1) {
            if (grid[y][x] === "X") {
                islandCounter += 1;
                findNeighbors(x, y);
            }
        }
    }
}

function printResult() {
    "use strict";
    console.log(grid.map(function (line) {
        return line.join("");
    }).join("\n"));
}

function init() {
    "use strict";
    checkParam();
    parseFile(function () {
        findIsland();
        printResult();
    });
}
init();