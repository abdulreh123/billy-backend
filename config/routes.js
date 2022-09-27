/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
   "GET /": "home/index",
   
   'POST /user/register': 'user/register',
   'POST /user/login': 'user/login',
   'GET /user/verify': 'user/verify',
   "GET /user/all": 'user/all-users',

   "POST /group": 'group/create',
   "PUT /group/:id": 'group/update',
   "GET /group": 'group/getall',
   "GET /group/:id": 'group/get-one',
   "DELETE /group/:id": 'group/delete',

   "POST /category": 'category/create',
   "PUT /category/:id": 'category/update',
   "GET /category": 'category/getall',
   "GET /category/:id": 'category/get-one',
   "DELETE /category/:id": 'category/delete',

};
