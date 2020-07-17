'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "posts", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "posts_migration",
    "created": "2020-06-10T17:10:55.338Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "posts",
        {
            "PostId": {
                "type": Sequelize.INTEGER,
                "field": "PostId",
                "allowNull": false,
                "primaryKey": true,
                "autoIncrement": true
            },
            "PostTitle": {
                "type": Sequelize.STRING,
                "field": "PostTitle"
            },
            "PostBody": {
                "type": Sequelize.STRING,
                "field": "PostBody"
            },
            "UserId": {
                "type": Sequelize.INTEGER,
                "field": "UserId"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
