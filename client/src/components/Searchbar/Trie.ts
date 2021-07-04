export class TrieNode {
    // Members
    children: any;
    val: any;

    constructor(val: any = 0) {
        this.val = val;
        this.children = {};
    };

    isEmpty() {
        return Object.keys(this.children).length === 0;
    }
}


// https://en.wikipedia.org/wiki/Trie#Applications
export class Trie {
    // Members
    root: TrieNode;
    caseSensitive: boolean;

    constructor(root: TrieNode, caseSensitive: boolean = false) {
        this.root = root;
        // Not implemented
        this.caseSensitive = caseSensitive;
    }

    // Overwrites the current val by default
    // Would recommend inserting in alphabetical order too
    // Also the value should be the desired string stored
    insert(key: string, val: any = null, overwrite: boolean = true) {
        let node = this.root;
        for (var i = 0; i < key.length; ++i) {
            const char = key[i];
            if (!Object.keys(node.children).includes(char)) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        };
        if (overwrite || node.val === 0) {
            node.val = val;
        }
    }

    search(key: string) {
        let node = this.root;
        for (var i = 0; i < key.length; ++i) {
            const char = key[i];
            if (Object.keys(node.children).includes(char)) {
                node = node.children[char];
            } else {
                return null;
            }
        };
        return node.val;
    }

    delete(key: string): boolean {
        let node = this.root;
        for (var i = 0; i < key.length; ++i) {
            const char = key[i];
            if (Object.keys(node.children).includes(char)) {
                node = node.children[char];
            } else {
                return false;
            }
        };
        node.val = null;
        return true;
    }

    deleteEager(key: string) {
        // Instead of setting the val to null, remove the parent/child node
    }

    printVals() {
        let node = this.root;
        _dfs(node);
        function _dfs(node: TrieNode) {
            if (Object.keys(node.children).length === 0) { return node.val }
            for (const [k, v] of Object.entries(node.children)) {
                const child = node.children[k];
                const val = (_dfs(child));
                if (val != null) { console.log(val) };
            }
        }
    }

    clear() {
        this.root = new TrieNode();
    }

    suggestKey(prefix: string, length: number = 0): Array<string> {
        var results: Array<string> = [];
        const node = this.getNode(prefix);
        if (node !== null) {
            this.getSuggestions(node, prefix, results)
        }
        results.sort();
        if (length === 0) {
            return results;
        }
        else if (results.length > length) {
            return results.slice(0, length - 1);
        } else {
            return results;
        }
    }

    private getNode(prefix: string) {
        let node = this.root;
        for (var i = 0; i < prefix.length; ++i) {
            const char = prefix[i];
            if (Object.keys(node.children).includes(char)) {
                node = node.children[char];
            } else {
                return null;
            }
        };
        return node;
    }

    private getSuggestions(node: TrieNode, prefix: string, results: Array<string>) {
        if (node.isEmpty()) {
            results.push(prefix);
            return;
        }
        for (const [k, v] of Object.entries(node.children)) {
            const child = node.children[k];
            this.getSuggestions(child, prefix + k, results);
        }
    }
}


function getRandString(length: number = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let rand = '';
    for (let i = 0; i < length; i++) {
        rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return rand;
}

const trie = new Trie(new TrieNode());
const randomStrings = new Array(10)
for (let i = 0; i < randomStrings.length; ++i) {
    randomStrings[i] = getRandString();
}
console.log(randomStrings)
randomStrings.forEach(str => {
    trie.insert(str, str);
});
trie.printVals();
const results = trie.suggestKey(randomStrings[0].charAt(0));
console.log("Results", results)