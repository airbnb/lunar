/* eslint-disable max-classes-per-file, @typescript-eslint/no-explicit-any */

// Based on https://github.com/viktor-ku/triematch
// But the code published to NPM breaks the build.

// type Point = [Node, Char];
type Char = string;
type Socket<V = any> = Map<Char, Node<V>>;

export class Node<V = any> {
  socket: Socket<V>;

  value!: V;

  key: string = '';

  constructor(socket?: Socket<V>) {
    this.socket = socket ?? new Map();
  }
}

export function getClosestNode(socket: Socket, query: string): Node | null {
  let node = new Node(socket);

  for (let n = 0, len = query.length; n < len; n += 1) {
    const char = query[n];
    const nextNode = node.socket.get(char);

    if (!nextNode) {
      return null;
    }

    node = nextNode;
  }

  return node;
}

export default class Trie<V = any> extends Map<string, any> {
  private rootSocket: Socket = new Map();

  match(query: string, count?: number): V[] {
    if (!query) {
      return [];
    }

    const path: Node[] = [];
    const result: V[] = [];
    const closestNode = getClosestNode(this.rootSocket, query);

    if (!closestNode) {
      return [];
    }

    let node = closestNode;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (count && result.length >= count) {
        break;
      }

      if (node.key) {
        result.push(node.value);
      }

      const nodes = [...node.socket.values()];
      const nodesLen = nodes.length;

      if (nodesLen >= 2) {
        for (let n = 1, len = nodes.length; n < len; n += 1) {
          path.push(nodes[n]);
        }
      } else if (nodesLen === 0) {
        const nextNode = path.pop();

        if (!nextNode) {
          break;
        }

        node = nextNode;
      } else {
        [node] = nodes;
      }
    }

    return result;
  }

  set(key: string, value: V): this {
    if (!key) {
      return this;
    }

    let node = new Node(this.rootSocket);

    for (let n = 0, len = key.length; n < len; n += 1) {
      const char = key[n];
      let nextNode = node.socket.get(char);

      if (!nextNode) {
        nextNode = new Node();
        node.socket.set(char, nextNode);
      }

      node = nextNode!;
    }

    node.key = key;
    node.value = value;

    return super.set(key, node);
  }
}
