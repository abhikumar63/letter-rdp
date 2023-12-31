/**
 * Tokenizer Class
 * 
 * lazily pulls a token from the stream.
 */
class Tokenizer {
    /**
     * Initializes a string
     */
    init(string) {
        this._string = string;
        this._cursor = 0;
    }

    /**
     * Whether the tokenizer reach EOF.
     */
    isEOF() {
        return this._cursor === this._string.length;
    }

    /**
     * Whether we still have more tokens
     */
    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    /**
     * Obtains next token
     */
    getNextToken() {
        if (!this.hasMoreTokens()) {
            return null;
        }

        const string = this._string.slice(this._cursor);

        // Numbers:
        if (!Number.isNaN(Number(string[0]))) {
            let number = '';
            while (!Number.isNaN(Number(string[this._cursor]))) {
                number += string[this._cursor++];
            }
            return {
                type: 'NUMBER',
                value: number
            }
        }

        // String:
        if (string[0] === '"') {
            let s = '';
            do {
                s += string[this._cursor++];
            } while (string[this._cursor] !== '"' && !this.isEOF());
            s += string[this._cursor++];
            return {
                type: 'STRING',
                value: s,
            }
        }

        return null;
    }
}

module.exports = {
    Tokenizer,
}