'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Deleted" to table "posts"
 * addColumn "Deleted" to table "users"
 * changeColumn "UserId" on table "posts"
 * changeColumn "UserId" on table "posts"
 * changeColumn "UserId" on table "posts"
 * changeColumn "UserId" on table "posts"
 * changeColumn "UserId" on table "posts"
 * changeColumn "UserId" on table "posts"
 *
 **/

var info = {
    "revision": 3,
    "name": "deleted_migration",
    "created": "2020-06-11T16:04:18.570Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "posts",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "defaultValue": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "defaultValue": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId",
                "key": "UserId",
                "model": "users"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId",
                "key": "UserId",
                "model": "users"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId",
                "key": "UserId",
                "model": "users"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId",
                "key": "UserId",
                "model": "users"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId",
                "key": "UserId",
                "model": "users"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId",
                "key": "UserId",
                "model": "users"
            }
        ]
    }
];

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
