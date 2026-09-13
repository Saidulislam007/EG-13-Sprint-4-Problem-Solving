// 01. Isomorphic Strings
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    if (s.length !== t.length) return false;
    const forward = new Map();
    const backward = new Map();
    for (let i = 0; i < s.length; i++) {
        if (forward.has(s[i]) && forward.get(s[i]) !== t[i]) return false;
        if (backward.has(t[i]) && backward.get(t[i]) !== s[i]) return false;
        forward.set(s[i], t[i]);
        backward.set(t[i], s[i]);
    }
    return true;
};

// 02. Word Pattern
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
    const words = s.trim() === "" ? [] : s.trim().split(/\s+/);
    if (pattern.length !== words.length) return false;
    const charToWord = new Map();
    const wordToChar = new Map();
    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        const word = words[i];
        if (charToWord.has(char) && charToWord.get(char) !== word) return false;
        if (wordToChar.has(word) && wordToChar.get(word) !== char) return false;
        charToWord.set(char, word);
        wordToChar.set(word, char);
    }
    return true;
};

// 03. Find the Difference
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
    const counts = new Map();
    for (const char of s) counts.set(char, (counts.get(char) || 0) + 1);
    for (const char of t) {
        if (!counts.get(char)) return char;
        counts.set(char, counts.get(char) - 1);
    }
};

// 04. Reverse Linked List
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let previous = null;
    let current = head;
    while (current !== null) {
        const nextNode = current.next;
        current.next = previous;
        previous = current;
        current = nextNode;
    }
    return previous;
};

// 05. Middle of the Linked List
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
};

// 06. Product of Array Except Self
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const result = new Array(nums.length).fill(1);
    let prefix = 1;
    for (let i = 0; i < nums.length; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }
    let suffix = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    return result;
};

// 07. Remove Nth Node From End of List
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    const dummy = { next: head };
    let fast = dummy;
    let slow = dummy;
    for (let i = 0; i < n; i++) fast = fast.next;
    while (fast.next !== null) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
};

// 08. Find First and Last Position of Element in Sorted Array
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    // Find the first value >= target, or > target for the upper boundary.
    const boundary = function(upper) {
        let left = 0;
        let right = nums.length;
        while (left < right) {
            const mid = left + Math.floor((right - left) / 2);
            if (nums[mid] < target || (upper && nums[mid] === target)) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    };
    const first = boundary(false);
    if (first === nums.length || nums[first] !== target) return [-1, -1];
    return [first, boundary(true) - 1];
};

// 09. Permutation in String
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    if (s1.length === 0) return true;
    if (s1.length > s2.length) return false;
    const needed = new Map();
    for (let i = 0; i < s1.length; i++) {
        needed.set(s1[i], (needed.get(s1[i]) || 0) + 1);
    }
    let missing = s1.length;
    for (let right = 0; right < s2.length; right++) {
        const incoming = s2[right];
        if (needed.has(incoming)) {
            if (needed.get(incoming) > 0) missing--;
            needed.set(incoming, needed.get(incoming) - 1);
        }
        if (right >= s1.length) {
            const outgoing = s2[right - s1.length];
            if (needed.has(outgoing)) {
                needed.set(outgoing, needed.get(outgoing) + 1);
                if (needed.get(outgoing) > 0) missing++;
            }
        }
        if (right >= s1.length - 1 && missing === 0) return true;
    }
    return false;
};

// 10. Find All Anagrams in a String
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    const result = [];
    if (p.length === 0 || p.length > s.length) return result;
    const needed = new Map();
    for (let i = 0; i < p.length; i++) {
        needed.set(p[i], (needed.get(p[i]) || 0) + 1);
    }
    let missing = p.length;
    for (let right = 0; right < s.length; right++) {
        const incoming = s[right];
        if (needed.has(incoming)) {
            if (needed.get(incoming) > 0) missing--;
            needed.set(incoming, needed.get(incoming) - 1);
        }
        if (right >= p.length) {
            const outgoing = s[right - p.length];
            if (needed.has(outgoing)) {
                needed.set(outgoing, needed.get(outgoing) + 1);
                if (needed.get(outgoing) > 0) missing++;
            }
        }
        if (right >= p.length - 1 && missing === 0) {
            result.push(right - p.length + 1);
        }
    }
    return result;
};
