const request = require("supertest");
const app = require("../../server/server");
const Route = require("../constants");
var expect = require('chai').expect;
const config = require("../../config/constants");

describe('Comment Tests on lessons', () => {

    it("Create comment while unautorized", (done) => {
        request(app)
            .post(Route.AddComment2Lesson)
            .send(config.GoodComment)
            .set("Accept", "application/json")
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                expect(response.statusCode).to.equal(401);
                done();
            });
    });
    it("Add comment for non existing lesson and being unauthorized",(done)=>{
        request(app)
            .post(Route.AddComment2Lesson)
            .send(config.BadComment)
            .set("Content-Type", "application/json")
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                //console.log(response.body);
                expect(response.statusCode).to.equal(401);
                done();
            });
    });
    it("Add comment for non existing lesson and being authorized",(done)=>{
        request(app)
            .post(Route.AddComment2Lesson)
            .send(config.BadComment)
            .set("Content-Type", "application/json")
            .set('authorization', config.AuthToken)
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                //console.log(response.body);
                expect(response.statusCode).to.equal(422);
                done();
            });
    });

    // it("Deleting Comment while not autorized", (done) => {
    //     request(app)
    //         .delete(RouteNames.AddComment)
    //         .send(config.CrsDel)
    //         .set("Accept", "application/json")
    //         .end(function(err, response) {
    //             if (err) {
    //                 return err;
    //             };
    //             expect(response.statusCode).to.equal(401);
    //             done();
    //         });
    // });

    // it("Deleting Course while being autorized", (done) => {
    //     request(app)
    //         .delete(RouteNames.AddComment)
    //         .send(config.CrsDel)
    //         .set("Accept", "application/json")
    //         .set('authorization', config.AuthToken)
    //         .end(function(err, response) {
    //             if (err) {
    //                 return err;
    //             };
    //             expect(response.statusCode).to.equal(202);
    //             done();
    //         });
    // });
    // 
});