var home = require('../../controllers/home'),
    image = require('../../controllers/image'),
    routes = require('../../server/routes');

describe('Routes', () => {
    var app = {
        get: sinon.spy(),
        post: sinon.spy(),
        delete: sinon.spy()
    };

    beforeEach(() => routes.initialize(app));

    describe('GETs', () => {
        it('should handle /', () => {
            expect(app.get).to.be.calledWith('/', home.index);
        });

        it('should handle /images/:image_id', () => {
            expect(app.get).to.be.calledWith('/images/:image_id', image.index);
        });
    });
});