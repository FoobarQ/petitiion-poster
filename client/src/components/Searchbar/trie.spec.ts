import { Trie, TrieNode } from "./Trie";

function getRandString(length: number = 16) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let rand = "";
  for (let i = 0; i < length; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return rand;
}

describe("Testing Initialisation", () => {
  describe("Initialise with integer", () => {
    it("Should initialise a Trie with an integer", () => {
      const testVal = 1;
      const trie = new Trie(new TrieNode(testVal));
      expect(trie.root.val).toEqual(testVal);
    });
  });
  describe("Initialise with integer", () => {
    it("Should initialise a Trie with an string", () => {
      const testVal = "saifubasb";
      const trie = new Trie(new TrieNode(testVal));
      expect(trie.root.val).toEqual(testVal);
    });
  });
});

describe("Testing Trie methods", () => {
  describe("insert()", () => {
    it("Should insert a key into an empty Trie", () => {
      const trie = new Trie(new TrieNode());
      const randomString = getRandString();
      trie.insert(randomString, randomString);
      expect(Object.keys(trie.root.children)).toContain(randomString.charAt(0));
    });
    it("Should insert a 2 keys into a Trie", () => {
      const trie = new Trie(new TrieNode());
      trie.insert("taps", "taps");
      trie.insert("young", "taps");
      expect(Object.keys(trie.root.children)).toContain("t");
      expect(Object.keys(trie.root.children)).toContain("y");
    });
  });
  describe("search()", () => {
    it("Should find a string in the trie", () => {
      const trie = new Trie(new TrieNode());
      const searchString = "taps";
      const val = "asjsd";
      trie.insert(searchString, val);
      expect(trie.search(searchString)).toEqual(val);
    });
    it("Should a find string in the trie", () => {
      const trie = new Trie(new TrieNode());
      const insertString = "taps";
      trie.insert(insertString, insertString);

      const searchString = "tapz";
      expect(trie.search(searchString)).toEqual(null);
    });
    it("Should not find a string in the trie", () => {
      const trie = new Trie(new TrieNode());
      const searchString = "taps";
      const searchString1 = "tapsbvgv";
      trie.insert(searchString, searchString);
      trie.insert(searchString1, searchString1);
      expect(trie.search(searchString)).not.toEqual(null);
    });
    it("Should not find a string in the trie", () => {
      const trie = new Trie(new TrieNode());
      const searchString = "taps";
      expect(trie.search(searchString)).toEqual(null);
    });
  });
  describe("delete()", () => {
    it("Should insert a value, then delete it", () => {
      const trie = new Trie(new TrieNode());
      const randomString = getRandString();
      trie.insert(randomString, randomString);
      expect(trie.search(randomString)).toEqual(randomString);
      expect(trie.delete(randomString)).toEqual(true);
      expect(trie.search(randomString)).toEqual(null);
    });
    it("Should insert a value, then delete it", () => {
      const trie = new Trie(new TrieNode());
      const randomString = getRandString();
      trie.insert(randomString, randomString);
      expect(trie.search(randomString)).toEqual(randomString);
      expect(trie.delete(randomString)).toEqual(true);
      expect(trie.search(randomString)).toEqual(null);
    });
  });
  describe("suggestKey()", () => {
    it("Should return an empty array", () => {
      const trie = new Trie(new TrieNode());
      const randomString = getRandString();
      const results = trie.suggestKey(randomString, 0);
      expect(results.length).toEqual(0);
    });
    // Inserts 100 strings into the trie and saves the number of occurances of
    // the first character in each string. This is used to expect the number
    // of results returned by suggestKey
    it("Should return a non-empty array with at least one character", () => {
      const trie = new Trie(new TrieNode());
      const randomStrings = new Array(100);
      var firstCharMap = new Map();
      for (let i = 0; i < randomStrings.length; ++i) {
        randomStrings[i] = getRandString();
        const firstChar = randomStrings[i].charAt(0);
        if (!firstCharMap.has(firstChar)) {
          firstCharMap.set(firstChar, 0);
        }
        firstCharMap.set(firstChar, firstCharMap.get(firstChar) + 1);
      }
      randomStrings.forEach((str) => {
        trie.insert(str, str);
      });
      const firstChar = randomStrings[0].charAt(0);
      const results = trie.suggestKey(firstChar);
      expect(results.length).toEqual(firstCharMap.get(firstChar));
    });
  });
});
