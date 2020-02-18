/* jshint indent: 1 */
const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: "id"
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    isEmail: {
                        args: true,
                        msg: "invalid email"
                    }
                },
                unique: {
                    args: true,
                    msg: "Email address already in use!"
                },
                field: "email"
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
                field: "password"
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: "created_at"
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: "updated_at"
            }
        },
        {
            hooks: {
                beforeCreate: (user, options) => {
                    {
                        user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
                    }
                }
            }
        },
        {
            tableName: "users"
        }
    );
};
