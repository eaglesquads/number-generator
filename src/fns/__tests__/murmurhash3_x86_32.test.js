import { assert } from 'chai';
import { requireFunction } from './helper';

const murmurhash3_x86_32 = requireFunction('murmurhash3_x86_32');

describe('murmurhash3_x86_32()', () => {
    it('should generate an number hash by string', () => {
        const testString = 'Awkward code!';
        const hash = murmurhash3_x86_32(testString);

        assert.isAbove(hash, 1);
        assert.isTrue(hash % 1 === 0);
    });

    it('should generate an number hash by string of length 1', () => {
        const testString = 'a';
        const hash = murmurhash3_x86_32(testString);

        assert.isAbove(hash, 1);
        assert.isTrue(hash % 1 === 0);
    });

    it('should generate an number hash by string of length 2', () => {
        const testString = 'ab';
        const hash = murmurhash3_x86_32(testString);

        assert.isAbove(hash, 1);
        assert.isTrue(hash % 1 === 0);
    });

    it('should generate an number hash by string of length 3', () => {
        const testString = 'abc';
        const hash = murmurhash3_x86_32(testString);

        assert.isAbove(hash, 1);
        assert.isTrue(hash % 1 === 0);
    });

    it('returns zero on empty string', () => {
        const testString = '';
        const hash = murmurhash3_x86_32(testString);

        assert.strictEqual(hash, 0);
    });

    it('produces a different hash with same string but different seed', () => {
        const testString = 'This is awesome!';
        const hash1 = murmurhash3_x86_32(testString, 1);
        const hash2 = murmurhash3_x86_32(testString, 2);

        assert.notStrictEqual(hash1, hash2);
    });

    it('produces the same hash with same string and seed', () => {
        const testString = 'This is awesome!';
        const hash1 = murmurhash3_x86_32(testString, 1);
        const hash2 = murmurhash3_x86_32(testString, 1);
        const hash3 = murmurhash3_x86_32(testString, 1);
        const hash4 = murmurhash3_x86_32(testString, 1);

        assert.strictEqual(hash1, hash2);
        assert.strictEqual(hash3, hash4);
        assert.strictEqual(hash4, hash1);
    });

    it('should return a valid result if seed is 0', () => {
        const testString = 'This is awesome!';
        const hash = murmurhash3_x86_32(testString, 0);

        assert.isAbove(hash, 1);
        assert.isTrue(hash % 1 === 0);
    });

    it('should return a valid result on negative seed', () => {
        const testString = 'This is awesome!';
        const hash = murmurhash3_x86_32(testString, -10);

        assert.isAbove(hash, 1);
        assert.isTrue(hash % 1 === 0);
    });

    it('throws a TypeError on float seed value', () => {
        assert.throws(() => murmurhash3_x86_32('', 0.2), TypeError);
    });

    it('[loop] should produce unique results on unsigned seeds', () => {
        const iterations = 1000;
        const stack = [];

        for (let i = 0; i <= iterations; i++) {
            const hash = murmurhash3_x86_32('This is awesome!', i);

            assert.isAbove(hash, 1);
            assert.isTrue(hash % 1 === 0);

            stack.push(hash);
        }

        // Test the "unique-nes" of the generated numbers
        const uniqueStack = stack.filter(
            (value, index, self) => index === self.indexOf(value)
        );

        assert.lengthOf(stack, uniqueStack.length);
    });

    it('[loop] should produce unique results on seed range from negative to positive', () => {
        const iterations = 1000;
        const stack = [];

        for (let i = -100; i <= iterations; i++) {
            const hash = murmurhash3_x86_32('This is awesome!', i);

            assert.isAbove(hash, 1);
            assert.isTrue(hash % 1 === 0);

            stack.push(hash);
        }

        // Test the "unique-nes" of the generated numbers
        const uniqueStack = stack.filter(
            (value, index, self) => index === self.indexOf(value)
        );

        assert.lengthOf(stack, uniqueStack.length);
    });

    it('produces an exact reproducible hash (like defined in other implementations)', () => {
        const hash1 = murmurhash3_x86_32('string', 0);
        const hash2 = murmurhash3_x86_32('string', 13);
        const hash3 = murmurhash3_x86_32('something', 5);

        assert.strictEqual(hash1, 2904652459);
        assert.strictEqual(hash2, 1886458758);
        assert.strictEqual(hash3, 2093830963);
    });
});