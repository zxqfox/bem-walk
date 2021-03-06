var path = require('path'),
    mock = require('mock-fs'),
    assert = require('../lib/assert');

describe('naming', function () {
    afterEach(function () {
        mock.restore();
    });

    it('must support original naming', function (done) {
        mock({
            blocks: {
                'block__elem_bool-mod.ext': ''
            }
        });

        assert(['blocks'], {
            scheme: 'flat',
            naming: { elem: '__', mod: '_' }
        }, [{
            block: 'block',
            elem: 'elem',
            modName: 'bool-mod',
            modVal: true,
            tech: 'ext',
            level: 'blocks',
            path: path.join('blocks', 'block__elem_bool-mod.ext')
        }], done);
    });

    it('must support Convention by Harry Roberts', function (done) {
        mock({
            blocks: {
                'block__elem--bool-mod.ext': ''
            }
        });

        assert(['blocks'], {
            scheme: 'flat',
            naming: { elem: '__', mod: '--' }
        }, [{
            block: 'block',
            elem: 'elem',
            modName: 'bool-mod',
            modVal: true,
            tech: 'ext',
            level: 'blocks',
            path: path.join('blocks', 'block__elem--bool-mod.ext')
        }], done);
    });

    it('must support custom naming', function (done) {
        mock({
            blocks: {
                'block-elem--boolMod.ext': ''
            }
        });

        assert(['blocks'], {
            scheme: 'flat',
            naming: {
                elem: '-',
                mod: '--',
                wordPattern: '[a-zA-Z0-9]+'
            }
        }, [{
            block: 'block',
            elem: 'elem',
            modName: 'boolMod',
            modVal: true,
            tech: 'ext',
            level: 'blocks',
            path: path.join('blocks', 'block-elem--boolMod.ext')
        }], done);
    });
});
