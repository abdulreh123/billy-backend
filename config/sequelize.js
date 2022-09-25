// in config/sqlize.js

module.exports.sequelize  = {
    /**
     * Specify Sequelize connection options for each sails connection you wish to create
     * Sequelize models for 
     */
    connections: {
        mysql: {
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 1000
            },
            define: {
                timestamps: false
            },
            logging: false // the sails logging level to use
        }
    },
    
    /**
     * Specify default options for each Sequelize instance
     */
    options: {
        define: {
            timestamps: false,
            freezeTableName: true
        }
    }
}