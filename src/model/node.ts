export class Node {
  public data: fabric.Object | null
  public next: Node | null
  constructor(data: fabric.Object | null) {
    this.data = data
    this.next = null
  }
}
