/**
 * Created by Taehyun on 2016-05-02.
 */

var $q = require('q');
var c = require('./connection');
var query = require('./query');


/**
 * Test code of sequence of query
 * Insert 2 groups
 * Select Inserted Groups
 * Delete The groups
 */
var group = {
    id: "123",
    name: "Sample Group"
},
    group2 = {
        id: "234",
        name: "Sample Group"
    };

(function(){
    var deferred = $q.defer();
    c.query(query.group.insert(group), (err, res) => {
        if(err) deferred.reject(err);
        deferred.resolve(res);
    });
    return deferred.promise;
})()
    .catch((res)=>{
        var deferred = $q.defer();
        console.error(res);
        c.query(query.group.delete(group), (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
        return deferred.promise
            .then(()=> {
                var deferred = $q.defer();
                c.query(query.group.insert(group), (err, res) => {
                    if (err) deferred.reject(err);
                    deferred.resolve(res);
                });
                return deferred.promise;
            })
    })
    .then((res)=>{
        var deferred = $q.defer();
        console.log(res);
        c.query(query.group.insert(group2), (err, res) => {
            if(err) deferred.reject(err);
            deferred.resolve(res);
        });
        return deferred.promise;
    })
    .catch((err)=>
        $q.Promise((resolve, reject) => {
            console.error(err);
            c.query(query.group.delete(group2), (err, res) => {
                if(err) reject(err);
                resolve(res);
            })
        })
            .then(()=>
                $q.Promise((resolve, reject) => {
                    c.query(query.group.insert(group2), (err, res) => {
                        if(err) reject(err);
                        resolve(res);
                    });
                })
            )
    )
    .then((res)=>
        $q.Promise((resolve, reject) => {
            console.log(res);
            c.query(query.group.selectAll(), (err, rows) =>{
                if(err) reject(err);
                console.log(rows);
                resolve(rows);
            })
        })
    )
    .then((res)=>
        $q.Promise((resolve, reject) => {
            c.query(query.group.delete(group), (err, res) => {
                if(err) reject(err);
                console.log(res);
            })
        })
    )
    .then((res)=>
        $q.Promise((resolve, reject) => {
            console.log(res);
            c.query(query.group.delete(group2), (err, res) => {
                if(err) reject(err);
                console.log(res);
            })
        })
    )
    .catch(err=>{
        console.error(err);
    })
    .then(()=>c.end());

/*
query.message.insertMultiple([
    {uuid: '123', group_id: '123', message: '123', created_time: new Date(), updated_time: new Date()},
    {uuid: '123', group_id: '123', message: '123', created_time: new Date(), updated_time: new Date()}
]);
*/


