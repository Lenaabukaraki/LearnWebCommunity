const request = require("supertest");
const app = require("../../server/server");
const { RouteNames } = require("../../constants/constants");
var expect = require('chai').expect;
const config = require("../../config/constants");

describe('Lessons Tests', () => {

    it("Create lesson while not autorized", (done) => {
        request(app)
            .post(RouteNames.AddLesson)
            .send(config.lesson)
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

    it("Create Lesson while autorized", (done) => {
        request(app)
            .post(RouteNames.AddLesson)
            .send(config.lesson)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set('authorization', config.AuthToken)
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                console.log(response.body);
                expect(response.statusCode).to.equal(202);
                done();
            });
    });

    it("Create Lesson for non-existing Course", (done) => {
        const lesson = config.lesson;
        lesson.course = "";
        request(app)
            .post(RouteNames.AddLesson)
            .send(lesson)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
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
});